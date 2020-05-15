import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminRoute from './AdminRoute';
import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';

const CustomRoute = (props) => {
    const { title, meta, user, ...rest } = props;

    useEffect(() => {
        document.title = title;
    });

    const newProps = {
        ...rest,
        user,
    };

    if (meta && meta.guest) {
        return <GuestRoute {...newProps} />;
    } else if (meta && meta.auth) {
        if (meta.admin) {
            return <AdminRoute {...newProps} />;
        }

        return <ProtectedRoute {...newProps} />;
    }

    return <Route {...rest} />;
};

CustomRoute.propTypes = {
    title: PropTypes.string.isRequired,
    meta: PropTypes.object,
    user: PropTypes.object,
};

export default CustomRoute;
