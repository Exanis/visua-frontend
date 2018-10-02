import * as Actions from './index';

describe('Runner Actions', () => {
    it('getRunnerList', () => {
        expect(Actions.getRunnerList(1, 'test')).toMatchSnapshot();
    });
    it('onRunnerList', () => {
        expect(Actions.onRunnerList(['first', 'second'])).toMatchSnapshot();
    });
    it('getRunnerToken', () => {
        expect(Actions.getRunnerToken()).toMatchSnapshot();
    });
    it('onRunnerToken', () => {
        expect(Actions.onRunnerToken('test')).toMatchSnapshot();
    });
    it('deleteRunner', () => {
        expect(Actions.deleteRunner('test', 'page', 'search')).toMatchSnapshot();
    });
    it('onDeleteRunnerSuccess', () => {
        expect(Actions.onDeleteRunnerSuccess()).toMatchSnapshot();
    });
    it('clearDeleteRunnerStatus', () => {
        expect(Actions.clearDeleteRunnerStatus()).toMatchSnapshot();
    });
});
