import React from 'react';
import {shallow, mount} from 'enzyme';

import Snackbar, {MySnackbarContent} from './index';

describe('<Snackbar />', () => {
    const defaultProps = {
        open: true,
        variant: 'success'
    };

    it('should render Snackbar properly', () => {
        const rendererComponent = shallow(<Snackbar {...defaultProps} />);

        expect(rendererComponent).toMatchSnapshot();
    });

    it('should render Snackbar properly when hidden', () => {
        const props = {
            ...defaultProps,
            open: false
        };
        const rendererComponent = shallow(<Snackbar {...props} />);

        expect(rendererComponent).toMatchSnapshot();
    });

    it('should render Snackbar content properly', () => {
        const props = {
            classes: {},
            onClose: () => {
            },
            variant: 'success',
            intl: {
                formatMessage: () => 'test-intl'
            }
        };
        const rendererComponent = shallow(<MySnackbarContent {...props} />);

        expect(rendererComponent).toMatchSnapshot();
    });
});