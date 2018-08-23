import * as Actions from './index';

describe('Users Actions', () => {
    it('getUsersList', () => {
        expect(Actions.getUsersList(1, 'test')).toMatchSnapshot();
    });
    it('onUsersList', () => {
        expect(Actions.onUsersList(['first', 'second'])).toMatchSnapshot();
    });
    it('createUser', () => {
        expect(Actions.createUser('test-username', 'test-firstname', 'test-lastname', 'test-email', 'test-password', false, 1, 'test')).toMatchSnapshot();
    });
    it('onCreateUserSuccess', () => {
        expect(Actions.onCreateUserSuccess()).toMatchSnapshot();
    });
    it('onCreateUserError', () => {
        expect(Actions.onCreateUserError(['error'])).toMatchSnapshot();
    });
    it('resetCreateUserState', () => {
        expect(Actions.resetCreateUserState()).toMatchSnapshot();
    });
    it('editUser', () => {
        expect(Actions.editUser('test-uuid', 'test-username', 'test-firstname', 'test-lastname', 'test-email', 'test-password', false, 1, 'test')).toMatchSnapshot();
    });
    it('onEditUserSuccess', () => {
        expect(Actions.onEditUserSuccess()).toMatchSnapshot();
    });
    it('onEditUserError', () => {
        expect(Actions.onEditUserError(['error'])).toMatchSnapshot();
    });
    it('resetEditUserState', () => {
        expect(Actions.resetEditUserState()).toMatchSnapshot();
    });
    it('deleteUser', () => {
        expect(Actions.deleteUser('test-uuid', 1, 'test')).toMatchSnapshot();
    });
    it('onDeleteUserSuccess', () => {
        expect(Actions.onDeleteUserSuccess()).toMatchSnapshot();
    });
    it('resetDeleteUserState', () => {
        expect(Actions.resetDeleteUserState()).toMatchSnapshot();
    });
});