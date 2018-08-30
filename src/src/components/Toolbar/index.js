import React from 'react';

import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

import {Link} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Motorcycle from '@material-ui/icons/Motorcycle';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {Home, ExitToApp, AccountCircle, Group, Person, Extension} from '@material-ui/icons';
import {logUserOut} from "../../store/actions/user";

const messages = defineMessages({
    home: {
        id: "toolbar.menu.home",
        defaultMessage: 'Home'
    },
    users: {
        id: "toolbar.menu.users",
        defaultMessage: "Users"
    },
    groups: {
        id: "toolbar.menu.groups",
        defaultMessage: "Groups"
    },
    block: {
        id: "toolbar.menu.block",
        defaultMessage: "Blocks"
    },
    runner: {
        id: 'toolbar.menu.runner',
        defaultMessage: 'Runners'
    },
    profile: {
        id: "toolbar.menu.profile",
        defaultMessage: "Profile"
    },
    logout: {
        id: "toolbar.menu.logout",
        defaultMessage: "Logout"
    }
});

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        height: '100%',
    },
    padded: {
        padding: theme.spacing.unit * 3,
    },
    center: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
    },
    main: {
        flexGrow: 1,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    }
});

export class VisuaToolbar extends React.Component {
    state = {
        fullMenu: false,
    };

    toolbar = () => (!this.props.user.anonymous && <AppBar position="sticky">
        <Toolbar>
            <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu"
                        onClick={() => this.setState({fullMenu: !this.state.fullMenu})}>
                <MenuIcon/>
            </IconButton>
            <Typography className={this.props.classes.grow} variant="title" color="inherit">
                <FormattedMessage
                    id={"toolbar.main.title"}
                    defaultMessage={'Visua'}
                />
            </Typography>
            <Typography variant='subheading' color='inherit'>
                { this.props.user.info.first_name } { this.props.user.info.last_name }
            </Typography>
        </Toolbar>
    </AppBar>);

    admin = () => {
        const {formatMessage} = this.props.intl;

        return (this.props.user.info.is_staff && <div>
            <List>
                <Link to='/users'>
                    <ListItem button>
                        <ListItemIcon>
                            <Person/>
                        </ListItemIcon>
                        <ListItemText primary={formatMessage(messages.users)}/>
                    </ListItem>
                </Link>
                <Link to='/groups'>
                    <ListItem button>
                        <ListItemIcon>
                            <Group/>
                        </ListItemIcon>
                        <ListItemText primary={formatMessage(messages.groups)}/>
                    </ListItem>
                </Link>
                <Link to='/block'>
                    <ListItem button>
                        <ListItemIcon>
                            <Extension />
                        </ListItemIcon>
                        <ListItemText primary={formatMessage(messages.block)}/>
                    </ListItem>
                </Link>
                <Link to='/runner'>
                    <ListItem button>
                        <ListItemIcon>
                            <Motorcycle />
                        </ListItemIcon>
                        <ListItemText primary={formatMessage(messages.runner)}/>
                    </ListItem>
                </Link>
            </List>
            <Divider/>
        </div>);
    };

    menu = () => {
        const {formatMessage} = this.props.intl;

        return (!this.props.user.anonymous && <Drawer
            variant="permanent"
            classes={{
                paper: classNames(this.props.classes.drawerPaper, !this.state.fullMenu && this.props.classes.drawerPaperClose),
            }}
            open={this.state.open}
        >
            <List>
                <Link to='/home'>
                    <ListItem button>
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary={formatMessage(messages.home)}/>
                    </ListItem>
                </Link>
            </List>
            <Divider/>
            { this.admin() }
            <List>
                <Link to='/profile'>
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircle/>
                        </ListItemIcon>
                        <ListItemText primary={formatMessage(messages.profile)}/>
                    </ListItem>
                </Link>
                <ListItem button onClick={this.props.logout}>
                    <ListItemIcon>
                        <ExitToApp/>
                    </ListItemIcon>
                    <ListItemText primary={formatMessage(messages.logout)}/>
                </ListItem>
            </List>
        </Drawer>);
    };

    render() {
        return (<div className={this.props.classes.main}>
                {this.toolbar()}
                <div className={this.props.classes.center}>
                    {this.menu()}
                    <div
                        className={classNames(this.props.classes.content, !this.props.user.anonymous && this.props.classes.padded)}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logUserOut())
    };
};

const ToolbarComponent = withRouter(connect(mapStateToProps,
    mapDispatchToProps)(injectIntl(withStyles(styles, {withTheme: true})(VisuaToolbar))));

ToolbarComponent.propTypes = {};

export default ToolbarComponent;