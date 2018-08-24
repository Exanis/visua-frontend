import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as blockAction from '../../actions/block';

export default function* watcherSaga() {
    yield takeLatest('block.list', blockListSaga);
    yield takeLatest('block.create', blockCreateSaga);
    yield takeLatest('block.edit', blockEditSaga);
    yield takeLatest('block.delete', blockDeleteSaga);
}

function fetchBlockList(page, search) {
    return axios.get('/api/project/block/?search=' + search + '&page=' + page);
}

function* blockListSaga(action) {
    try {
        const response = yield call(() => fetchBlockList(action.page, action.search));

        yield put(blockAction.onBlockList(response.data));
    } catch (_) {

    }
}

function doCreateblock(data) {
    return axios.post(
        '/api/project/block/',
        {
            data: data
        }
    );
}

function* blockCreateSaga(action) {
    try {
        yield call(() => doCreateblock(action.data));
        yield put(blockAction.onCreateBlockSuccess());
        yield put(blockAction.getBlockList(action.page, action.search))
    } catch (error) {
        yield put(blockAction.onCreateBlockError(error.response.data));
    }
}

function doEditBlock(uuid, data) {
    return axios.patch(
        '/api/project/block/' + uuid + '/',
        {
            data: data
        }
    )
}

function* blockEditSaga(action) {
    try {
        yield call(() => doEditBlock(
            action.uuid,
            action.data,
        ));
        yield put(blockAction.onEditBlockSuccess());
        yield put(blockAction.getBlockList(action.page, action.search));
    } catch (error) {
        yield put(blockAction.onEditBlockError(error.response.data));
    }
}

function doDeleteBlock(uuid) {
    return axios.delete(
        '/api/project/block/' + uuid + '/'
    );
}

function* blockDeleteSaga(action) {
    try {
        yield call(() => doDeleteBlock(action.uuid));
        yield put(blockAction.onDeleteBlockSuccess());
        yield put(blockAction.getBlockList(action.page, action.search));
    } catch (error) {
        // Do nothing, this should never happen
    }
}
