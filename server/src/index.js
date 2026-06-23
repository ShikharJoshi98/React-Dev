const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const config = require("./config/serverConfig");
const logger = require("./utils/logger");
const helmet = require("helmet");
const chokidar = require("chokidar");
const cors = require("cors");
const apiRoutes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");
const connectDB = require("./config/db");
const corsMiddleware = require("./middlewares/cors.middleware");
const reqMiddleware = require("./middlewares/request.middleware");
const handleEditorSocketEvents = require("./socketHandlers/editorHandler");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET','POST']
    }
});

const editorNamespace = io.of("/editor");

editorNamespace.on("connection", (socket) => {
    let projectId = String(socket.handshake.query.projectId);
    if (projectId) {
        var watcher = chokidar.watch(`./projects/${projectId}`, {
            ignored: (path) => path.includes("node_modules"),
            persistent: true,
            awaitWriteFinish: {
                stabilityThreshold: 2000
            },
            ignoreInitial: true
        });

        watcher.on("all", (event, path) => {
            console.log(event, path);
        })
    }

    handleEditorSocketEvents(socket);

    socket.on("disconnect", async (data) => {
        await watcher.close();
        console.log("editor disconnected");
    })
})

connectDB();

app.use(helmet());
app.use(corsMiddleware);
app.use(reqMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("API working");
})

app.use("/api", apiRoutes);

app.use(errorHandler);

server.listen(config.PORT, () => {
    logger.info(`Server listening on port ${config.PORT}`);
})