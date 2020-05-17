import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import _ from 'lodash';

const Input = (props) => {
    const { name, value, label, error, onChange, ...rest } = props;

    return (
        <>
            <Form.Group controlId={name}>
                <Form.Label>{label || _.startCase(name)}</Form.Label>
                <Form.Control
                    name={name}
                    defaultValue={value}
                    placeholder={label || _.startCase(name)}
                    onChange={onChange}
                    isInvalid={Boolean(error)}
                    {...rest}
                />
                {Boolean(error) && (
                    <Form.Control.Feedback type="invalid">
                        {error}
                    </Form.Control.Feedback>
                )}
            </Form.Group>
        </>
    );
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
    error: '',
    label: '',
    value: '',
};

export default Input;
