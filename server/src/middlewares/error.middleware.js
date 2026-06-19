const AppError = require("../utils/error");
const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res
            .status(err.statusCode)
            .json({
                success: false,
                message: err.message
            });
    }

    logger.error("Unhandled error : ", err);
}

module.exports = errorHandler