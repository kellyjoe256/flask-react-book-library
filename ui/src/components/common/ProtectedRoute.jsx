import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const { user } = props;

    if (!user) {
        return <Redirect to="/login" />;
    }

    return <Route {...props} />;
};

ProtectedRoute.propTypes = {
    user: PropTypes.object,
};

export default ProtectedRoute;
