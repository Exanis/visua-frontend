import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
    getCurrentUserData,
    onUserData,
    onUserError,
    onUserLoginError,
    onUserLoginSuccess,
    onUpdateUserSuccess,
    onUpdateUserError
} from "../../actions/user";

import { delay } from 'redux-saga';
import { redirect } from '../../actions/navigation';

export default function* watcherSaga() {
    yield takeLatest("user.request", userRequestSaga);
    yield takeLatest("user.login", userLoginSaga);
    yield takeLatest("user.logout", userLogoutSaga);
    yield takeLatest("user.update", userUpdateSaga);
}

function fetchUserData() {
    return axios.get('/api/user/me/');
}

function* userRequestSaga() {
    try {
        const response = yield call(fetchUserData);

        yield put(onUserData(response.data));
        yield keepUserLoggedIn();
    } catch(error) {
        yield put(onUserError());
    }
}

function logUserIn(username, password) {
    return axios.post(
        '/api/user/auth/login/',
        {
            username: username,
            password: password
        }
    );
}

function* userLoginSaga(action) {
    try {
        yield call(() => logUserIn(action.user.username, action.user.password));
        yield put(onUserLoginSuccess());
        yield put(getCurrentUserData());
    } catch (error) {
        yield put(onUserLoginError());
    }
}

function logUserOut() {
    return axios.post('/api/user/logout/');
}

function* userLogoutSaga() {
    try {
        yield call(logUserOut);
        yield put(getCurrentUserData());
    } catch (error) {

    }
}

function updateUser(uuid, firstName, lastName, email, password) {
    const parameters = {
        first_name: firstName,
        last_name: lastName,
        email: email
    };

    if (password !== '')
        parameters['password'] = password;

    return axios.patch(
        '/api/user/' + uuid + '/',
        parameters
    );
}

function* userUpdateSaga(action) {
    try {
        yield call(() => updateUser(
            action.uuid,
            action.firstName,
            action.lastName,
            action.email,
            action.password
        ));
        yield put(onUpdateUserSuccess());
        yield put(getCurrentUserData());
    } catch (error) {
        yield put(onUpdateUserError(error.response.data));
    }
}

function refreshUserToken() {
    return axios.post('/api/user/auth/refresh/');
}

function *keepUserLoggedIn() {
    try {
        while (true) {
            yield call(refreshUserToken);
            yield delay(180000);
        }
    } catch (e) {
        yield put(redirect('/'));
    }
}
