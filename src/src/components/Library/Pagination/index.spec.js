import React from 'react';
import { shallow } from 'enzyme';

import { PaginationBase } from './index';

describe('<Pagination />', () => {
    const defaultProps = {
        count: 145,
        onClick: () => {},
        classes: {
            bordered: 'style-bordered',
            horizontal: 'style-horizontal',
            active: 'style-active'
        }
    };

    it('should render Pagination properly', () => {
        const rendererComponent = shallow(<PaginationBase {...defaultProps} />)

        expect(rendererComponent).toMatchSnapshot();
    });

    it('should render Pagination properly when there is no items', () => {
        const props = {
            ...defaultProps,
            count: 0
        };
        const rendererComponent = shallow(<PaginationBase {...props} />)

        expect(rendererComponent).toMatchSnapshot();
    });

    it('should render Pagination properly when pagesize is specified', () => {
        const props = {
            ...defaultProps,
            pageSize: 3
        };
        const rendererComponent = shallow(<PaginationBase {...props} />)

        expect(rendererComponent).toMatchSnapshot();
    });

    it('should render Pagination properly when there is only one page', () => {
        const props = {
            ...defaultProps,
            count: 29
        };
        const rendererComponent = shallow(<PaginationBase {...props} />)

        rendererComponent.instance().page = 2;
        rendererComponent.update();
        expect(rendererComponent).toMatchSnapshot();
    });
});