import React from 'react';
import { shallow } from 'enzyme';

import App from './index';

describe('<App />', () => {
    it('should render App properly', () => {
        const props = {
            classes: {},
            requestCurrentUserData: () => {}
        };
        const rendererComponent = shallow(<App {...props} />)

        expect(rendererComponent).toMatchSnapshot();
    });
});