import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomRoute = (props) => {
    const { title, ...rest } = props;

    useEffect(() => {
        document.title = title;
    });

    return <Route {...rest} />;
};

CustomRoute.propTypes = {
    title: PropTypes.string.isRequired,
};

export default CustomRoute;
