const initialState = {
    block: [],
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
        case 'block.list':
            return {
                ...state,
                loaded: false
            };
        case 'block.onList':
            return {
                ...state,
                block: action.block.results,
                count: action.block.count,
                loaded: true
            };
        case 'block.create.ok':
            return {
                ...state,
                creation: {
                    haveResult: true,
                    success: true,
                    errors: []
                }
            };
        case 'block.create.error':
            return {
                ...state,
                creation: {
                    haveResult: true,
                    success: false,
                    errors: action.errors
                }
            };
        case 'block.create.reset':
            return {
                ...state,
                creation: {
                    haveResult: false,
                    success: false,
                    errors: []
                }
            };
        case 'block.edit.ok':
            return {
                ...state,
                edition: {
                    haveResult: true,
                    success: true,
                    errors: []
                }
            };
        case 'block.edit.error':
            return {
                ...state,
                edition: {
                    haveResult: true,
                    success: false,
                    errors: action.errors
                }
            };
        case 'block.edit.reset':
            return {
                ...state,
                edition: {
                    haveResult: false,
                    success: false,
                    errors: []
                }
            };
        case 'block.delete.ok':
            return {
                ...state,
                deletion: {
                    haveResult: true,
                }
            };
        case 'block.delete.reset':
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
