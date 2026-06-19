const express = require("express");
const projectRoute = require("./project.route");

const router = express.Router();

router.use("/project", projectRoute);

module.exports = router;

