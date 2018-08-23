import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
    getUsersList,
    onCreateUserSuccess,
    onCreateUserError,
    onEditUserSuccess,
    onEditUserError,
    onUsersList,
    onDeleteUserSuccess
} from "../../actions/users";

export default function* watcherSaga() {
    yield takeLatest('users.list', usersListSaga);
    yield takeLatest('users.create', usersCreateSaga);
    yield takeLatest('users.edit', usersEditSaga);
    yield takeLatest('users.delete', usersDeleteSaga);
}

function fetchUsersList(page, search) {
    return axios.get('/api/user/?search=' + search + '&page=' + page);
}

function* usersListSaga(action) {
    try {
        const response = yield call(() => fetchUsersList(action.page, action.search));

        yield put(onUsersList(response.data));
    } catch (_) {
        // Do nothing here, this will keep the loading bar loading
    }
}

function doCreateUser(username, firstName, lastName, email, password, isStaff) {
    return axios.post(
        '/api/user/',
        {
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            is_staff: isStaff
        }
    );
}

function* usersCreateSaga(action) {
    try {
        yield call(() => doCreateUser(
            action.username,
            action.firstName,
            action.lastName,
            action.email,
            action.password,
            action.isStaff
        ));
        yield put(onCreateUserSuccess());
        yield put(getUsersList(action.page, action.search));
    } catch (error) {
        yield put(onCreateUserError(error.response.data));
    }
}

function doEditUser(uuid, username, firstName, lastName, email, password, isStaff) {
    const parameters = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        is_staff: isStaff,
    };

    if (password !== '')
        parameters['password'] = password;

    return axios.patch(
        '/api/user/' + uuid + '/',
        parameters
    );
}

function* usersEditSaga(action) {
    try {
        yield call(() => doEditUser(
            action.uuid,
            action.username,
            action.firstName,
            action.lastName,
            action.email,
            action.password,
            action.isStaff
        ));
        yield put(onEditUserSuccess());
        yield put(getUsersList(action.page, action.search));
    } catch (error) {
        yield put(onEditUserError(error.response.data));
    }
}

function doDeleteUser(uuid) {
    return axios.delete(
        '/api/user/' + uuid + '/'
    );
}

function* usersDeleteSaga(action) {
    try {
        yield call(() => doDeleteUser(action.uuid));
        yield put(onDeleteUserSuccess());
        yield put(getUsersList(action.page, action.search));
    } catch (error) {
        // Do nothing, this should never happen
    }
}