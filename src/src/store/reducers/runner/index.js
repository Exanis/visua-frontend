const initialState = {
    runner: [],
    count: 0,
    loaded: false,
    token: ''
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
        default:
            return state;
    }
};
