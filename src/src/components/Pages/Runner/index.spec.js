import React from 'react';
import {shallow} from 'enzyme';

import {Runner} from './index';

describe('<Runner />', () => {
    const defaultProps = {
        runner: {
        },
        classes: {},
        runnerActions: {
            getRunnerToken: () => false
        },
        intl: {
            formatMessage: (message) => message.id
        }
    };


    it('should render Runner properly', () => {
        const rendererComponent = shallow(<Runner {...defaultProps} />);

        expect(rendererComponent).toMatchSnapshot();
    });
});
