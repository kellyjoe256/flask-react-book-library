// @ts-nocheck
import React from 'react';
import _ from 'lodash';
import Joi from '@hapi/joi';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormComponent from '../../common/Form';
import { saveUser } from '../../../store/modules/users';

class Add extends FormComponent {
    schema = Joi.object({
        username: Joi.string().trim().required().label('Username'),
        password: Joi.string()
            .pattern(/^[A-Za-z@!~#$%^&*()-+\d]{8,}$/)
            .messages({
                'string.pattern.base': 'Please enter a strong password',
            })
            .required()
            .label('Password'),
        password_confirmation: Joi.any()
            .valid(Joi.ref('password'))
            .required()
            .options({
                messages: {
                    'any.only': 'Must match password',
                },
            }),
        is_admin: Joi.boolean().optional(),
    });

    constructor(props) {
        super(props);

        this.state = {
            form: {
                username: '',
                password: '',
                password_confirmation: '',
                is_admin: false,
            },
            errors: {},
        };

        this.handleIsAdminChange = this.handleIsAdminChange.bind(this);
    }

    submit() {
        const { form } = this.state;
        const { history, saveUser } = this.props;

        const fields = ['username', 'password', 'is_admin'];
        saveUser(_.pick(form, fields))
            .then(() => {
                toast.success('User added successfully');

                history.push('/admin/users');
            })
            .catch(console.log);
    }

    handleIsAdminChange(e) {
        const { target } = e;
        const { form } = this.state;

        form[target.name] = target.checked;

        this.setState({ form });
    }

    render() {
        return (
            <>
                <Row className="justify-content-md-center">
                    <Col lg={8} md="auto">
                        <Form onSubmit={this.handleSubmit} autoComplete="off">
                            {this.renderInput('username', 'Username')}
                            {this.renderInput('password', 'Password', {
                                type: 'password',
                            })}
                            {this.renderInput(
                                'password_confirmation',
                                'Confirm Password',
                                {
                                    type: 'password',
                                }
                            )}
                            <Form.Group>
                                <Form.Check
                                    id="is_admin"
                                    name="is_admin"
                                    label="Admin"
                                    onChange={this.handleIsAdminChange}
                                    isInvalid={this.hasError('is_admin')}
                                    inline
                                />
                            </Form.Group>
                            {this.renderButton('Submit')}
                        </Form>
                    </Col>
                </Row>
            </>
        );
    }
}

export default connect(null, { saveUser })(Add);
