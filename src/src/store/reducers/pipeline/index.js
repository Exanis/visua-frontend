const initialState = {
    pipelines: [],
    count: 0,
    loaded: false,
    creation: {
        haveResult: false,
        success: false,
        errors: []
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'pipeline.list':
            return {
                ...state,
                loaded: false,
            };

        case 'pipeline.onList':
            return {
                ...state,
                loaded: true,
                count: action.pipelines.count,
                pipelines: action.pipelines.results
            };

        case 'pipeline.create.success':
            return {
                ...state,
                creation: {
                    haveResult: true,
                    success: true,
                    errors: []
                }
            };

        case 'pipeline.create.error':
            return {
                ...state,
                creation: {
                    haveResult: true,
                    success: false,
                    errors: action.errors
                }
            };

        case 'pipeline.create.reset':
            return {
                ...state,
                creation: {
                    haveResult: false,
                    success: false,
                    errors: action.errors
                }
            };

        default:
            return state;
    }
}