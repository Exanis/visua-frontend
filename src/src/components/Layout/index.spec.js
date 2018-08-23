import React from 'react';
import { shallow } from 'enzyme';

import { Layout } from '../Layout/index';

describe('<Layout />', () => {
    it('should render Layout properly', () => {
        const props = {
            classes: {},
            requestCurrentUserData: () => {}
        };
        const rendererComponent = shallow(<Layout {...props} />)

        expect(rendererComponent).toMatchSnapshot();
    });
});