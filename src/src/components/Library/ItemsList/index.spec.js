import React from 'react';
import { shallow } from 'enzyme';

import { ItemsListBase } from './index';

describe('<ItemList />', () => {
    const defaultProps = {
        onNewButton: () => {},
        newButtonText: 'test-new-button',
        title: 'test-title',
        itemToPrimary: () => 'test-primary',
        itemToSecondary: () => 'test-secondary',
        count: 135,
        items: [
            {
                uuid: 1
            },
            {
                uuid: 2
            },
            {
                uuid: 3
            },
            {
                uuid: 4
            },
            {
                uuid: 5
            },
            {
                uuid: 6
            },
        ],
        loaded: true,
        loadItems: () => {},
        classes: {}
    };

    it('should render ItemList properly', () => {
        const rendererComponent = shallow(<ItemsListBase {...defaultProps} />)

        expect(rendererComponent).toMatchSnapshot();
    });

    it('should render ItemList properly when not loaded', () => {
        const props = {
            ...defaultProps,
            loaded: false
        };
        const rendererComponent = shallow(<ItemsListBase {...props} />)

        expect(rendererComponent).toMatchSnapshot();
    });

    it('should render ItemList properly when there is no items', () => {
        const props = {
            ...defaultProps,
            count: 0,
            items: []
        };
        const rendererComponent = shallow(<ItemsListBase {...props} />)

        expect(rendererComponent).toMatchSnapshot();
    });
});