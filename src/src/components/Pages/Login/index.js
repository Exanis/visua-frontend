import React from 'react';
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Snackbar from '../../Library/Snackbar';

import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UserAction from "../../../store/actions/user";
import * as NavigationAction from "../../../store/actions/navigation";

const styles = {
    main: {
        backgroundColor: "#283593",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: '100%',
    },
    form: {
        backgroundColor: "#F5F5F6",
        padding: "30px",
        width: "300px",
    },
    innerForm: {
        display: "flex",
        flexDirection: "column",
    }
};

const messages = defineMessages({
    login: {
        'id': 'login.login',
        'defaultMessage': 'Username'
    },
    password: {
        'id': 'login.password',
        'defaultMessage': 'Password'
    },
});

export class LoginFormBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    render() {
        const { formatMessage } = this.props.intl;

        return <form onSubmit={() => { this.props.onLogin(this.state.login, this.state.password); } } className={this.props.className}>
            <Textfield
                label={formatMessage(messages.login)}
                value={this.state.login}
                onChange={(val) => { this.setState({login: val.target.value}); }}
                />
            <Textfield
                label={formatMessage(messages.password)}
                value={this.state.password}
                type={"password"}
                onChange={(val) => { this.setState({password: val.target.value}); }}
                />
            <br />
            <Button variant={"contained"} onClick={() => this.props.onLogin(this.state.login, this.state.password)}>
                <FormattedMessage
                    id={"toolbar.login.send"}
                    defaultMessage={'Connection'}
                    />
            </Button>
        </form>
    }
}

const LoginForm = injectIntl(LoginFormBase);

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
};

export class Login extends React.Component {
    _checkLocation = () => {
        if (this.props.user.anonymous === false) {
            this.props.navigationActions.redirect('/home');
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        this._checkLocation();

        if (this.props.user.login.error || this.props.user.login.success) {
            this.props.userActions.onUserLoginClear();
        }
    }

    componentDidMount() {
        this._checkLocation();
    }

    render() {
        return <div className={this.props.classes.main}>
            <Snackbar open={this.props.user.login.error} variant={'error'}>
                <FormattedMessage
                    id={'login.error'}
                    defaultMessage={'Invalid username or password'}
                    />
            </Snackbar>
            <Snackbar open={this.props.user.login.success} variant={'success'}>
                <FormattedMessage
                    id={'login.success'}
                    defaultMessage={'You are now connected!'}
                    />
            </Snackbar>
            <div className={this.props.classes.form}>
                <Typography variant={"title"}>
                    <FormattedMessage
                        id="login.title"
                        defaultMessage={"VISUA"}
                        />
                </Typography>
                <Typography variant={"subheading"}>
                    <FormattedMessage
                        id={"login.header"}
                        defaultMessage={"Please log in to continue"}
                        />
                </Typography>
                <LoginForm onLogin={this.props.userActions.logUserIn} className={this.props.classes.innerForm} />
            </div>
        </div>
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
        navigationActions: bindActionCreators(NavigationAction, dispatch),
    };
};

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(withStyles(styles)(Login)));

LoginPage.propTypes = {};

export default LoginPage;