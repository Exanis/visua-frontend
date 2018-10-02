import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as runnerAction from '../../actions/runner';

export default function* watcherSaga() {
    yield takeLatest('runner.list', runnerListSaga);
    yield takeLatest('runner.token', runnerTokenSaga);
    yield takeLatest('runner.delete', deleteRunnerSaga);
}

function fetchRunnerList(page, search) {
    return axios.get('/api/project/runner/?search=' + search + '&page=' + page);
}

function* runnerListSaga(action) {
    try {
        const response = yield call(() => fetchRunnerList(action.page, action.search));

        yield put(runnerAction.onRunnerList(response.data));
    } catch (_) {

    }
}

function fetchRunnerToken() {
    return axios.get('/api/project/runner/token/');
}

function* runnerTokenSaga() {
    try {
        const response = yield call(fetchRunnerToken);

        yield put(runnerAction.onRunnerToken(response.data.token));
    } catch (_) {

    }
}

function deleteRunner(runner) {
    return axios.delete('/api/project/runner/' + runner + '/');
}

function* deleteRunnerSaga(action) {
    try {
        yield call(() => deleteRunner(action.runner));
        yield put(runnerAction.onDeleteRunnerSuccess());
        yield put(runnerAction.getRunnerList(action.page, action.search));
    } catch (error) {
        // This should never happen
    }
}