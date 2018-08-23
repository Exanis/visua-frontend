import React from 'react';
import {shallow} from 'enzyme';

import {VisuaToolbar} from './index';

describe('<VisuaToolbar />', () => {
    const defaultProps = {
        user: {
            info: {}
        },
        classes: {},
        intl: {
            formatMessage: (message) => message.id
        }
    };


    it('should render VisuaToolbar properly', () => {
        const rendererComponent = shallow(<VisuaToolbar {...defaultProps} />);

        expect(rendererComponent).toMatchSnapshot();
    });
});