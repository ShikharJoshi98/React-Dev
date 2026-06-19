import { combineReducers } from "@reduxjs/toolkit";
import projectReducer from "../features/project/projectReducer";

const rootReducer = combineReducers({
    project: projectReducer,
})

export default rootReducer