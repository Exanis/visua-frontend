import React from 'react';
import {connect} from "react-redux";
import { withRouter } from 'react-router';

import {withStyles} from '@material-ui/core/styles';

import Toolbar from '../Toolbar';

import {getCurrentUserData} from "../../store/actions/user";

const styles = theme => ({
    viewport: {
        height: "100%",
        width: "100%",
        margin: 0,
        display: "flex",
    }
});

export class Layout extends React.Component {
    componentDidMount() {
        this.props.requestCurrentUserData();
    }

    render() {
        return <div className={this.props.classes.viewport}>
            <Toolbar>
                {this.props.children}
            </Toolbar>
        </div>;
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        requestCurrentUserData: () => dispatch(getCurrentUserData()),
    };
};

const LayoutComponent = withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Layout)));

LayoutComponent.propTypes = {};

export default LayoutComponent;