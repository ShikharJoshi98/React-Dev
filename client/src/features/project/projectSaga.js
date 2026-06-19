import { all, call, put, takeLatest } from "redux-saga/effects";
import { projectAction } from "./projectActionType";
import { createProject } from "./projectApi";
import { createProjectFailure, createProjectSuccess } from "./projectAction";

function* createProjectSaga(action) {
    try {
        const response = yield call(
            createProject,
            action.payload
        );

        yield put(createProjectSuccess(response));
    } catch (error) {
        yield put(createProjectFailure(error.message));
    }
}

function* projectSaga() {
    yield all([
        takeLatest(
            projectAction.CREATE_PROJECT_REQUEST,
            createProjectSaga
        )
    ])
}

export default projectSaga