import { all } from 'redux-saga/effects';
import userSaga from './user';
import usersSaga from './users';
import pipelineSaga from './pipeline';
import blockSaga from './block';

export default function* rootSaga() {
    yield all([
        userSaga(),
        usersSaga(),
        pipelineSaga(),
        blockSaga(),
    ]);
}
