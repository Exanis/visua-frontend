import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from '../../Library/Snackbar';

import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';

import ItemList from '../../Library/ItemsList';

import * as BlockActions from '../../../store/actions/block';

const styles = {
    vertical: {
        display: 'flex',
        flexDirection: 'column'
    },
};

const messages = defineMessages({
    title: {
        id: 'block.title',
        defaultMessage: 'Block',
    },
    newButtonTitle: {
        id: 'block.new',
        defaultMessage: 'Create block',
    },
    fieldData: {
        id: 'block.field.data',
        defaultMessage: 'Block descriptor'
    },
    errorMissingApiVersion: {
        id: 'block.errors.apiVersion.missing',
        defaultMessage: 'Invalid descriptor: missing API version'
    },
    errorInvalidVersion: {
        id: 'block.errors.apiVersion.invalid',
        defaultMessage: 'Invalid descriptor: unsupported API version'
    },
    errorMissingName: {
        id: 'block.errors.name.missing',
        defaultMessage: 'Invalid descriptor: missing name'
    },
    errorNameTooLong: {
        id: 'block.errors.name.tooLong',
        defaultMessage: 'Invalid descriptor: name is too long (max 255 characters)'
    },
    errorMissingDataInput: {
        id: 'block.errors.dataInput.missing',
        defaultMessage: 'Invalid descriptor: missing data input'
    },
    errorInvalidDataInput: {
        id: 'block.errors.dataInput.invalid',
        defaultMessage: 'Invalid descriptor: invalid data input (must be a list)'
    },
    errorMissingDataOutput: {
        id: 'block.errors.dataOutput.missing',
        defaultMessage: 'Invalid descriptor: missing data output'
    },
    errorInvalidDataOutput: {
        id: 'block.errors.dataOutput.invalid',
        defaultMessage: 'Invalid descriptor: invalid data output (must be a list)'
    },
    errorMissingVarsInput: {
        id: 'block.errors.varsInput.missing',
        defaultMessage: 'Invalid descriptor: missing vars input'
    },
    errorInvalidVarsInput: {
        id: 'block.errors.varsInput.invalid',
        defaultMessage: 'Invalid descriptor: invalid vars input (must be a list)'
    },
    errorMissingVarsOutput: {
        id: 'block.errors.varsOutput.missing',
        defaultMessage: 'Invalid descriptor: missing vars output'
    },
    errorInvalidVarsOutput: {
        id: 'block.errors.varsOutput.invalid',
        defaultMessage: 'Invalid descriptor: invalid vars output (must be a list)'
    },
    errorMissingImage: {
        id: 'block.errors.image.missing',
        defaultMessage: 'Invalid descriptor: missing block image'
    },
    errorInvalidData: {
        id: 'block.errors.data.invalid',
        defaultMessage: 'Descriptor must be a valid JSON'
    },
    errorMissingData: {
        id: 'block.errors.data.missing',
        defaultMessage: 'Descriptor is required'
    },
});

export class Block extends React.Component {
    state = {
        page: 1,
        search: '',

        newBlockDisplay: false,
        newBlockData: '',
        newBlockError: [],

        targetBlock: null,

        editBlockDisplay: false,
        editBlockData: '',
        editBlockError: [],

        deleteBlockDisplay: false,
    };

    handleChange = field => ev => {
        const newState = {};

        newState[field] = ev.target.value;
        this.setState(newState);
    };

    openNewBlockDialog = () => this.setState({newBlockDisplay: true});
    closeNewBlockDialog = () => this.setState({newBlockDisplay: false});
    createNewBlock = () => {
        this.props.blockActions.createBlock(
            this.state.newBlockData,
            this.state.page,
            this.state.search
        );
    };

    openEditBlockDialog = (item) => this.setState({
        editBlockDisplay: true,
        targetBlock: item,
        editBlockData: item.data,
    });
    closeEditBlockDialog = () => this.setState({editBlockDisplay: false});
    createEditBlock = () => {
        this.props.blockActions.editBlock(
            this.state.targetBlock.uuid,
            this.state.editBlockData,
            this.state.page,
            this.state.search
        );
    };

    openDeleteBlockDialog = (item) => this.setState({
        deleteBlockDisplay: true,
        targetBlock: item,
    });
    closeDeleteBlockDialog = () => this.setState({deleteBlockDisplay: false});

    componentDidUpdate() {
        if (this.props.block.creation.haveResult) {
            if (this.props.block.creation.success) {
                this.setState({newBlockDisplay: false});
            } else {
                this.setState({newBlockError: this.props.block.creation.errors});
            }
            this.props.blockActions.resetCreateBlockState();
        }
        if (this.props.block.edition.haveResult) {
            if (this.props.block.edition.success) {
                this.setState({editBlockDisplay: false});
            } else {
                this.setState({editBlockError: this.props.block.edition.errors});
            }
            this.props.blockActions.resetEditBlockState();
        }
        if (this.props.block.deletion.haveResult) {
            this.closeDeleteBlockDialog();
            this.props.blockActions.resetDeleteBlockState();
        }
    }

    onListEvent = (page, search) => this.setState({
        page: page,
        search: search
    }, () => this.props.blockActions.getBlockList(page, search));

    getCreateBlockFieldName = (field, baseName, formatMessage) => formatMessage(this.state.newBlockError[field] !== undefined ? messages[this.state.newBlockError[field]] : messages[baseName]);
    getNewBlockError = (field) => this.state.newBlockError[field] !== undefined;

