import { projectAction } from "./projectActionType"

export const createProjectRequest = (credentials) => {
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

export const getProjectTreeRequest = (projectId) => {
    return {
        type: projectAction.GET_PROJECT_TREE_REQUEST,
        payload: projectId
    }
}

export const getProjectTreeSuccess = (data) => {
    return {
        type: projectAction.GET_PROJECT_TREE_SUCCESS,
        payload: data
    }
}

export const getProjectTreeFailure = (error) => {
    return {
        type: projectAction.GET_PROJECT_TREE_FAILURE,
        payload: error
    }
}

export const clearProjectState = () => {
    return {
        type: projectAction.CLEAR_PROJECT_STATE
    }
}