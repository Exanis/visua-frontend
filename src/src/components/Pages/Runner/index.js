import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {withStyles} from '@material-ui/core/styles';

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
        flexDirection: 'row'
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

    render() {
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <ItemList
                    title={formatMessage(messages.title)}
                    itemToPrimary={(item) => item.name}
                    itemToSecondary={(item) => item.addr}
                    count={this.props.runner.count}
                    items={this.props.runner.block}
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
