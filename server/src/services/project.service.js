const util = require("util");
const child_process = require("child_process");
const fs = require("fs/promises");
const Project = require("../models/Project");
const AppError = require("../utils/error");
const STATUS_CODE = require("../utils/statusCode");
const config = require("../config/serverConfig");
const path = require("path");
const directoryTree = require("directory-tree");

const execPromisified = util.promisify(child_process.exec);

const createProject = async (data) => {
    try {
        const name = data.name;
        const description = data.description;

        const projectExists = await Project.findOne({ name });
        if (projectExists) {
            throw new AppError("Project with this name already exists. Give a new name", STATUS_CODE.CONFLICT);
        }

        const project = await Project.create({ name, description });

        fs.mkdir(`./Projects/${project._id}`);

        const response = await execPromisified(config.REACT_CREATE_COMMAND.replace('name', name), {
            cwd: `./Projects/${project._id}`
        });

        return {
            projectId: project._id
        };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Error creating project", STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

const getProjectTree = async (projectId) => {
    const projectPath = path.resolve(`./Projects/${projectId}`);
    const tree = directoryTree(projectPath);
    return tree;
}

module.exports = {
    createProject,
    getProjectTree
}