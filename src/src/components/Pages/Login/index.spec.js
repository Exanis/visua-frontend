import React from 'react';
import { shallow } from 'enzyme';

import { LoginFormBase, Login } from './index';

describe('<Login />', () => {
    it('should render Login properly', () => {
        const props = {
            user: {
                login: {
                    success: false,
                    error: false
                }
            },
            userActions: {
                onUserLoginClear: () => {},
                logUserIn: () => {},
            },
            navigationActions: {
                redirect: () => {}
            },
            classes: {
                innerForm: 'test-innerForm'
            }
        };
        const rendererComponent = shallow(<Login {...props} />);

        expect(rendererComponent).toMatchSnapshot();
    });

    it('should render LoginForm properly', () => {
        const props = {
            intl: {
                formatMessage: () => {},
                onLogin: () => {}
            }
        };
        const rendererComponent = shallow(<LoginFormBase {...props} />);

        expect(rendererComponent).toMatchSnapshot();
    });
});