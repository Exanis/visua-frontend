import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '../../Library/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import Snackbar from '../../Library/Snackbar';

import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';

import ItemList from '../../Library/ItemsList';

import * as UsersActions from '../../../store/actions/users';

const styles = {
    vertical: {
        display: 'flex',
        flexDirection: 'column'
    },
};

const messages = defineMessages({
    title: {
        id: 'users.title',
        defaultMessage: 'Users',
    },
    newButtonTitle: {
        id: 'users.new',
        defaultMessage: 'Create user',
    },
    fieldUsername: {
        id: 'users.field.username',
        defaultMessage: 'Username'
    },
    fieldFirstName: {
        id: 'users.field.firstName',
        defaultMessage: 'First name'
    },
    fieldLastName: {
        id: 'users.field.lastName',
        defaultMessage: 'Last name'
    },
    fieldEmail: {
        id: 'users.field.email',
        defaultMessage: 'Email address'
    },
    fieldPassword: {
        id: 'users.field.password',
        defaultMessage: 'Password'
    },
    fieldCheckPassword: {
        id: 'users.field.checkPassword',
        defaultMessage: 'Retype password'
    },
    fieldStaff: {
        id: 'users.field.isStaff',
        defaultMessage: 'Administrator',
    },
    errorCheckPasswordError: {
        id: 'users.errors.password.check',
        defaultMessage: 'Password mismatch'
    },
    errorUsernameRequired: {
        id: 'users.errors.username.required',
        defaultMessage: 'Username is required'
    },
    errorUsernameExists: {
        id: 'users.errors.username.exists',
        defaultMessage: 'An user already exists with this username'
    },
    errorUsernameTooLong: {
        id: 'users.errors.username.tooLong',
        defaultMessage: 'Username too long (max 150 chars)'
    },
    errorUsernameTooShort: {
        id: 'users.errors.username.tooShort',
        defaultMessage: 'Username too short (min 2 chars)'
    },
    errorFirstNameRequired: {
        id: 'users.errors.firstName.required',
        defaultMessage: 'First name is required'
    },
    errorFirstNameTooLong: {
        id: 'users.errors.firstName.tooLong',
        defaultMessage: 'First name too long (max 30 chars)'
    },
    errorFirstNameTooShort: {
        id: 'users.errors.firstName.tooShort',
        defaultMessage: 'First name too short (min 2 chars)'
    },
    errorLastNameRequired: {
        id: 'users.errors.lastName.required',
        defaultMessage: 'Last name is required'
    },
    errorLastNameTooLong: {
        id: 'users.errors.lastName.tooLong',
        defaultMessage: 'Last name too long (max 150 chars)'
    },
    errorLastNameTooShort: {
        id: 'users.errors.lastName.tooShort',
        defaultMessage: 'Last name too short (min 2 chars)'
    },
    errorEmailRequired: {
        id: 'users.errors.email.required',
        defaultMessage: 'Email is required'
    },
    errorEmailExists: {
        id: 'users.errors.email.exists',
        defaultMessage: 'Email already in use'
    },
    errorEmailInvalid: {
        id: 'users.errors.email.invalid',
        defaultMessage: 'Email is invalid'
    },
    errorPasswordInvalid: {
        id: 'users.errors.password.invalid',
        defaultMessage: 'Password is empty or invalid'
    },
    errorPasswordTooLong: {
        id: 'users.errors.password.tooLong',
        defaultMessage: 'Password is too long'
    },
    errorPasswordTooShort: {
        id: 'users.errors.password.tooShort',
        defaultMessage: 'Password is too short'
    }
});

export class Users extends React.Component {
    state = {
        page: 1,
        search: '',

        newUserDisplay: false,
        newUserFirstName: '',
        newUserLastName: '',
        newUserName: '',
        newUserPassword: '',
        newUserPasswordCheck: '',
        newUserIsStaff: false,
        newUserEmail: '',
        newUserError: [],

        targetUser: null,

        editUserDisplay: false,
        editUserFirstName: '',
        editUserLastName: '',
        editUserName: '',
        editUserPassword: '',
        editUserPasswordCheck: '',
        editUserIsStaff: false,
        editUserEmail: '',
        editUserError: [],

        deleteUserDisplay: false,
    };

