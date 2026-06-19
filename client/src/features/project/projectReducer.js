import { projectAction } from "./projectActionType"

const initialState = {
    createProject: {
        loading: false,
        error: null,
        message: null
    }
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case projectAction.CREATE_PROJECT_REQUEST:
            console.log("action",action.payload)
            return {
                ...state,
                createProject: {
                    loading: true,
                    error: null,
                    message: null
                }
            };
        case projectAction.CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                createProject: {
                    loading: false,
                    error: null,
                    message: null
                }
            };
        case projectAction.CREATE_PROJECT_FAILURE:
            return {
                ...state,
                createProject: {
                    loading: false,
                    error: action.payload,
                    message: null
                }
            };
        default:
            return state;
    }
}

export default projectReducer