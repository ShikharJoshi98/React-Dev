import { eventChannel } from "redux-saga";
import { call, put, take, takeEvery, fork } from "redux-saga/effects";
import editorAction from "./editorActionType";

function createReadFileChannel(socket) {
  return eventChannel((emit) => {
    const onReadFileSuccess = (data) => {
      emit({
        type: editorAction.READ_FILE_SUCCESS,
        payload: data,
      });
    };

    socket.on("readFileSuccess", onReadFileSuccess);

    return () => {
      socket.off("readFileSuccess", onReadFileSuccess);
    };
  });
}

function* watchReadFileChannel(socket) {
  const channel = yield call(createReadFileChannel, socket);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* handleCreateEditorConnection(action) {
  const socket = action.payload;

  yield fork(watchReadFileChannel, socket);
}

export function* editorSaga() {
  yield takeEvery(
    editorAction.CREATE_EDITOR_CONNECTION,
    handleCreateEditorConnection
  );
}