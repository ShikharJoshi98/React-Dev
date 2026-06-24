import { useActiveFileTab } from "../../context/ActiveFileTabContext";
import editorAction from "./editorActionType";

const initialState = {
    editorSocket: null,
    latestReadFile: null,
}

export const editorReducer = (state = initialState, action) => {

    switch (action.type) {
        case editorAction.CREATE_EDITOR_CONNECTION:
            return {
                ...state,
                editorSocket: action.payload
            };
        case editorAction.READ_FILE_SUCCESS:
            return {
                ...state,
                latestReadFile: action.payload,
            };
        default:
            return state;
    }
}