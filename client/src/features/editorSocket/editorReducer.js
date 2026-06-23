import editorAction from "./editorActionType";

const initialState = {
    editorSocket: null
}

export const editorReducer = (state = initialState, action) => {
    switch (action.type) {
        case editorAction.CREATE_EDITOR_CONNECTION:
            return {
                ...state,
                editorSocket: action.payload
            };
        default:
            return state;
    }
}