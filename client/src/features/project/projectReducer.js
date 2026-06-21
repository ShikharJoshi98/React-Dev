import { projectAction } from "./projectActionType"

const initialState = {
    projectTree: {
        loading: false,
        error: null,
        message: null,
        projectTree: null
    },
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
        case projectAction.GET_PROJECT_TREE_REQUEST:
            return {
                ...state,
                projectTree: {
                    loading: true,
                    error: null,
                    message: null,
                    projectTree: null
                }
            };
        case projectAction.GET_PROJECT_TREE_SUCCESS:
            return {
                ...state,
                projectTree: {
                    loading: false,
                    error: null,
                    message: null,
                    projectTree: action.payload.data
                }
            };
        case projectAction.GET_PROJECT_TREE_FAILURE:
            return {
                ...state,
                projectTree: {
                    loading: false,
                    error: action.payload,
                    message: null,
                    projectTree: null
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