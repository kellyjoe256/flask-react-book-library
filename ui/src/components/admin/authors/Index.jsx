import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Row, Col } from 'react-bootstrap';
import { getAuthors, deleteAuthor } from '../../../store/modules/authors';
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
        const { getAuthors } = this.props;

        getAuthors();
    }

    onLimitChange(limit) {
        const { getAuthors } = this.props;

        this.setState({ limit });

        getAuthors(`page=1&limit=${limit}`);
    }

    onPageChange(page) {
        const { getAuthors } = this.props;
        const { limit } = this.state;

        getAuthors(`page=${page}&limit=${limit}`);
    }

    delete(id) {
        // eslint-disable-next-line
        if (!confirm('Are you sure?')) {
            return;
        }

        const { getAuthors, deleteAuthor } = this.props;

        deleteAuthor(id)
            .then(() => {
                toast.success('Author deleted successfully');
                getAuthors();
            })
            .catch(console.log);
    }

    showAuthors() {
        const { authors } = this.props;

        return (
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => (
                        <tr key={author.id}>
                            <td>{author.first_name}</td>
                            <td>{author.last_name}</td>
                            <td>{author.gender === 'M' ? 'Male' : 'Female'}</td>
                            <td>
                                <Link
                                    to={`/admin/authors/${author.id}/edit`}
                                    className="text-info"
                                >
                                    Edit
                                </Link>
                                <a
                                    href={`#${author.id}`}
                                    className="text-danger"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        this.delete(author.id);
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
        const { authors, pagination } = this.props;

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
                                    to="/admin/authors/add"
                                    className="btn btn-outline-secondary"
                                >
                                    Add Author
                                </Link>
                            </Col>
                        </Row>
                        {!authors.length && <h1>No authors found</h1>}
                        {authors.length && this.showAuthors()}
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
    authors: state.authors.items,
    pagination: state.authors.pagination,
});

export default connect(mapStateToProps, { getAuthors, deleteAuthor })(Index);
