export function getRunnerList(page, search) {
    return {
        type: 'runner.list',
        page: page,
        search: search
    }
}

export function onRunnerList(runner) {
    return {
        type: 'runner.onList',
        runner: runner
    }
}