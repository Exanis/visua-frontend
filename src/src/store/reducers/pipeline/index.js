const initialState = {
    pipelines: [],
    count: 0,
    loaded: false,
    pipeline: null,
    creation: {
        haveResult: false,
        success: false,
        errors: []
    },
    retrieve: {
        pipeline: null,
        haveResult: false,
        success: false
    },
    modelUpdate: {
        haveResult: false,
        success: false
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

        case 'pipeline.select.success':
            return {
                ...state,
                retrieve: {
                    pipeline: action.pipeline,
                    haveResult: true,
                    success: true
                }
            };

        case 'pipeline.select.error':
            return {
                ...state,
                retrieve: {
                    pipeline: null,
                    haveResult: true,
                    success: false
                }
            };

        case 'pipeline.select.reset':
            return {
                ...state,
                retrieve: {
                    pipeline: null,
                    haveResult: false,
                    success: false
                }
            };

        case 'pipeline.model.update.success':
            return {
                ...state,
                modelUpdate: {
                    haveResult: true,
                    success: true
                }
            };

        case 'pipeline.model.update.error':
            return {
                ...state,
                modelUpdate: {
                    haveResult: true,
                    success: false
                }
            };

        case 'pipeline.model.update.reset':
            return {
                ...state,
                modelUpdate: {
                    haveResult: false,
                    success: false
                }
            };

        default:
            return state;
    }
}