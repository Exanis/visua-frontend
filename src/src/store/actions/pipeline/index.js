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

export function setCurrentPipeline(pipeline) {
    return {
        type: 'pipeline.retrieve',
        pipeline: pipeline
    }
}

export function onPipelineRetrieveSuccess(pipeline) {
    return {
        type: 'pipeline.select.success',
        pipeline: pipeline
    }
}

export function onPipelineRetrieveError() {
    return {
        type: 'pipeline.select.error',
    }
}

export function resetPipelineRetrieveState() {
    return {
        type: 'pipeline.select.reset'
    }
}

export function pipelineModelUpdate(uuid, model) {
    return {
        type: 'pipeline.model.update',
        uuid: uuid,
        model: model
    };
}

export function onPipelineModelUpdate() {
    return {
        type: 'pipeline.model.update.success'
    };
}

export function onPipelineModelError() {
    return {
        type: 'pipeline.model.update.error'
    };
}

export function resetPipelineModelUpdate() {
    return {
        type: 'pipeline.model.update.reset'
    };
}