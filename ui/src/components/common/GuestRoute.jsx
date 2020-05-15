import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const GuestRoute = (props) => {
    const { user } = props;

    if (user) {
        return <Redirect to="/admin" />;
    }

    return <Route {...props} />;
};

GuestRoute.propTypes = {
    user: PropTypes.object,
};

export default GuestRoute;
