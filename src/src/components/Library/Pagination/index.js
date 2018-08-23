import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    bordered: {
        borderRadius: 5,
        padding: 5,
    },
    horizontal: {
        display: 'flex',
        flexDirection: 'row'
    },
    active: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    }
});

export class PaginationBase extends React.Component {
    state = {
        page: 1
    };

    makePageList = (count) => {
        const pagesList = [];
        let endExist = false;

        if (count > 0)
            pagesList.push(1);
        for (let i = -1; i <= 1; i++) {
            const pageId = this.state.page + i;

            if (pageId > 1 && pageId <= count) {
                pagesList.push(pageId);
                if (pageId === count)
                    endExist = true;
            }
        }
        if (!endExist && count > 1)
            pagesList.push(count);
        return pagesList;
    };

    render() {
        const pageSize = this.props.pageSize ? this.props.pageSize : 15;
        const pageCount = this.props.count === 0 ? 0 : Math.ceil(this.props.count / pageSize);
        const pages = this.makePageList(pageCount);
        let previousPage = 1;

        const buttons = pages.map((page) => {
            const startWithDots = (page - previousPage > 1) && <Typography variant='body2'>...</Typography>;
            const boxClass = page !== this.state.page ? this.props.classes.bordered : classNames(this.props.classes.bordered, this.props.classes.active);
            const action = page !== this.state.page ? () => this.setState({page: page}, this.props.onClick(page)) : () => false;

            previousPage = page;
            return <div className={this.props.classes.horizontal} key={page}>
                {startWithDots}
                <Typography className={boxClass} variant='button' onClick={action}>
                    {page}
                </Typography>
            </div>
        });

        return (pageCount > 0 && <div className={this.props.classes.horizontal}>
            { buttons }
        </div>)
    }
}

const Pagination = withStyles(styles, { withTheme: true })(PaginationBase);

Pagination.propTypes = {
    pageSize: PropTypes.number,
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Pagination;