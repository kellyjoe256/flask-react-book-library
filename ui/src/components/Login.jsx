import React from 'react';
import Joi from '@hapi/joi';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap';
import FormComponent from './common/Form';
import { login } from '../store/modules/auth';

class Login extends FormComponent {
    schema = Joi.object({
        username: Joi.string().trim().required().label('Username'),
        password: Joi.string().trim().required().label('Password'),
    });

    constructor(props) {
        super(props);

        this.state = {
            form: {
                username: '',
                password: '',
            },
            errors: {},
        };
    }

    submit() {
        const { form } = this.state;
        const { login, history } = this.props;

        login(form)
            .then(() => {
                history.push('/admin');
            })
            .catch((error) => {
                console.log(error);
            });
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
                            {this.renderButton('Submit')}
                        </Form>
                    </Col>
                </Row>
            </>
        );
    }
}

export default connect(null, { login })(Login);
