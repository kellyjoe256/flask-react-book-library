import React from 'react';
import Joi from '@hapi/joi';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormComponent from '../../common/Form';
import { saveCategory } from '../../../store/modules/categories';

class Add extends FormComponent {
    schema = Joi.object({
        name: Joi.string().trim().required().label('Name'),
    });

    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: '',
            },
            errors: {},
        };
    }

    submit() {
        const { form } = this.state;
        const { history, saveCategory } = this.props;

        saveCategory(form)
            .then(() => {
                toast.success('Category added successfully');

                history.push('/admin/categories');
            })
            .catch(console.log);
    }

    render() {
        return (
            <>
                <Row className="justify-content-md-center">
                    <Col lg={8} md="auto">
                        <Form onSubmit={this.handleSubmit} autoComplete="off">
                            {this.renderInput('name', 'Name')}
                            {this.renderButton('Submit')}
                        </Form>
                    </Col>
                </Row>
            </>
        );
    }
}

export default connect(null, { saveCategory })(Add);
