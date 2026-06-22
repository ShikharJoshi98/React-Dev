const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const config = require("./config/serverConfig");
const logger = require("./utils/logger");
const helmet = require("helmet");
const cors = require("cors");
const apiRoutes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");
const connectDB = require("./config/db");
const corsMiddleware = require("./middlewares/cors.middleware");
const reqMiddleware = require("./middlewares/request.middleware");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        method: ['GET','POST']
    }
});

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

app.listen(config.PORT, () => {
    logger.info(`Server listening on port ${config.PORT}`);
})