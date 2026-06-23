import editorAction from "./editorActionType";

export const createEditorConnection = (socket) => {
    return {
        type: editorAction.CREATE_EDITOR_CONNECTION,
        payload: socket
    }
}