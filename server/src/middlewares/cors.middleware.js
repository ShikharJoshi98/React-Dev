const cors = require("cors");

const corsMiddleware = cors({
    origin: ("http://localhost:5173"),
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization'
    ]
});

module.exports = corsMiddleware;