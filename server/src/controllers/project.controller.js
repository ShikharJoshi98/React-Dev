const projectService = require("../services/project.service");
const successResponse = require("../utils/response");
const STATUS_CODE = require("../utils/statusCode");

const create = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const project = await projectService.createProject({ name, description });
       
        successResponse(res, project, "Successfully created project", STATUS_CODE.CREATED);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create
}