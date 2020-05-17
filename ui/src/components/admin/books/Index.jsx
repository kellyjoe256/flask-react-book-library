import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Row, Col } from 'react-bootstrap';
import { getBooks, deleteBook } from '../../../store/modules/books';
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
        const { getBooks } = this.props;

        getBooks();
    }

    onLimitChange(limit) {
        const { getBooks } = this.props;

        this.setState({ limit });

        getBooks(`page=1&limit=${limit}`);
    }

    onPageChange(page) {
        const { getBooks } = this.props;
        const { limit } = this.state;

        getBooks(`page=${page}&limit=${limit}`);
    }

    delete(id) {
        // eslint-disable-next-line
        if (!confirm('Are you sure?')) {
            return;
        }

        const { getBooks, deleteBook } = this.props;

        deleteBook(id)
            .then(() => {
                toast.success('Book deleted successfully');
                getBooks();
            })
            .catch(console.log);
    }

    showBooks() {
        const { books } = this.props;

        return (
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>ISBN</th>
                        <th># of pages</th>
                        <th>Publisher</th>
                        <th>Publication Date</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.isbn}</td>
                            <td>{book.num_of_pages}</td>
                            <td>{book.publisher}</td>
                            <td>
                                {moment(book.publication_date).format(
                                    'MMMM Do, YYYY'
                                )}
                            </td>
                            <td>
                                <Link
                                    to={`/admin/books/${book.id}/edit`}
                                    className="text-info"
                                >
                                    Edit
                                </Link>
                                <a
                                    href={`#${book.id}`}
                                    className="text-danger"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        this.delete(book.id);
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
        const { books, pagination } = this.props;

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
                                    to="/admin/books/add"
                                    className="btn btn-outline-secondary"
                                >
                                    Add Book
                                </Link>
                            </Col>
                        </Row>
                        {!books.length && <h1>No books found</h1>}
                        {books.length && this.showBooks()}
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
    books: state.books.items,
    pagination: state.books.pagination,
});

export default connect(mapStateToProps, { getBooks, deleteBook })(Index);
