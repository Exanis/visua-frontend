import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from "@material-ui/core/styles";
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Snackbar from '../../Library/Snackbar';

import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import * as UserAction from "../../../store/actions/user";

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        width: 350,
        marginTop: 40
    }
};

const messages = defineMessages({
    firstName: {
        'id': 'profile.firstName',
        'defaultMessage': 'First name'
    },
    lastName: {
        'id': 'profile.lastName',
        'defaultMessage': 'Last name'
    },
    email: {
        'id': 'profile.email',
        'defaultMessage': 'Email address'
    },
    password: {
        'id': 'profile.password',
        'defaultMessage': 'Password'
    },
    checkPassword: {
        'id': 'profile.checkPassword',
        'defaultMessage': 'Check password'
    },
    errorCheckPasswordError: {
        id: 'profile.errors.password.check',
        defaultMessage: 'Password mismatch'
    },
    errorFirstNameRequired: {
        id: 'profile.errors.firstName.required',
        defaultMessage: 'First name is required'
    },
    errorFirstNameTooLong: {
        id: 'profile.errors.firstName.tooLong',
        defaultMessage: 'First name too long (max 30 chars)'
    },
    errorFirstNameTooShort: {
        id: 'profile.errors.firstName.tooShort',
        defaultMessage: 'First name too short (min 2 chars)'
    },
    errorLastNameRequired: {
        id: 'profile.errors.lastName.required',
        defaultMessage: 'Last name is required'
    },
    errorLastNameTooLong: {
        id: 'profile.errors.lastName.tooLong',
        defaultMessage: 'Last name too long (max 150 chars)'
    },
    errorLastNameTooShort: {
        id: 'profile.errors.lastName.tooShort',
        defaultMessage: 'Last name too short (min 2 chars)'
    },
    errorEmailRequired: {
        id: 'profile.errors.email.required',
        defaultMessage: 'Email is required'
    },
    errorEmailExists: {
        id: 'profile.errors.email.exists',
        defaultMessage: 'Email already in use'
    },
    errorEmailInvalid: {
        id: 'profile.errors.email.invalid',
        defaultMessage: 'Email is invalid'
    },
    errorPasswordInvalid: {
        id: 'profile.errors.password.invalid',
        defaultMessage: 'Password is empty or invalid'
    },
    errorPasswordTooLong: {
        id: 'profile.errors.password.tooLong',
        defaultMessage: 'Password is too long'
    },
    errorPasswordTooShort: {
        id: 'profile.errors.password.tooShort',
        defaultMessage: 'Password is too short'
    }
});

export class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: props.user.info.first_name,
            lastName: props.user.info.last_name,
            email: props.user.info.email,
            password: '',
            checkPassword: '',
            userError: []
        }
    }

    handleChange = field => ev => {
        const newState = {};

        newState[field] = ev.target.value;
        this.setState(newState);
    };

    submitData = () => {
        if (this.state.password === this.state.checkPassword)
            this.props.userActions.updateUser(
                this.props.user.info.uuid,
                this.state.firstName,
                this.state.lastName,
                this.state.email,
                this.state.password
            );
    };
    
    componentDidUpdate() {
        if (this.props.user.update.haveResult) {
            if (this.props.user.update.success) {
                this.setState({userError: false});
            } else {
                this.setState({userError: this.props.user.update.errors});
            }
            this.props.userActions.resetCreateUserState();
        }
    }

    getUserFieldName = (field, baseName, formatMessage) => formatMessage(this.state.userError[field] !== undefined ? messages[this.state.userError[field]] : messages[baseName]);
    getError = (field) => this.state.userError[field] !== undefined;

    render () {
        const { formatMessage } = this.props.intl;

        return (<div>
                <Snackbar open={this.props.user.update.haveResult && !this.props.user.update.success} variant={'error'}>
                    <FormattedMessage
                        id={'profile.update.error'}
                        defaultMessage={'Error while updating your profile; please check the form.'}
                    />
                </Snackbar>
                <Snackbar open={this.props.user.update.haveResult && this.props.user.update.success} variant={'success'}>
                    <FormattedMessage
                        id={'profile.update.success'}
                        defaultMessage={'Profile updated.'}
                    />
                </Snackbar>
            <Typography variant={"title"}>
                <FormattedMessage
                    id={"profile.title"}
                    defaultMessage={'My profile'}
                    />
            </Typography>
            <form className={this.props.classes.form}>
                <Typography variant="caption">
                    <FormattedMessage
                        id={"profile.username"}
                        defaultMessage={'Username'}
                        />
                </Typography>
                <Typography variant="body1">
                    { this.props.user.info.username }
                </Typography><br />
                <Textfield
                    label={this.getUserFieldName('first_name', 'firstName', formatMessage)}
                    value={this.state.firstName}
                    onChange={this.handleChange('firstName')}
                    error={this.getError('first_name')}
                    />
                <Textfield
                    label={this.getUserFieldName('last_name', 'lastName', formatMessage)}
                    value={this.state.lastName}
                    onChange={this.handleChange('lastName')}
                    error={this.getError('last_name')}
                    />
                <Textfield
                    label={this.getUserFieldName('email', 'email', formatMessage)}
                    value={this.state.email}
                    type='email'
                    onChange={this.handleChange('email')}
                    error={this.getError('email')}
                    />
                <br />
                <Typography variant='caption'>
                    <FormattedMessage
                        id={'profile.passwordNotice'}
                        defaultMessage={'To keep your current password, leave those fields empty.'}
                        />
                </Typography>
                <Textfield
                    label={this.getUserFieldName('password', 'password', formatMessage)}
                    value={this.state.password}
                    type={'password'}
                    onChange={this.handleChange('password')}
                    error={this.getError('password')}
                    />
                <Textfield
                    label={formatMessage(this.state.checkPassword !== this.state.password ? messages.checkPasswordError : messages.checkPassword)}
                    value={this.state.checkPassword}
                    type={'password'}
                    onChange={this.handleChange('checkPassword')}
                    error={this.state.checkPassword !== this.state.password}
                    /><br />
                <Button variant={'contained'} onClick={this.submitData}>
                    <FormattedMessage
                        id={'profile.update'}
                        defaultMessage={'Update profile'}
                        />
                </Button>
            </form>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(UserAction, dispatch),
    };
};

const Profile = connect(mapStateToProps, mapDispatchToProps)(injectIntl(withStyles(styles)(ProfilePage)));

Profile.propTypes = {};

export default Profile;