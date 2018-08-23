import * as Actions from './index';

describe('Pipeline Actions', () => {
    it('getPipelineList', () => {
        expect(Actions.getPipelineList(1, 'test')).toMatchSnapshot();
    });
    it('onPipelineList', () => {
        expect(Actions.onPipelineList(['first', 'second'])).toMatchSnapshot();
    });
    it('createPipeline', () => {
        expect(Actions.createPipeline('test-name', 1, 'test')).toMatchSnapshot();
    });
    it('onPipelineCreateSuccess', () => {
        expect(Actions.onPipelineCreateSuccess()).toMatchSnapshot();
    });
    it('onPipelineCreateError', () => {
        expect(Actions.onPipelineCreateError(['error'])).toMatchSnapshot();
    });
    it('resetPipelineCreateState', () => {
        expect(Actions.resetPipelineCreateState()).toMatchSnapshot();
    });
});