    handleChange = field => ev => {
        const newState = {};

        newState[field] = ev.target.value;
        this.setState(newState);
    };

    openNewUserDialog = () => this.setState({newUserDisplay: true});
    closeNewUserDialog = () => this.setState({newUserDisplay: false});
    createNewUser = () => {
        this.props.usersActions.createUser(
            this.state.newUserName,
            this.state.newUserFirstName,
            this.state.newUserLastName,
            this.state.newUserEmail,
            this.state.newUserPassword,
            this.state.newUserIsStaff,
            this.state.page,
            this.state.search
        );
    };

    openEditUserDialog = (item) => this.setState({
        editUserDisplay: true,
        targetUser: item,
        editUserFirstName: item.first_name,
        editUserLastName: item.last_name,
        editUserName: item.username,
        editUserIsStaff: item.is_staff,
        editUserEmail: item.email
    });
    closeEditUserDialog = () => this.setState({editUserDisplay: false});
    createEditUser = () => {
        this.props.usersActions.editUser(
            this.state.targetUser.uuid,
            this.state.editUserName,
            this.state.editUserFirstName,
            this.state.editUserLastName,
            this.state.editUserEmail,
            this.state.editUserPassword,
            this.state.editUserIsStaff,
            this.state.page,
            this.state.search
        );
    };

    openDeleteUserDialog = (item) => this.setState({
        deleteUserDisplay: true,
        targetUser: item,
    });
    closeDeleteUserDialog = () => this.setState({deleteUserDisplay: false});

    componentDidUpdate() {
        if (this.props.users.creation.haveResult) {
            if (this.props.users.creation.success) {
                this.setState({newUserDisplay: false});
            } else {
                this.setState({newUserError: this.props.users.creation.errors});
            }
            this.props.usersActions.resetCreateUserState();
        }
        if (this.props.users.edition.haveResult) {
            if (this.props.users.edition.success) {
                this.setState({editUserDisplay: false});
            } else {
                this.setState({editUserError: this.props.users.edition.errors});
            }
            this.props.usersActions.resetEditUserState();
        }
        if (this.props.users.deletion.haveResult) {
            this.closeDeleteUserDialog();
            this.props.usersActions.resetDeleteUserState();
        }
    }

    onListEvent = (page, search) => this.setState({
        page: page,
        search: search
    }, () => this.props.usersActions.getUsersList(page, search));

    getCreateUserFieldName = (field, baseName, formatMessage) => formatMessage(this.state.newUserError[field] !== undefined ? messages[this.state.newUserError[field]] : messages[baseName]);
    getNewUserError = (field) => this.state.newUserError[field] !== undefined;

