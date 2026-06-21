import { projectAction } from "./projectActionType"

const initialState = {
    createProject: {
        loading: false,
        error: null,
        message: null,
        projectId: null
    }
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case projectAction.CREATE_PROJECT_REQUEST:
            return {
                ...state,
                createProject: {
                    loading: true,
                    error: null,
                    message: null,
                    projectId: null
                }
            };
        case projectAction.CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                createProject: {
                    loading: false,
                    error: null,
                    message: null,
                    projectId: action.payload.data.projectId
                }
            };
        case projectAction.CREATE_PROJECT_FAILURE:
            return {
                ...state,
                createProject: {
                    loading: false,
                    error: action.payload,
                    message: null,
                    projectId: null
                }
            };
        case projectAction.CLEAR_PROJECT_STATE:
            return {
                ...state,
                createProject: {
                    loading: false,
                    error: null,
                    message: null,
                    projectId: null
                }
            };
        default:
            return state;
    }
}

export default projectReducer