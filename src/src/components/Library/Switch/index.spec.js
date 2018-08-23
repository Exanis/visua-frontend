import React from 'react';
import { shallow, mount } from 'enzyme';

import Switch from './index';

describe('<Switch />', () => {
    const defaultProps = {
        checked: true,
        onChange: () => {},
        label: 'test-label'
    };

    it('should render Switch properly', () => {
        const rendererComponent = shallow(<Switch {...defaultProps} />);

        expect(rendererComponent).toMatchSnapshot();
    });
});