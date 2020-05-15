import React from 'react';
import Joi from '@hapi/joi';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormComponent from '../../common/Form';
import { getCategory, saveCategory } from '../../../store/modules/categories';

class Edit extends FormComponent {
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

    componentDidMount() {
        this.populateCategory();
    }

    populateCategory() {
        const { history, match, getCategory } = this.props;
        const { id } = match.params;

        getCategory(id)
            .then((category) => {
                this.setState({ form: this.mapViewToModel(category) });
            })
            .catch((error) => {
                const { status: statusCode } = error;
                if (statusCode === 404) {
                    history.replace('/not-found');
                }

                console.log(error);
            });
    }

    mapViewToModel(category) {
        return {
            id: category.id,
            name: category.name,
        };
    }

    submit() {
        const { form } = this.state;
        const { history, saveCategory } = this.props;

        saveCategory(form)
            .then(() => {
                toast.success('Category edited successfully');

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

export default connect(null, { getCategory, saveCategory })(Edit);
