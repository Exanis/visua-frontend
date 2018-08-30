import * as Actions from './index';

describe('Runner Actions', () => {
    it('getRunnerList', () => {
        expect(Actions.getRunnerList(1, 'test')).toMatchSnapshot();
    });
    it('onRunnerList', () => {
        expect(Actions.onRunnerList(['first', 'second'])).toMatchSnapshot();
    });
});
