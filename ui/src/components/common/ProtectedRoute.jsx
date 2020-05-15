import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const { user, ...rest } = props;

    if (!user) {
        return <Redirect to="/login" />;
    }

    return <Route {...rest} />;
};

ProtectedRoute.propTypes = {
    user: PropTypes.object,
};

export default ProtectedRoute;
