import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const GuestRoute = (props) => {
    const { user, ...rest } = props;

    if (user) {
        return <Redirect to="/admin" />;
    }

    return <Route {...rest} />;
};

GuestRoute.propTypes = {
    user: PropTypes.object,
};

export default GuestRoute;
