export function getCurrentUserData() {
    return {
        type: "user.request",
    };
}

export function logUserIn(username, password) {
    return {
        type: "user.login",
        user: {
            username: username,
            password: password
        }
    };
}

export function onUserData(user) {
    return {
        type: "user.result",
        user: user,
    };
}

export function onUserError() {
    return {
        type: "user.error",
    };
}

export function onUserLoginSuccess() {
    return {
        type: "user.login.success",
    };
}

export function onUserLoginError() {
    return {
        type: "user.login.error",
    };
}

export function onUserLoginClear() {
    return {
        type: "user.login.clear",
    };
}

export function logUserOut() {
    return {
        type: "user.logout",
    };
}

export function updateUser(uuid, firstName, lastName, email, password) {
    return {
        type: "user.update",
        uuid: uuid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };
}

export function onUpdateUserSuccess() {
    return {
        type: 'user.update.success'
    };
}

export function onUpdateUserError(error) {
    return {
        type: 'user.update.error',
        error: error
    };
}

export function resetCreateUserState() {
    return {
        type: 'user.update.clear'
    };
}