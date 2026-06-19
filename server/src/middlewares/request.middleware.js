const logger = require("../utils/logger");

const reqMiddleware = async (req, res, next) => {
    const timeStamp = new Date().toISOString();

    logger.info(`Request  - ${req.url} / Request method - ${req.method} / ${timeStamp}`);

    next();
}

module.exports = reqMiddleware;