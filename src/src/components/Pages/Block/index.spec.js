import React from 'react';
import {shallow} from 'enzyme';

import {Block} from './index';

describe('<Block />', () => {
    const defaultProps = {
        block: {
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
        blockActions: {
            createBlock: () => {
            },
            editBlock: () => {},

        },
        intl: {
            formatMessage: (message) => message.id
        }
    };


    it('should render Block properly', () => {
        const rendererComponent = shallow(<Block {...defaultProps} />);

        expect(rendererComponent).toMatchSnapshot();
    });
});
