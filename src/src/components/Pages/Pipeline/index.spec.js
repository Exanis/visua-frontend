import React from 'react';
import {shallow} from 'enzyme';

import {Pipeline} from './index';

describe('<Pipeline />', () => {
    const defaultProps = {
        pipeline: {
            creation: {
                haveResult: false,
                success: false
            }
        },
        pipelineActions: {
            resetPipelineCreateState: () => {
            },
            getPipelineList: () => {
            },
            createPipeline: () => {}
        },
        intl: {
            formatMessage: () => {}
        }
    };


    it('should render Pipeline properly', () => {
        const rendererComponent = shallow(<Pipeline {...defaultProps} />);

        expect(rendererComponent).toMatchSnapshot();
    });

    it('should render Pipeline properly when form is open', () => {
        const rendererComponent = shallow(<Pipeline {...defaultProps} />);

        rendererComponent.instance().newPipelineDisplay = true;
        rendererComponent.update();
        expect(rendererComponent).toMatchSnapshot();
    });
});