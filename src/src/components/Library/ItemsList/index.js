import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';

import Pagination from '../Pagination';

const styles = theme => ({
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    vertical: {
        display: 'flex',
        flexDirection: 'column'
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    grow: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

export class ItemsListBase extends React.Component {
    state = {
        currentPage: 1,
        searchText: ''
    };

    refreshItemsList = () => {
        this.props.loadItems(this.state.currentPage, this.state.searchText);
    };

    componentDidMount() {
        if (!this.props.loaded)
            this.refreshItemsList();
    }

    onPageChange = (page) => {
        this.setState({
            currentPage: page
        }, this.refreshItemsList);
    };

    onSearchChange = (search) => this.setState({
        searchText: search
    }, this.refreshItemsList);

    renderList = () => {
        const actionButton = (item, icon, func) => func !== undefined && <IconButton onClick={() => func(item)}>
            {icon}
        </IconButton>;

        const items = this.props.items.map(item => {
                const clickProps = {};

                if (this.props.onClick)
                    clickProps['onClick'] = () => this.props.onClick(item);

                return <ListItem key={item.uuid} button {...clickProps}>
                    <ListItemText
                        primary={this.props.itemToPrimary(item)}
                        secondary={this.props.itemToSecondary(item)}
                    />
                    <ListItemSecondaryAction>
                        {actionButton(item, <EditIcon/>, this.props.onEditItem)}
                        {actionButton(item, <DeleteIcon/>, this.props.onDeleteItem)}
                    </ListItemSecondaryAction>
                </ListItem>;
            }
        );

        return <List>
            {items}
        </List>;
    };

    renderNewButton = () => this.props.onNewButton !== undefined &&
        <Button variant='contained' className={this.props.classes.button} onClick={this.props.onNewButton}>
            <AddCircle className={this.props.classes.leftIcon}/>
            {this.props.newButtonText}
        </Button>;

    renderLoading = () => <CircularProgress/>;

    render() {
        const Center = this.props.loaded ? this.renderList() : this.renderLoading();

        return (
            <div className={this.props.classes.vertical}>
                <div className={this.props.classes.horizontal}>
                    <Typography variant='title' className={this.props.classes.grow}>
                        {this.props.title}
                    </Typography>
                    <TextField
                        value={this.state.searchText}
                        onChange={(ev) => this.onSearchChange(ev.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            )
                        }}
                    />
                    {this.renderNewButton()}
                </div>
                {Center}
                <Pagination
                    count={this.props.count}
                    onClick={this.onPageChange}
                />
            </div>
        )
    }
}

const ItemList = withStyles(styles, {withTheme: true})(ItemsListBase);

ItemList.propType = {
    onNewButton: PropTypes.func,
    newButtonText: PropTypes.string,
    title: PropTypes.string.isRequired,
    itemToPrimary: PropTypes.func.isRequired,
    itemToSecondary: PropTypes.func.isRequired,
    onEditItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onClick: PropTypes.func,
    count: PropTypes.number.required,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    loaded: PropTypes.bool.isRequired,
    loadItems: PropTypes.func.isRequired,
};

export default ItemList;