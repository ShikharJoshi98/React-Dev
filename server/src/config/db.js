const mongoose= require("mongoose");
const config = require("./serverConfig");
const logger = require("../utils/logger");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.MONGO_URI);

        if (conn.connection.host) {
            logger.info("React Dev DB connected");
        }
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;