import * as Actions from './index';

describe('Users Actions', () => {
    it('getCurrentUserData', () => {
        expect(Actions.getCurrentUserData()).toMatchSnapshot();
    });
    it('logUserIn', () => {
        expect(Actions.logUserIn('username', 'password')).toMatchSnapshot();
    });
    it('onUserData', () => {
        expect(Actions.onUserData('test-user')).toMatchSnapshot();
    });
    it('onUserError', () => {
        expect(Actions.onUserError()).toMatchSnapshot();
    });
    it('onUserLoginSuccess', () => {
        expect(Actions.onUserLoginSuccess()).toMatchSnapshot();
    });
    it('onUserLoginError', () => {
        expect(Actions.onUserLoginError()).toMatchSnapshot();
    });
    it('onUserLoginClear', () => {
        expect(Actions.onUserLoginClear()).toMatchSnapshot();
    });
    it('logUserOut', () => {
        expect(Actions.logUserOut()).toMatchSnapshot();
    });
    it('updateUser', () => {
        expect(Actions.updateUser('test-uuid', 'test-firstname', 'test-lastname', 'test-email', 'test-password')).toMatchSnapshot();
    });
    it('onUpdateUserSuccess', () => {
        expect(Actions.onUpdateUserSuccess()).toMatchSnapshot();
    });
    it('onUpdateUserError', () => {
        expect(Actions.onUpdateUserError('error')).toMatchSnapshot();
    });
    it('resetCreateUserState', () => {
        expect(Actions.resetCreateUserState()).toMatchSnapshot();
    });
});