const initialState = {
    users: [],
    count: 0,
    loaded: false,
    creation: {
        haveResult: false,
        success: false,
        errors: []
    },
    edition: {
        haveResult: false,
        success: false,
        errors: []
    },
    deletion: {
        haveResult: false
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'users.list':
            return {
                ...state,
                loaded: false
            };
        case 'users.onList':
            return {
                ...state,
                users: action.users.results,
                count: action.users.count,
                loaded: true
            };
        case 'users.create.ok':
            return {
                ...state,
                creation: {
                    haveResult: true,
                    success: true,
                    errors: []
                }
            };
        case 'users.create.error':
            return {
                ...state,
                creation: {
                    haveResult: true,
                    success: false,
                    errors: action.errors
                }
            };
        case 'users.create.reset':
            return {
                ...state,
                creation: {
                    haveResult: false,
                    success: false,
                    errors: []
                }
            };
        case 'users.edit.ok':
            return {
                ...state,
                edition: {
                    haveResult: true,
                    success: true,
                    errors: []
                }
            };
        case 'users.edit.error':
            return {
                ...state,
                edition: {
                    haveResult: true,
                    success: false,
                    errors: action.errors
                }
            };
        case 'users.edit.reset':
            return {
                ...state,
                edition: {
                    haveResult: false,
                    success: false,
                    errors: []
                }
            };
        case 'users.delete.ok':
            return {
                ...state,
                deletion: {
                    haveResult: true,
                }
            };
        case 'users.delete.reset':
            return {
                ...state,
                deletion: {
                    haveResult: false,
                }
            };
        default:
            return state;
    }
};