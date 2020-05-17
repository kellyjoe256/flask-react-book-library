import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const Limiter = (props) => {
    const { onLimitChange } = props;

    return (
        <Form.Control
            as="select"
            name="limit"
            className="w-25"
            style={{
                display: 'inline-block',
                marginRight: '0.6rem',
            }}
            onChange={(e) => {
                const { target } = e;

                onLimitChange(target.value);
            }}
        >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
        </Form.Control>
    );
};

Limiter.propTypes = {
    onLimitChange: PropTypes.func.isRequired,
};

export default Limiter;
