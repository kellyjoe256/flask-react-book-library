import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Row, Col } from 'react-bootstrap';
import {
    getCategories,
    deleteCategory,
} from '../../../store/modules/categories';
import Limiter from '../../common/Limiter';
import Paginator from '../../common/Paginator';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            limit: 10,
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.onLimitChange = this.onLimitChange.bind(this);
    }

    componentDidMount() {
        const { getCategories } = this.props;

        getCategories();
    }

    onLimitChange(limit) {
        const { getCategories } = this.props;

        this.setState({ limit });

        getCategories(`page=1&limit=${limit}`);
    }

    onPageChange(page) {
        const { getCategories } = this.props;
        const { limit } = this.state;

        getCategories(`page=${page}&limit=${limit}`);
    }

    delete(id) {
        // eslint-disable-next-line
        if (!confirm('Are you sure?')) {
            return;
        }

        const { getCategories, deleteCategory } = this.props;

        deleteCategory(id)
            .then(() => {
                toast.success('Category deleted successfully');
                getCategories();
            })
            .catch(console.log);
    }

    showCategories() {
        const { categories } = this.props;

        return (
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <Link
                                    to={`/admin/categories/${category.id}/edit`}
                                    className="text-info"
                                >
                                    Edit
                                </Link>
                                <a
                                    href={`#${category.id}`}
                                    className="text-danger"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        this.delete(category.id);
                                    }}
                                >
                                    Delete
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    render() {
        const { categories, pagination } = this.props;

        return (
            <>
                <Row className="justify-content-md-center">
                    <Col lg="11" md="auto">
                        <Row className="mb-3">
                            <Col>
                                <Limiter onLimitChange={this.onLimitChange} />
                            </Col>
                            <Col className="text-right">
                                <Link
                                    to="/admin/categories/add"
                                    className="btn btn-outline-secondary"
                                >
                                    Add Category
                                </Link>
                            </Col>
                        </Row>
                        {!categories.length && <h1>No categories found</h1>}
                        {categories.length && this.showCategories()}
                        {pagination && (
                            <Paginator
                                current_page={pagination.meta.current_page}
                                pages={pagination.meta.last_page}
                                onPageChange={this.onPageChange}
                            />
                        )}
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories.items,
    pagination: state.categories.pagination,
});

// const mapDispatchToProps = (dispatch) => ({
//     getCategories: (query_string = '') => {
//         return dispatch(getCategories(query_string));
//     },
//     deleteCategory: (id) => dispatch(deleteCategory(id)),
// });

export default connect(mapStateToProps, { getCategories, deleteCategory })(
    Index
);
