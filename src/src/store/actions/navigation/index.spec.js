import { redirect } from './index';

describe('Navigation Actions', () => {
    it('Redirect: should redirect you', () => {
        expect(redirect('/test-location')).toMatchSnapshot();
    });
});