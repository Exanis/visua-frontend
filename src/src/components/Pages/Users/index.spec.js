import React from 'react';
import {shallow} from 'enzyme';

import {Users} from './index';

describe('<Users />', () => {
    const defaultProps = {
        users: {
            creation: {
                haveResult: false,
                success: false,
            },
            edition: {
                haveResult: false,
                success: false
            },
            deletion: {
                haveResult: false,
            },
        },
        classes: {},
        usersActions: {
            createUser: () => {
            },
            editUser: () => {},

        },
        intl: {
            formatMessage: (message) => message.id
        }
    };


    it('should render Users properly', () => {
        const rendererComponent = shallow(<Users {...defaultProps} />);

        expect(rendererComponent).toMatchSnapshot();
    });
});