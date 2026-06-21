import { all, call, put, takeLatest } from "redux-saga/effects";
import { projectAction } from "./projectActionType";
import { createProject, getProjectTree } from "./projectApi";
import { createProjectFailure, createProjectSuccess, getProjectTreeFailure, getProjectTreeSuccess } from "./projectAction";

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

function* getProjectTreeSaga(action) {
    try {
        const response = yield call(
            getProjectTree,
            action.payload
        );

        yield put(getProjectTreeSuccess(response));
    } catch (error) {
        yield put(getProjectTreeFailure(error.message));
    }
}

function* projectSaga() {
    yield all([
        takeLatest(
            projectAction.CREATE_PROJECT_REQUEST,
            createProjectSaga
        ),
        takeLatest(
            projectAction.GET_PROJECT_TREE_REQUEST,
            getProjectTreeSaga
        )
    ])
}

export default projectSaga