    displayNewBlock = () => {
        const {formatMessage} = this.props.intl;

        return <Dialog
            open={this.state.newBlockDisplay}
            onClose={this.closeNewBlockDialog}
        >
            <DialogTitle>
                <FormattedMessage
                    id={'block.newBlock.title'}
                    defaultMessage={'Create new block'}
                />
            </DialogTitle>
            <DialogContent className={this.props.classes.vertical}>
                <DialogContentText>
                    <FormattedMessage
                        id={'block.newBlock.createText'}
                        defaultMessage={'The data used in this form should be provided by the block\'s creator.'}
                    />
                </DialogContentText>
                <TextField
                    value={this.state.newBlockData}
                    label={this.getCreateBlockFieldName('data', 'fieldData', formatMessage)}
                    onChange={this.handleChange('newBlockData')}
                    error={this.getNewBlockError('data')}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeNewBlockDialog} color="secondary">
                    <FormattedMessage
                        id={'block.newBlock.cancel'}
                        defaultMessage={'Cancel'}
                    />
                </Button>
                <Button onClick={this.createNewBlock} color="primary">
                    <FormattedMessage
                        id={'block.newBlock.create'}
                        defaultMessage={'Create block'}
                    />
                </Button>
            </DialogActions>
        </Dialog>
    };

    getEditBlockFieldName = (field, baseName, formatMessage) => formatMessage(this.state.editBlockError[field] !== undefined ? messages[this.state.editBlockError[field]] : messages[baseName]);
    getEditBlockError = (field) => this.state.editBlockError[field] !== undefined;

    displayEditBlock = () => {
        const {formatMessage} = this.props.intl;

        return <Dialog
            open={this.state.editBlockDisplay}
            onClose={this.closeEditBlockDialog}
        >
            <DialogTitle>
                <FormattedMessage
                    id={'block.editBlock.title'}
                    defaultMessage={'Update block'}
                />
            </DialogTitle>
            <DialogContent className={this.props.classes.vertical}>
                <DialogContentText>
                    <FormattedMessage
                        id={'block.newBlock.createText'}
                        defaultMessage={'The data used in this form should be provided by the block\'s creator.'}
                    />
                </DialogContentText>
                <TextField
                    value={this.state.editBlockData}
                    label={this.getEditBlockFieldName('data', 'fieldData', formatMessage)}
                    onChange={this.handleChange('editBlockData')}
                    error={this.getEditBlockError('data')}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeEditBlockDialog} color="secondary">
                    <FormattedMessage
                        id={'block.editBlock.cancel'}
                        defaultMessage={'Cancel'}
                    />
                </Button>
                <Button onClick={this.createEditBlock} color="primary">
                    <FormattedMessage
                        id={'block.editBlock.update'}
                        defaultMessage={'Update block'}
                    />
                </Button>
            </DialogActions>
        </Dialog>
    };

    deleteBlock = () => this.props.blockActions.deleteBlock(this.state.targetBlock.uuid, this.state.page, this.state.search);

    render() {
        const {formatMessage} = this.props.intl;

        return (
            <div>
                <Snackbar open={this.props.block.creation.haveResult && !this.props.block.creation.success} variant={'error'}>
                    <FormattedMessage
                        id={'block.creation.error'}
                        defaultMessage={'Error while creating block; please check the form.'}
                    />
                </Snackbar>
                <Snackbar open={this.props.block.creation.haveResult && this.props.block.creation.success} variant={'success'}>
                    <FormattedMessage
                        id={'block.creation.success'}
                        defaultMessage={'Block created.'}
                    />
                </Snackbar>
                {this.displayNewBlock()}
                <Snackbar open={this.props.block.edition.haveResult && !this.props.block.edition.success} variant={'error'}>
                    <FormattedMessage
                        id={'block.edition.error'}
                        defaultMessage={'Error while updating block; please check the form.'}
                    />
                </Snackbar>
                <Snackbar open={this.props.block.edition.haveResult && this.props.block.edition.success} variant={'success'}>
                    <FormattedMessage
                        id={'block.edition.success'}
                        defaultMessage={'Block updated.'}
                    />
                </Snackbar>
                {this.displayEditBlock()}
                <Snackbar open={this.props.block.deletion.haveResult} variant={'success'}>
                    <FormattedMessage
                        id={'block.deletion.success'}
                        defaultMessage={'Block deleted.'}
                    />
                </Snackbar>

                <Dialog
                    open={this.state.deleteBlockDisplay}
                    onClose={this.closeDeleteBlockDialog}>
                    <DialogTitle>
                        <FormattedMessage
                            id={'block.deletion.title'}
                            defaultMessage={'Are you sure?'}
                            />
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <FormattedMessage
                                id={'block.deletion.text'}
                                defaultMessage={'Do you really want to delete this block? You will not be able to undo this action. Any pipeline including this block will stop running.'}
                                />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDeleteBlockDialog} color='secondary'>
                            <FormattedMessage
                                id={'block.deletion.cancel'}
                                defaultMessage={'Cancel'}
                                />
                        </Button>
                        <Button onClick={this.deleteBlock} color='primary'>
                            <FormattedMessage
                                id={'block.deletion.confirm'}
                                defaultMessage={'Delete'}
                                />
                        </Button>
                    </DialogActions>
                </Dialog>
                <ItemList
                    onNewButton={this.openNewBlockDialog}
                    newButtonText={formatMessage(messages.newButtonTitle)}
                    title={formatMessage(messages.title)}
                    itemToPrimary={(item) => item.name}
                    itemToSecondary={() => false}
                    onEditItem={this.openEditBlockDialog}
                    onDeleteItem={this.openDeleteBlockDialog}
                    count={this.props.block.count}
                    items={this.props.block.block}
                    loaded={this.props.block.loaded}
                    loadItems={this.onListEvent}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        block: state.block,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        blockActions: bindActionCreators(BlockActions, dispatch),
    }
};

const BlockPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(withStyles(styles)(Block)));

BlockPage.propTypes = {};
export default BlockPage;
