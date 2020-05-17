// @ts-nocheck
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import showdown from 'showdown';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { getBook } from '../store/modules/books';

const markdownToHtml = (markdown) => {
    const converter = new showdown.Converter();

    return converter.makeHtml(markdown);
};

const BookDetails = (props) => {
    const { match } = props;
    const { id } = match.params;
    const history = useHistory();
    const dispatch = useDispatch();
    const [book, setBook] = useState(null);

    useEffect(() => {
        dispatch(getBook(id))
            .then((book) => setBook(book))
            .catch((error) => {
                const { status: statusCode } = error;
                if (statusCode === 404) {
                    history.push('/');
                }
            });
    }, [id, dispatch, history]);

    return (
        book && (
            <>
                <Row>
                    <Col>
                        <p>
                            <strong>Title</strong>: {book.title}
                        </p>
                        <p>
                            <strong># of Pages</strong>: {book.num_of_pages}
                        </p>
                        <p>
                            <strong>Publisher</strong>: {book.publisher}
                        </p>
                        <p>
                            <strong>Publication Date</strong>:{' '}
                            {moment(book.publication_date).format(
                                'MMMM Do, YYYY'
                            )}
                        </p>
                        <p>
                            <strong>Categories</strong>:&nbsp;
                            {book.categories
                                .map((category) => category.name)
                                .join(', ')}
                        </p>
                        <p>
                            <strong>About</strong>:
                        </p>
                        <div
                            className="about"
                            dangerouslySetInnerHTML={{
                                __html: markdownToHtml(book.about),
                            }}
                        />
                    </Col>
                    <Col>
                        <h3>Authors</h3>
                        {book.authors.map((author, index) => (
                            <React.Fragment key={author.id}>
                                <div className="author">
                                    <p>
                                        <strong>Name</strong>:&nbsp;
                                        {`${author.first_name} ${author.last_name}`}
                                    </p>
                                    <p>
                                        <strong>Gender</strong>:&nbsp;
                                        {author.gender === 'M'
                                            ? 'Male'
                                            : 'Female'}
                                    </p>
                                    <p>
                                        <strong>About</strong>:
                                    </p>
                                    <div
                                        className="about"
                                        dangerouslySetInnerHTML={{
                                            __html: markdownToHtml(
                                                author.about
                                            ),
                                        }}
                                    />
                                </div>
                                {index !== book.authors.length - 1 && (
                                    <hr style={{ margin: '2rem 0' }} />
                                )}
                            </React.Fragment>
                        ))}
                    </Col>
                </Row>
            </>
        )
    );
};

export default BookDetails;
