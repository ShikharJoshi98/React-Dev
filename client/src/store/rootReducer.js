import { combineReducers } from "@reduxjs/toolkit";
import projectReducer from "../features/project/projectReducer";
import { editorReducer } from "../features/editorSocket/editorReducer";

const rootReducer = combineReducers({
    project: projectReducer,
    editor: editorReducer
})

export default rootReducer