import * as Actions from './index';

describe('Block Actions', () => {
    it('getBlockList', () => {
        expect(Actions.getBlockList(1, 'test')).toMatchSnapshot();
    });
    it('onBlockList', () => {
        expect(Actions.onBlockList(['first', 'second'])).toMatchSnapshot();
    });
    it('createBlock', () => {
        expect(Actions.createBlock('test-blockname', 'test-firstname', 'test-lastname', 'test-email', 'test-password', false, 1, 'test')).toMatchSnapshot();
    });
    it('onCreateBlockSuccess', () => {
        expect(Actions.onCreateBlockSuccess()).toMatchSnapshot();
    });
    it('onCreateBlockError', () => {
        expect(Actions.onCreateBlockError(['error'])).toMatchSnapshot();
    });
    it('resetCreateBlockState', () => {
        expect(Actions.resetCreateBlockState()).toMatchSnapshot();
    });
    it('editBlock', () => {
        expect(Actions.editBlock('test-uuid', 'test-blockname', 'test-firstname', 'test-lastname', 'test-email', 'test-password', false, 1, 'test')).toMatchSnapshot();
    });
    it('onEditBlockSuccess', () => {
        expect(Actions.onEditBlockSuccess()).toMatchSnapshot();
    });
    it('onEditBlockError', () => {
        expect(Actions.onEditBlockError(['error'])).toMatchSnapshot();
    });
    it('resetEditBlockState', () => {
        expect(Actions.resetEditBlockState()).toMatchSnapshot();
    });
    it('deleteBlock', () => {
        expect(Actions.deleteBlock('test-uuid', 1, 'test')).toMatchSnapshot();
    });
    it('onDeleteBlockSuccess', () => {
        expect(Actions.onDeleteBlockSuccess()).toMatchSnapshot();
    });
    it('resetDeleteBlockState', () => {
        expect(Actions.resetDeleteBlockState()).toMatchSnapshot();
    });
});
