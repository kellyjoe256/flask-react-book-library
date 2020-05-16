import React from 'react';
import Joi from '@hapi/joi';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import SimpleMDE from 'react-simplemde-editor';
import FormComponent from '../../common/Form';
import { getAuthor, saveAuthor } from '../../../store/modules/authors';
import 'easymde/dist/easymde.min.css';

class Add extends FormComponent {
    schema = Joi.object({
        first_name: Joi.string().trim().required().label('First Name'),
        last_name: Joi.string().trim().required().label('Last Name'),
        gender: Joi.string().trim().required().label('Gender'),
        about: Joi.string().trim().required().label('About'),
    });

    constructor(props) {
        super(props);

        this.state = {
            form: {
                first_name: '',
                last_name: '',
                gender: '',
                about: '',
            },
            errors: {},
        };

        this.handleAboutChange = this.handleAboutChange.bind(this);
    }

    componentDidMount() {
        this.populateAuthor();
    }

    submit() {
        const { form } = this.state;
        const { history, saveAuthor } = this.props;

        saveAuthor(form)
            .then(() => {
                toast.success('Author edited successfully');

                history.push('/admin/authors');
            })
            .catch(console.log);
    }

    populateAuthor() {
        const { history, match, getAuthor } = this.props;
        const { id } = match.params;

        getAuthor(id)
            .then((author) => {
                this.setState({ form: this.mapViewToModel(author) });
            })
            .catch((error) => {
                const { status: statusCode } = error;
                if (statusCode === 404) {
                    history.replace('/not-found');
                }

                console.log(error);
            });
    }

    mapViewToModel(author) {
        return {
            id: author.id,
            first_name: author.first_name,
            last_name: author.last_name,
            gender: author.gender,
            about: author.about,
        };
    }

    handleAboutChange(content) {
        const { form } = this.state;

        form.about = content;

        this.setState({ form });
    }

    render() {
        const { form } = this.state;

        return (
            <>
                <Row className="justify-content-md-center">
                    <Col lg={8} md="auto">
                        <Form onSubmit={this.handleSubmit} autoComplete="off">
                            {this.renderInput('first_name', 'First Name')}
                            {this.renderInput('last_name', 'Last Name')}
                            <Form.Group>
                                <Form.Label>Gender</Form.Label>
                                <div>
                                    <Form.Check
                                        id="male"
                                        name="gender"
                                        type="radio"
                                        label="Male"
                                        value="M"
                                        checked={form['gender'] === 'M'}
                                        onChange={this.handleChange}
                                        isInvalid={this.hasError('gender')}
                                    />
                                    <Form.Check
                                        id="female"
                                        name="gender"
                                        type="radio"
                                        label="Female "
                                        value="F"
                                        checked={form['gender'] === 'F'}
                                        onChange={this.handleChange}
                                        isInvalid={this.hasError('gender')}
                                        feedback={` ${this.getError('gender')}`}
                                    />
                                </div>
                            </Form.Group>
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

export default connect(null, { getAuthor, saveAuthor })(Add);
