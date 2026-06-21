import { get, post } from "../../api/apiClient"

export const createProject = (credentials) => {
    return post("/project/create", credentials);
}

export const getProjectTree = (projectId) => {
    return get(`/project/getProjectTree/${projectId}`);
}