const fs = require("fs/promises");
const logger = require("../utils/logger");

const handleEditorSocketEvents = (socket) => {
    socket.on("writeFile", async ({ data, pathToFileOrFolder }) => {
        try {
            const response = await fs.writeFile(pathToFileOrFolder, data);

            socket.emit("writeFileSuccess", {
                data: "File written successfully"
            });
        } catch (error) {
            logger.error("Error writing a file", error);
            socket.emit("error", {
                data: "Error writing the file"
            });
        }
    });

    socket.on("createFile", async ({ pathToFileOrFolder }) => {
        const isFileAlreadyPresent = await fs.stat(pathToFileOrFolder);

        if (isFileAlreadyPresent) {
            socket.emit("error", {
                data: "File already exists"
            });
            return;
        }

        try {
            const response = await fs.writeFile(pathToFileOrFolder, "");
            socket.emit("createFileSuccess", {
                data: "File Created successfully"
            })
        } catch (error) {
            logger.error("Error creating a file", error);
            socket.emit("error", {
                data: "Error creating the file"
            });
        }
    })

    socket.on("readFile", async ({ pathToFileOrFolder }) => {
        try {
            const response = await fs.readFile(pathToFileOrFolder);
            socket.emit("readFileSuccess", {
                value: response.toString(),
                path: pathToFileOrFolder
            })
        } catch (error) {
            logger.error("Error reading a file", error);
            socket.emit("error", {
                data: "Error reading the file"
            });
        }
    })

    socket.on("deleteFile", async ({ pathToFileOrFolder }) => {
        try {
            const response = await fs.unlink(pathToFileOrFolder);

            socket.emit("deleteFileSuccess", {
                data: "File deleted successfully"
            })
        } catch (error) {
            logger.error("Error deleting the file", error);
            socket.emit("error", {
                data: "Error deleting the file"
            });
        }
    })

    socket.on("createFolder", async ({ pathToFileOrFolder }) => {
        try {
            const response = await fs.mkdir(pathToFileOrFolder);

            socket.emit("createdFolderSuccess", {
                data: "Folder created successfully"
            })
        } catch (error) {
            logger.error("Error creating the folder", error);
            socket.emit("error", {
                data: "Error creating the folder"
            });
        }
    })

    socket.on("deleteFolder", async ({ pathToFileOrFolder }) => {
        try {
            const response = await fs.rm(pathToFileOrFolder, { recursive: true, force: true });

            socket.emit("deleteFolderSuccess", {
                data: "Folder deleted successfully"
            })
        } catch (error) {
            logger.error("Error deleting the folder", error);
            socket.emit("error", {
                data: "Error deleting the folder"
            });
        }
    })
}

module.exports = handleEditorSocketEvents