const initialState = {
    anonymous: true,
    info: {
        uuid: '',
        username: 'anonymous',
        last_login: null,
        first_name: '',
        last_name: '',
        email: '',
        is_staff: false
    },
    login: {
        error: false,
        success: false
    },
    update: {
        haveResult: false,
        success: false,
        errors: []
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "user.result":
            return {
                ...state,
                anonymous: false,
                info: {
                    uuid: action.user.uuid,
                    username: action.user.username,
                    last_login: action.user.last_login,
                    first_name: action.user.first_name,
                    last_name: action.user.last_name,
                    email: action.user.email,
                    is_staff: action.user.is_staff
                },
            };

        case "user.error":
            return {
                ...state,
                anonymous: true,
                info: {
                    uuid: '',
                    username: 'anonymous',
                    last_login: null,
                    first_name: '',
                    last_name: '',
                    email: '',
                    is_staff: false
                },
            };

        case "user.login.error":
            return {
                ...state,
                login: {
                    error: true,
                    success: false
                },
            };

        case "user.login.success":
            return {
                ...state,
                login: {
                    error: false,
                    success: true
                },
            };

        case "user.login.clear":
            return {
                ...state,
                login: {
                    error: false,
                    success: false
                },
            };

        case 'user.update.success':
            return {
                ...state,
                update: {
                    haveResult: true,
                    success: true,
                    errors: []
                }
            };

        case 'user.update.error':
            return {
                ...state,
                update: {
                    haveResult: true,
                    success: false,
                    errors: action.error
                }
            };

        case 'user.update.clear':
            return {
                ...state,
                update: {
                    haveResult: false,
                    success: false,
                    errors: []
                }
            };

        default:
            return state;
    }
}