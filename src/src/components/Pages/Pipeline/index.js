import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from '../../Library/Snackbar';

import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';

import ItemList from '../../Library/ItemsList';

import * as PipelineActions from '../../../store/actions/pipeline';

const messages = defineMessages({
    title: {
        id: 'pipeline.title',
        defaultMessage: 'Pipelines'
    },
    newButtonTitle: {
        id: 'pipeline.new',
        defaultMessage: 'Create pipeline'
    },
    fieldName: {
        id: 'pipeline.field.name',
        defaultMessage: 'Name'
    },
    errorNameRequired: {
        id: 'pipeline.errors.name.required',
        defaultMessage: 'Name is required'
    },
    errorNameExists: {
        id: 'pipeline.errors.name.exists',
        defaultMessage: 'A pipeline already exists with this name'
    },
    errorNameTooLong: {
        id: 'pipeline.errors.name.tooLong',
        defaultMessage: 'Name too long (max 255 chars)'
    },
    errorNameTooShort: {
        id: 'pipeline.errors.name.tooShort',
        defaultMessage: 'Name too short (min 2 chars)'
    },
});

export class Pipeline extends React.Component {
    state = {
        page: 1,
        search: '',

        newPipelineDisplay: false,
        newPipelineName: '',
        newPipelineError: []
    };

    handleChange = field => ev => {
        const newState = {};

        newState[field] = ev.target.value;
        this.setState(newState);
    };

    openNewPipelineDialog = () => this.setState({newPipelineDisplay: true});
    closeNewPipelineDialog = () => this.setState({newPipelineDisplay: false});

    createNewPipeline = () => this.props.pipelineActions.createPipeline(this.state.newPipelineName);

    componentDidUpdate() {
        if (this.props.pipeline.creation.haveResult) {
            if (this.props.pipeline.creation.success) {
                this.setState({newPipelineDisplay: false});
            } else {
                this.setState({newPipelineError: this.props.pipeline.creation.errors});
            }
            this.props.pipelineActions.resetPipelineCreateState();
        }
    }

    onListEvent = (page, search) => this.setState({
        page: page,
        search: search
    }, () => this.props.pipelineActions.getPipelineList(page, search));

    displayNewPipeline = () => {
        const { formatMessage } = this.props.intl;

        return <Dialog
            open={this.state.newPipelineDisplay}
            onClose={this.closeNewPipelineDialog}
        >
            <DialogTitle>
                <FormattedMessage
                    id={'pipeline.newPipeline.createText'}
                    defaultMessage={'Create a new pipeline'}
                    />
            </DialogTitle>
            <DialogContent>
                <TextField
                    value={this.state.newPipelineName}
                    label={this.state.newPipelineError.name !== undefined ? formatMessage(messages[this.state.newPipelineError.name]) : formatMessage(messages.fieldName)}
                    error={this.state.newPipelineError.name !== undefined}
                    onChange={this.handleChange('newPipelineName')}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeNewPipelineDialog} color="secondary">
                    <FormattedMessage
                        id={'pipeline.newPipeline.cancel'}
                        defaultMessage={'Cancel'}
                    />
                </Button>
                <Button onClick={this.createNewPipeline} color="primary">
                    <FormattedMessage
                        id={'pipeline.newPipeline.create'}
                        defaultMessage={'Create pipeline'}
                    />
                </Button>
            </DialogActions>
        </Dialog>
    };

    render() {
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <Snackbar open={this.props.pipeline.creation.haveResult && !this.props.pipeline.creation.success} variant={'error'}>
                    <FormattedMessage
                        id={'pipeline.creation.error'}
                        defaultMessage={'Error while creating pipeline; please check the form.'}
                    />
                </Snackbar>
                <Snackbar open={this.props.pipeline.creation.haveResult && this.props.pipeline.creation.success} variant={'success'}>
                    <FormattedMessage
                        id={'pipeline.creation.success'}
                        defaultMessage={'Pipeline created.'}
                    />
                </Snackbar>
                {this.displayNewPipeline()}
                <ItemList
                    onNewButton={this.openNewPipelineDialog}
                    newButtonText={formatMessage(messages.newButtonTitle)}
                    title={formatMessage(messages.title)}
                    itemToPrimary={(item) => item.name}
                    itemToSecondary={() => null}
                    count={this.props.pipeline.count}
                    items={this.props.pipeline.pipelines}
                    loaded={this.props.pipeline.loaded}
                    loadItems={this.onListEvent}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pipeline: state.pipeline,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        pipelineActions: bindActionCreators(PipelineActions, dispatch),
    }
};

const pipelinePage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(Pipeline));

pipelinePage.propTypes = {};
export default pipelinePage;