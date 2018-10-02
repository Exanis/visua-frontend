import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';

import ItemList from '../../Library/ItemsList';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';

import Snackbar from '../../Library/Snackbar';

import * as RunnerActions from '../../../store/actions/runner';

const styles = {
    vertical: {
        display: 'flex',
        flexDirection: 'column'
    },
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20
    },
    explainText: {
        flexGrow: 1
    },
    gray: {
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: 'lightgray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

const messages = defineMessages({
    title: {
        id: 'runner.title',
        defaultMessage: 'Runners'
    },
    lastCheck: {
        id: 'runner.lastCheck',
        defaultMessage: 'Last check: {last, date, full}'
    }
});

export class Runner extends React.Component {
    state = {
        deleteRunnerDisplay: false,
        targetRunner: null,
        page: 1,
        search: ''
    };

    componentDidMount() {
        this.props.runnerActions.getRunnerToken();
    }
    
    componentDidUpdate() {
        if (this.props.runner.delete)
            this.props.runnerActions.clearDeleteRunnerStatus();
    }

    listRunners = (page, search) => this.setState({
        page: page,
        search: search
    }, () => this.props.runnerActions.getRunnerList(page, search));

    closeDeleteRunnerDialog = () => this.setState({
        deleteRunnerDisplay: false,
        targetRunner: null
    });

    openDeleteRunnerDialog = (runner) => this.setState({
        deleteRunnerDisplay: true,
        targetRunner: runner
    });

    deleteRunner = () => {
        this.props.runnerActions.deleteRunner(
            this.state.targetRunner.uuid,
            this.state.page,
            this.state.search
        );
        this.closeDeleteRunnerDialog();
    };

    runnerToName = (formatMessage) => (item) => <div>
        <Tooltip title={formatMessage(messages.lastCheck, {'last': item.last_update})}>
        {
            item.alive ? <CheckCircleOutline/> : <HighlightOff/>
        }</Tooltip>
        { item.name }
    </div>;

    render() {
        const {formatMessage} = this.props.intl;

        return (
            <div className={this.props.classes.vertical}>
                <Dialog
                    open={this.state.deleteRunnerDisplay}
                    onClose={this.closeDeleteRunnerDialog}>
                    <DialogTitle>
                        <FormattedMessage
                            id={'runner.deletion.title'}
                            defaultMessage={'Are you sure?'}
                        />
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <FormattedMessage
                                id={'runner.deletion.text'}
                                defaultMessage={'Do you really want to delete this runner? You will not be able to undo this action.'}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDeleteRunnerDialog} color='secondary'>
                            <FormattedMessage
                                id={'runner.deletion.cancel'}
                                defaultMessage={'Cancel'}
                            />
                        </Button>
                        <Button onClick={this.deleteRunner} color='primary'>
                            <FormattedMessage
                                id={'runner.deletion.confirm'}
                                defaultMessage={'Delete'}
                            />
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={this.props.runner.delete} variant={'success'}>
                    <FormattedMessage
                        id={'runner.deletion.success'}
                        defaultMessage={'Runner deleted.'}
                    />
                </Snackbar>
                <div className={this.props.classes.horizontal}>
                    <Typography variant='body1' className={this.props.classes.explainText}>
                        <FormattedMessage
                            id={'runner.explain'}
                            defaultMessage={'To connect a runner, use this code as API_TOKEN environment var'}
                        />
                    </Typography>
                    <Typography variant='headline' className={this.props.classes.gray}>
                        <p>{this.props.runner.token}</p>
                    </Typography>
                </div>
                <ItemList
                    title={formatMessage(messages.title)}
                    itemToPrimary={this.runnerToName(formatMessage)}
                    itemToSecondary={(item) => item.addr}
                    count={this.props.runner.count}
                    items={this.props.runner.runner}
                    loaded={this.props.runner.loaded}
                    loadItems={this.listRunners}
                    onDeleteItem={this.openDeleteRunnerDialog}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        runner: state.runner,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        runnerActions: bindActionCreators(RunnerActions, dispatch),
    }
};

const RunnerPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(withStyles(styles)(Runner)));

RunnerPage.propTypes = {};
export default RunnerPage;
