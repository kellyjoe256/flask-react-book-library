import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const AdminRoute = (props) => {
    const { user } = props;

    if (!user) {
        return <Redirect to="/login" />;
    }

    if (!user.is_admin) {
        return <Redirect to="/admin" />;
    }

    return <Route {...props} />;
};

AdminRoute.propTypes = {
    user: PropTypes.object,
};

export default AdminRoute;
