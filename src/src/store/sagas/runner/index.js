import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as runnerAction from '../../actions/runner';

export default function* watcherSaga() {
    yield takeLatest('runner.list', runnerListSaga);
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
