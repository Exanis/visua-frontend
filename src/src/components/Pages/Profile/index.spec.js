import React from 'react';
import {shallow} from 'enzyme';

import {ProfilePage} from './index';

describe('<ProfilePage />', () => {
    const defaultProps = {
        user: {
            update: {
                haveResult: false,
                success: false
            },
            info: {}
        },
        classes: {},
        userActions: {
            updateUser: () => {
            },
        },
        intl: {
            formatMessage: () => {}
        }
    };


    it('should render ProfilePage properly', () => {
        const rendererComponent = shallow(<ProfilePage {...defaultProps} />);

        expect(rendererComponent).toMatchSnapshot();
    });
});