import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Form, Row, Table } from 'react-bootstrap';
import { getBooks } from '../store/modules/books';
import Limiter from './common/Limiter';
import Paginator from './common/Paginator';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            limit: 10,
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.onLimitChange = this.onLimitChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.props.getBooks();
    }

    onLimitChange(limit) {
        this.setState({ limit });

        this.props.getBooks(`page=1&limit=${limit}`);
    }

    onPageChange(page) {
        const { limit } = this.state;

        this.props.getBooks(`page=${page}&limit=${limit}`);
    }

    handleSearch(e) {
        const { target } = e;
        const { limit } = this.state;

        let queryString = `page=1&limit=${limit}`; // query_string
        const value = target.value.trim();

        queryString += value ? `${queryString}&search=${value}` : '';

        this.props.getBooks(queryString);
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
                                    to={`/${book.id}/book_details`}
                                    className="text-info"
                                >
                                    Details
                                </Link>
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
                <Row>
                    <Col>
                        <Row className="mb-3">
                            <Col>
                                <Limiter onLimitChange={this.onLimitChange} />
                                <Form.Control
                                    style={{
                                        width: '70%',
                                        display: 'inline-block',
                                    }}
                                    name="search"
                                    placeholder="Search..."
                                    onKeyUp={this.handleSearch}
                                />
                            </Col>
                            <Col>&nbsp;</Col>
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

const mapDispatchToProps = (dispatch) => ({
    getBooks: (query_string = '') => dispatch(getBooks(query_string)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
