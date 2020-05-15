import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

class Paginator extends Component {
    first() {
        const { current_page, onPageChange } = this.props;

        return (
            <Pagination.First
                disabled={current_page === 1}
                onClick={(e) => {
                    e.preventDefault();

                    onPageChange(1);
                }}
            />
        );
    }

    last() {
        const { current_page, pages, onPageChange } = this.props;

        return (
            <Pagination.Last
                disabled={current_page === pages}
                onClick={(e) => {
                    e.preventDefault();

                    onPageChange(pages);
                }}
            />
        );
    }

    previous() {
        const { current_page, onPageChange } = this.props;

        return (
            <Pagination.Prev
                disabled={current_page === 1}
                onClick={(e) => {
                    e.preventDefault();

                    onPageChange(current_page - 1);
                }}
            />
        );
    }

    next() {
        const { current_page, pages, onPageChange } = this.props;

        return (
            <Pagination.Next
                disabled={current_page === pages}
                onClick={(e) => {
                    e.preventDefault();

                    onPageChange(current_page + 1);
                }}
            />
        );
    }

    items() {
        const { current_page, pages, onPageChange } = this.props;
        const items = [];

        for (let i = 1; i <= pages; i += 1) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={i === current_page}
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(i);
                    }}
                >
                    {i}
                </Pagination.Item>
            );
        }

        return items;
    }

    showPagination() {
        return (
            <Pagination>
                {this.first()}
                {this.previous()}
                {this.items()}
                {this.next()}
                {this.last()}
            </Pagination>
        );
    }

    render() {
        const { pages } = this.props;

        return (
            <>
                {!(pages > 1) && null}
                {pages > 1 && this.showPagination()}
            </>
        );
    }
}

Paginator.propTypes = {
    pages: PropTypes.number.isRequired,
    current_page: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Paginator;
