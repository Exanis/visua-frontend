import React from 'react';
import {shallow} from 'enzyme';

import {EditorPage} from './index';

describe('<EditorPage />', () => {
    const defaultProps = {
        pipeline: {
            retrieve: {
                haveResult: true,
                success: true,
                pipeline: {}
            },
            modelUpdate: {
                haveResult: false,
                success: false
            }
        },
        block: {},
        blockActions: {
            getAllBlocks: () => {
            }
        },
        pipelineActions: {
            setCurrentPipeline: () => {
            }
        },
        navigationActions: {},
        classes: {},
        intl: {
            formatMessage: (message) => message.id
        },
        match: {
            params: {}
        }
    };


    it('should render EditorPage properly', () => {
        const rendererComponent = shallow(<EditorPage {...defaultProps} />);

        expect(rendererComponent).toMatchSnapshot();
    });
});