    displayNewUser = () => {
        const {formatMessage} = this.props.intl;
        const passwordError = this.state.newUserPassword !== this.state.newUserPasswordCheck;
        
        return <Dialog
            open={this.state.newUserDisplay}
            onClose={this.closeNewUserDialog}
        >
            <DialogTitle>
                <FormattedMessage
                    id={'users.newUser.title'}
                    defaultMessage={'Create new user'}
                />
            </DialogTitle>
            <DialogContent className={this.props.classes.vertical}>
                <DialogContentText>
                    <FormattedMessage
                        id={'users.newUser.createText'}
                        defaultMessage={'Fill the following form to create a new user'}
                    />
                </DialogContentText>
                <TextField
                    value={this.state.newUserName}
                    label={this.getCreateUserFieldName('username', 'fieldUsername', formatMessage)}
                    onChange={this.handleChange('newUserName')}
                    error={this.getNewUserError('username')}
                />
                <TextField
                    value={this.state.newUserFirstName}
                    label={this.getCreateUserFieldName('first_name', 'fieldFirstName', formatMessage)}
                    onChange={this.handleChange('newUserFirstName')}
                    error={this.getNewUserError('first_name')}
                />
                <TextField
                    value={this.state.newUserLastName}
                    label={this.getCreateUserFieldName('last_name', 'fieldLastName', formatMessage)}
                    onChange={this.handleChange('newUserLastName')}
                    error={this.getNewUserError('last_name')}
                />
                <TextField
                    value={this.state.newUserEmail}
                    label={this.getCreateUserFieldName('email', 'fieldEmail', formatMessage)}
                    onChange={this.handleChange('newUserEmail')}
                    error={this.getNewUserError('email')}
                    type='email'
                />
                <TextField
                    value={this.state.newUserPassword}
                    label={this.getCreateUserFieldName('password', 'fieldPassword', formatMessage)}
                    onChange={this.handleChange('newUserPassword')}
                    error={this.getNewUserError('password')}
                    type='password'
                />
                <TextField
                    value={this.state.newUserPasswordCheck}
                    label={formatMessage(passwordError ? messages.errorCheckPasswordError : messages.fieldCheckPassword)}
                    onChange={this.handleChange('newUserPasswordCheck')}
                    error={passwordError}
                    type='password'
                />
                <Switch
                    checked={this.state.newUserIsStaff}
                    onChange={ev => this.setState({newUserIsStaff: ev.target.checked})}
                    label={formatMessage(messages.fieldStaff)}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeNewUserDialog} color="secondary">
                    <FormattedMessage
                        id={'users.newUser.cancel'}
                        defaultMessage={'Cancel'}
                    />
                </Button>
                <Button onClick={this.createNewUser} color="primary"
                        disabled={this.state.newUserPassword !== this.state.newUserPasswordCheck}>
                    <FormattedMessage
                        id={'users.newUser.create'}
                        defaultMessage={'Create user'}
                    />
                </Button>
            </DialogActions>
        </Dialog>
    };

    getEditUserFieldName = (field, baseName, formatMessage) => formatMessage(this.state.editUserError[field] !== undefined ? messages[this.state.editUserError[field]] : messages[baseName]);
    getEditUserError = (field) => this.state.editUserError[field] !== undefined;

    displayEditUser = () => {
        const {formatMessage} = this.props.intl;
        const passwordError = this.state.editUserPassword !== this.state.editUserPasswordCheck;
        
        return <Dialog
            open={this.state.editUserDisplay}
            onClose={this.closeEditUserDialog}
        >
            <DialogTitle>
                <FormattedMessage
                    id={'users.editUser.title'}
                    defaultMessage={'Update user'}
                />
            </DialogTitle>
            <DialogContent className={this.props.classes.vertical}>
                <DialogContentText>
                    <FormattedMessage
                        id={'users.editUser.createText'}
                        defaultMessage={'Fill the following form to update the user'}
                    />
                </DialogContentText>
                <TextField
                    value={this.state.editUserName}
                    label={this.getEditUserFieldName('username', 'fieldUsername', formatMessage)}
                    onChange={this.handleChange('editUserName')}
                    error={this.getEditUserError('username')}
                />
                <TextField
                    value={this.state.editUserFirstName}
                    label={this.getEditUserFieldName('first_name', 'fieldFirstName', formatMessage)}
                    onChange={this.handleChange('editUserFirstName')}
                    error={this.getEditUserError('first_name')}
                />
                <TextField
                    value={this.state.editUserLastName}
                    label={this.getEditUserFieldName('last_name', 'fieldLastName', formatMessage)}
                    onChange={this.handleChange('editUserLastName')}
                    error={this.getEditUserError('last_name')}
                />
                <TextField
                    value={this.state.editUserEmail}
                    label={this.getEditUserFieldName('email', 'fieldEmail', formatMessage)}
                    onChange={this.handleChange('editUserEmail')}
                    error={this.getEditUserError('email')}
                    type='email'
                /><br />
                <Typography variant='caption'>
                    <FormattedMessage
                        id={'users.editUser.passwordNotice'}
                        defaultMessage={'To keep the user\'s current password, leave those fields empty.'}
                        />
                </Typography>
                <TextField
                    value={this.state.editUserPassword}
                    label={this.getEditUserFieldName('password', 'fieldPassword', formatMessage)}
                    onChange={this.handleChange('editUserPassword')}
                    error={this.getEditUserError('password')}
                    type='password'
                />
                <TextField
                    value={this.state.editUserPasswordCheck}
                    label={formatMessage(passwordError ? messages.errorCheckPasswordError : messages.fieldCheckPassword)}
                    onChange={this.handleChange('editUserPasswordCheck')}
                    error={passwordError}
                    type='password'
                />
                <Switch
                    checked={this.state.editUserIsStaff}
                    onChange={ev => this.setState({editUserIsStaff: ev.target.checked})}
                    label={formatMessage(messages.fieldStaff)}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeEditUserDialog} color="secondary">
                    <FormattedMessage
                        id={'users.editUser.cancel'}
                        defaultMessage={'Cancel'}
                    />
                </Button>
                <Button onClick={this.createEditUser} color="primary"
                        disabled={this.state.editUserPassword !== this.state.editUserPasswordCheck}>
                    <FormattedMessage
                        id={'users.editUser.update'}
                        defaultMessage={'Update user'}
                    />
                </Button>
            </DialogActions>
        </Dialog>
    };

    deleteUser = () => this.props.usersActions.deleteUser(this.state.targetUser.uuid, this.state.page, this.state.search);

    render() {
        const {formatMessage} = this.props.intl;

        return (
            <div>
                <Snackbar open={this.props.users.creation.haveResult && !this.props.users.creation.success} variant={'error'}>
                    <FormattedMessage
                        id={'users.creation.error'}
                        defaultMessage={'Error while creating user; please check the form.'}
                    />
                </Snackbar>
                <Snackbar open={this.props.users.creation.haveResult && this.props.users.creation.success} variant={'success'}>
                    <FormattedMessage
                        id={'users.creation.success'}
                        defaultMessage={'User created.'}
                    />
                </Snackbar>
                {this.displayNewUser()}
                <Snackbar open={this.props.users.edition.haveResult && !this.props.users.edition.success} variant={'error'}>
                    <FormattedMessage
                        id={'users.edition.error'}
                        defaultMessage={'Error while updating user; please check the form.'}
                    />
                </Snackbar>
                <Snackbar open={this.props.users.edition.haveResult && this.props.users.edition.success} variant={'success'}>
                    <FormattedMessage
                        id={'users.edition.success'}
                        defaultMessage={'User updated.'}
                    />
                </Snackbar>
                {this.displayEditUser()}
                <Snackbar open={this.props.users.deletion.haveResult} variant={'success'}>
                    <FormattedMessage
                        id={'users.deletion.success'}
                        defaultMessage={'User deleted.'}
                    />
                </Snackbar>

                <Dialog
                    open={this.state.deleteUserDisplay}
                    onClose={this.closeDeleteUserDialog}>
                    <DialogTitle>
                        <FormattedMessage
                            id={'users.deletion.title'}
                            defaultMessage={'Are you sure?'}
                            />
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <FormattedMessage
                                id={'users.deletion.text'}
                                defaultMessage={'Do you really want to delete this user? You will not be able to undo this action.'}
                                />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDeleteUserDialog} color='secondary'>
                            <FormattedMessage
                                id={'users.deletion.cancel'}
                                defaultMessage={'Cancel'}
                                />
                        </Button>
                        <Button onClick={this.deleteUser} color='primary'>
                            <FormattedMessage
                                id={'users.deletion.confirm'}
                                defaultMessage={'Delete'}
                                />
                        </Button>
                    </DialogActions>
                </Dialog>
                <ItemList
                    onNewButton={this.openNewUserDialog}
                    newButtonText={formatMessage(messages.newButtonTitle)}
                    title={formatMessage(messages.title)}
                    itemToPrimary={(item) => item.first_name + ' ' + item.last_name}
                    itemToSecondary={item => item.username}
                    onEditItem={this.openEditUserDialog}
                    onDeleteItem={this.openDeleteUserDialog}
                    count={this.props.users.count}
                    items={this.props.users.users}
                    loaded={this.props.users.loaded}
                    loadItems={this.onListEvent}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        usersActions: bindActionCreators(UsersActions, dispatch),
    }
};

const UsersPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(withStyles(styles)(Users)));

UsersPage.propTypes = {};
export default UsersPage;