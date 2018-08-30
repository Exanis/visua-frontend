import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';

import ItemList from '../../Library/ItemsList';

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
    }
});

export class Runner extends React.Component {
    state = {
    };

    componentDidMount() {
        this.props.runnerActions.getRunnerToken();
    }

    render() {
        const { formatMessage } = this.props.intl;

        return (
            <div className={this.props.classes.vertical}>
                <div className={this.props.classes.horizontal}>
                    <Typography variant='body1' className={this.props.classes.explainText}>
                        <FormattedMessage
                            id={'runner.explain'}
                            defaultMessage={'To connect a runner, use this code as JOIN_TOKEN environment var'}
                            />
                    </Typography>
                    <Typography variant='headline' className={this.props.classes.gray}>
                        <p>{this.props.runner.token}</p>
                    </Typography>
                </div>
                <ItemList
                    title={formatMessage(messages.title)}
                    itemToPrimary={(item) => item.name}
                    itemToSecondary={(item) => item.addr}
                    count={this.props.runner.count}
                    items={this.props.runner.runner}
                    loaded={this.props.runner.loaded}
                    loadItems={this.props.runnerActions.getRunnerList}
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
