import { post } from "../../api/apiClient"

export const createProject = (credentials) => {
    return post("/project/create", credentials);
}