// @ts-nocheck
import React from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Select from 'react-select';
import SimpleMDE from 'react-simplemde-editor';
import Joi from '@hapi/joi';
import moment from 'moment';
import FormComponent from '../../common/Form';
import { getAuthors } from '../../../store/modules/authors';
import { getCategories } from '../../../store/modules/categories';
import { saveBook } from '../../../store/modules/books';
import 'easymde/dist/easymde.min.css';

class Add extends FormComponent {
    schema = Joi.object({
        title: Joi.string().trim().required().label('Title'),
        isbn: Joi.string().trim().required().label('ISBN'),
        num_of_pages: Joi.number()
            .integer()
            .required()
            .label('Number of pages'),
        publisher: Joi.string().trim().required().label('Publisher'),
        publication_date: Joi.date()
            .less('now')
            .required()
            .label('Publication Date'),
        authors: Joi.array()
            .items(Joi.number().integer().required())
            .label('Authors'),
        categories: Joi.array()
            .items(Joi.number().integer().required())
            .label('Categories'),
        about: Joi.string().trim().required().label('About'),
    });

    constructor(props) {
        super(props);

        this.state = {
            form: {
                title: '',
                isbn: '',
                num_of_pages: '',
                publisher: '',
                publication_date: '',
                authors: [],
                categories: [],
                about: '',
            },
            authors: [],
            categories: [],
            errors: {},
        };

        this.handleAboutChange = this.handleAboutChange.bind(this);
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    componentDidMount() {
        this.loadAuthorsCategories();
    }

    loadAuthorsCategories() {
        const { getAuthors, getCategories } = this.props;

        // prettier-ignore
        Promise.all(
                [getAuthors, getCategories].map((action) => (
                    action('all=true')
                        .then((result) => result)
                        .catch((error) => error)
                ))
            )
            .then((data) => {
                const [authors, categories] = data;
                
                this.setState({ authors, categories })
            })
            .catch(console.log);
    }

    authorOptions() {
        const { authors } = this.state;

        return authors.map((author) => {
            const { id, first_name, last_name } = author;

            return {
                value: id,
                label: `${first_name} ${last_name}`,
            };
        });
    }

    categoryOptions() {
        const { categories } = this.state;

        return categories.map((category) => {
            const { id, name } = category;

            return {
                value: id,
                label: name,
            };
        });
    }

    submit() {
        const { form } = this.state;
        const { history, saveBook } = this.props;

        const data = {
            ...form,
            publication_date: moment(form.publication_date).format(
                'YYYY-MM-DD'
            ),
        };

        saveBook(data)
            .then(() => {
                toast.success('Book added successfully');

                history.push('/admin/books');
            })
            .catch(console.log);
    }

    handleAboutChange(content) {
        const { form } = this.state;

        form.about = content;

        this.setState({ form });
    }

    handleReactSelectChange(name, value) {
        const { form } = this.state;

        if (value) {
            form[name] = value.map((v) => v.value);
        } else {
            form[name] = [];
        }

        this.setState({ form });
    }

    render() {
        const { form } = this.state;

        return (
            <>
                <Row className="justify-content-md-center">
                    <Col lg={8} md="auto">
                        <Form onSubmit={this.handleSubmit} autoComplete="off">
                            {this.renderInput('title', 'Title')}
                            {this.renderInput('isbn', 'ISBN')}
                            {this.renderInput(
                                'num_of_pages',
                                'Number of pages',
                                {
                                    type: 'number',
                                    min: 1,
                                }
                            )}
                            {this.renderInput('publisher', 'Publisher')}
                            {this.renderInput(
                                'publication_date',
                                'Publication Date',
                                {
                                    placeholder: 'YYYY-MM-DD',
                                }
                            )}
                            <Form.Group>
                                <Form.Label>Authors</Form.Label>
                                <Select
                                    name="authors"
                                    placeholder="Select authors..."
                                    options={this.authorOptions()}
                                    onChange={(e) => {
                                        this.handleReactSelectChange(
                                            'authors',
                                            e
                                        );
                                    }}
                                    isMulti
                                    isClearable
                                    isSearchable
                                />
                            </Form.Group>
                            {this.hasError('authors') && (
                                <p className="sm-8 invalid">
                                    {this.getError('authors')}
                                </p>
                            )}
                            <Form.Group>
                                <Form.Label>Categories</Form.Label>
                                <Select
                                    name="categories"
                                    placeholder="Select categories..."
                                    options={this.categoryOptions()}
                                    onChange={(e) => {
                                        this.handleReactSelectChange(
                                            'categories',
                                            e
                                        );
                                    }}
                                    isMulti
                                    isClearable
                                    isSearchable
                                />
                            </Form.Group>
                            {this.hasError('categories') && (
                                <p className="sm-8 invalid">
                                    {this.getError('categories')}
                                </p>
                            )}
                            <Form.Group>
                                <SimpleMDE
                                    id="about"
                                    label="About"
                                    onChange={this.handleAboutChange}
                                    value={form['about']}
                                    options={{
                                        hideIcons: ['image', 'link'],
                                    }}
                                />
                                {this.hasError('about') && (
                                    <p className="sm-8 invalid">
                                        {this.getError('about')}
                                    </p>
                                )}
                            </Form.Group>
                            {this.renderButton('Submit')}
                        </Form>
                    </Col>
                </Row>
            </>
        );
    }
}

export default connect(null, { getAuthors, getCategories, saveBook })(Add);
