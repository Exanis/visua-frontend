import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as pipelineAction from '../../actions/pipeline';

export default function* watcherSaga() {
    yield takeLatest('pipeline.list', pipelineListSaga);
    yield takeLatest('pipeline.create', pipelineCreateSaga);
    yield takeLatest('pipeline.retrieve', pipelineRetrieveSaga);
    yield takeLatest('pipeline.model.update', pipelineModelUpdateSaga);
}

function fetchPipelineList(page, search) {
    return axios.get('/api/project/pipeline/?search=' + search + '&page=' + page);
}

function* pipelineListSaga(action) {
    try {
        const response = yield call(() => fetchPipelineList(action.page, action.search));

        yield put(pipelineAction.onPipelineList(response.data));
    } catch (_) {

    }
}

function doCreatePipeline(name) {
    return axios.post(
        '/api/project/pipeline/',
        {
            name: name
        }
    );
}

function* pipelineCreateSaga(action) {
    try {
        yield call(() => doCreatePipeline(action.name));
        yield put(pipelineAction.onPipelineCreateSuccess());
        yield put(pipelineAction.getPipelineList(action.page, action.search))
    } catch (error) {
        yield put(pipelineAction.onPipelineCreateError(error.response.data));
    }
}

function doRetrievePipeline(pipeline) {
    return axios.get('/api/project/pipeline/' + pipeline + '/');
}

function* pipelineRetrieveSaga(action) {
    try {
        const response = yield call(() => doRetrievePipeline(action.pipeline));

        yield put(pipelineAction.onPipelineRetrieveSuccess(response.data));
    } catch (_) {
        yield put(pipelineAction.onPipelineRetrieveError())
    }
}

function doUpdatePipelineModel(uuid, model) {
    return axios.patch('/api/project/pipeline/' + uuid + '/', {model: model});
}

function* pipelineModelUpdateSaga(action) {
    try {
        yield call(() => doUpdatePipelineModel(action.uuid, action.model));

        yield put(pipelineAction.onPipelineModelUpdate());
    } catch (_) {
        yield put(pipelineAction.onPipelineModelError());
    }
}