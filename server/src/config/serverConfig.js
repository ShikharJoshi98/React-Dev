require("dotenv").config();

const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    REACT_CREATE_COMMAND: process.env.REACT_CREATE_COMMAND,
    MONGO_URI: process.env.MONGO_URI
}

module.exports = config