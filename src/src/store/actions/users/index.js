export function getUsersList(page, search) {
    return {
        type: 'users.list',
        page: page,
        search: search
    }
}

export function onUsersList(users) {
    return {
        type: 'users.onList',
        users: users
    }
}

export function createUser(username, firstName, lastName, email, password, isStaff, page, search) {
    return {
        type: 'users.create',
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        isStaff: isStaff,
        page: page,
        search: search
    };
}

export function onCreateUserSuccess() {
    return {
        type: 'users.create.ok',
    };
}

export function onCreateUserError(errors) {
    return {
        type: 'users.create.error',
        errors: errors,
    };
}

export function resetCreateUserState() {
    return {
        type: 'users.create.reset',
    };
}

export function editUser(uuid, username, firstName, lastName, email, password, isStaff, page, search) {
    return {
        type: 'users.edit',
        uuid: uuid,
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        isStaff: isStaff,
        page: page,
        search: search
    };
}

export function onEditUserSuccess() {
    return {
        type: 'users.edit.ok',
    };
}

export function onEditUserError(errors) {
    return {
        type: 'users.edit.error',
        errors: errors,
    };
}

export function resetEditUserState() {
    return {
        type: 'users.edit.reset',
    };
}

export function deleteUser(uuid, page, search) {
    return {
        type: 'users.delete',
        uuid: uuid,
        page: page,
        search: search
    };
}

export function onDeleteUserSuccess() {
    return {
        type: 'users.delete.ok',
    };
}

export function resetDeleteUserState() {
    return {
        type: 'users.delete.reset',
    };
}