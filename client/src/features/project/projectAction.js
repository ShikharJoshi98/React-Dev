import { projectAction } from "./projectActionType"

export const createProjectRequest = (credentials) => {
    console.log("saga",credentials)
    return {
        type: projectAction.CREATE_PROJECT_REQUEST,
        payload: credentials
    }
}

export const createProjectSuccess = (data) => {
    return {
        type: projectAction.CREATE_PROJECT_SUCCESS,
        payload: data
    }
}

export const createProjectFailure = (error) => {
    return {
        type: projectAction.CREATE_PROJECT_FAILURE,
        payload: error
    }
}