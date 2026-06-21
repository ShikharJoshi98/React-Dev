const express = require("express");
const projectController = require("../controllers/project.controller");

const router = express.Router();

router.post("/create", 
    projectController.create
)

router.get("/getProjectTree/:projectId", 
    projectController.fetchProjectTree
)

module.exports = router;

