// @ts-nocheck
import React, { Component } from 'react';
import Joi from '@hapi/joi';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import Input from './Input';

class Form extends Component {
    schema = Joi.object({});

    constructor(props) {
        super(props);

        this.state = {
            form: {},
            errors: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submit() {}

    validate() {
        const errors = {};
        const { form } = this.state;

        const { error } = this.schema.validate(form, {
            abortEarly: false,
            allowUnknown: true,
        });
        if (!error) {
            return null;
        }

        error.details.forEach((item) => {
            errors[item.context.key] = item.message.replace(/"/g, '');
        });

        return errors;
    }

    clean() {
        const { form } = this.state;

        for (const entry of _.entries(form)) {
            let [field, value] = entry;
            if (typeof value === 'string') {
                value = value.trim();
            }
            form[field] = value;
        }

        this.setState({ form });
    }

    handleSubmit(e) {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });

        if (!_.isEmpty(errors)) {
            return;
        }

        this.clean();
        this.submit();
    }

    handleChange(e) {
        const { target } = e;
        const { form } = this.state;

        form[target.name] = target.value;

        this.setState({ form });
    }

    hasError(field) {
        const { errors } = this.state;

        return _.has(errors, field);
    }

    getError(field) {
        const { errors } = this.state;

        return _.get(errors, field);
    }

    renderInput(name, label, rest = {}) {
        const { form } = this.state;

        return (
            <Input
                name={name}
                label={label}
                value={form[name]}
                error={this.getError(name)}
                onChange={this.handleChange}
                {...rest}
            />
        );
    }

    renderButton(label, variant = 'primary') {
        return (
            <Button variant={variant} type="submit">
                {label}
            </Button>
        );
    }
}

export default Form;
