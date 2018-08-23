import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {withStyles} from '@material-ui/core/styles';

import {defineMessages, injectIntl} from 'react-intl';

// This part of the code directly came from mui examples

const messages = defineMessages({
    close: {
        'id': 'snackbar.close',
        'defaultMessage': 'Close',
    },
});

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

export function MySnackbarContent(props) {
    const {classes, onClose, variant, intl, ...other} = props;
    const {formatMessage} = intl;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classes[variant]}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)}/>
                    {props.children}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label={formatMessage(messages.close)}
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon}/>
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = injectIntl(withStyles(styles)(MySnackbarContent));

class VisuaSnackbar extends React.Component {
    state = {
        open: false
    };

    static getDerivedStateFromProps(props, state) {
        if (props.open) {
            return {open: true};
        }
        return state;
    }

    handleClose = (ev, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    };

    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
            >
                <MySnackbarContentWrapper variant={this.props.variant} onClose={this.handleClose}>
                    {this.props.children}
                </MySnackbarContentWrapper>
            </Snackbar>
        );
    }
}

VisuaSnackbar.propTypes = {
    open: PropTypes.bool.isRequired,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
};

export default VisuaSnackbar;
