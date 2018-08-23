export function getPipelineList(page, search) {
    return {
        type: 'pipeline.list',
        page: page,
        search: search
    };
}

export function onPipelineList(pipelines) {
    return {
        type: 'pipeline.onList',
        pipelines: pipelines
    };
}

export function createPipeline(name, page, search) {
    return {
        type: 'pipeline.create',
        name: name,
        page: page,
        search: search
    };
}

export function onPipelineCreateSuccess() {
    return {
        type: 'pipeline.create.success'
    };
}

export function onPipelineCreateError(error) {
    return {
        type: 'pipeline.create.error',
        error: error
    };
}

export function resetPipelineCreateState() {
    return {
        type: 'pipeline.create.reset'
    };
}
