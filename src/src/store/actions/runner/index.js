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

export function getRunnerToken() {
    return {
        type: 'runner.token'
    }
}

export function onRunnerToken(token) {
    return {
        type: 'runner.onToken',
        token: token
    }
}