export function getBlockList(page, search) {
    return {
        type: 'block.list',
        page: page,
        search: search
    }
}

export function onBlockList(block) {
    return {
        type: 'block.onList',
        block: block
    }
}

export function createBlock(data, page, search) {
    return {
        type: 'block.create',
        data: data,
        page: page,
        search: search
    };
}

export function onCreateBlockSuccess() {
    return {
        type: 'block.create.ok',
    };
}

export function onCreateBlockError(errors) {
    return {
        type: 'block.create.error',
        errors: errors,
    };
}

export function resetCreateBlockState() {
    return {
        type: 'block.create.reset',
    };
}

export function editBlock(uuid, data, page, search) {
    return {
        type: 'block.edit',
        uuid: uuid,
        data: data,
        page: page,
        search: search
    };
}

export function onEditBlockSuccess() {
    return {
        type: 'block.edit.ok',
    };
}

export function onEditBlockError(errors) {
    return {
        type: 'block.edit.error',
        errors: errors,
    };
}

export function resetEditBlockState() {
    return {
        type: 'block.edit.reset',
    };
}

export function deleteBlock(uuid, page, search) {
    return {
        type: 'block.delete',
        uuid: uuid,
        page: page,
        search: search
    };
}

export function onDeleteBlockSuccess() {
    return {
        type: 'block.delete.ok',
    };
}

export function resetDeleteBlockState() {
    return {
        type: 'block.delete.reset',
    };
}
