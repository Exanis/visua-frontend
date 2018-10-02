const initialState = {
    runner: [],
    count: 0,
    loaded: false,
    token: '',
    delete: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'runner.list':
            return {
                ...state,
                loaded: false
            };
        case 'runner.onList':
            return {
                ...state,
                runner: action.runner.results,
                count: action.runner.count,
                loaded: true
            };
        case 'runner.onToken':
            return {
                ...state,
                token: action.token
            };
        case 'runner.delete.success':
            return {
                ...state,
                delete: true
            };
        case 'runner.delete.clear':
            return {
                ...state,
                delete: false
            };
        default:
            return state;
    }
};
