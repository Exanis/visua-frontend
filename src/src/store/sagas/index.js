import { all } from 'redux-saga/effects';
import userSaga from './user';
import usersSaga from './users';
import pipelineSaga from './pipeline';

export default function* rootSaga() {
    yield all([
        userSaga(),
        usersSaga(),
        pipelineSaga(),
    ]);
}