// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router-dom';
import routes from './routes';
import CustomRoute from '../components/common/CustomRoute';

const Routes = () => {
    return (
        <Switch>
            {routes.map((route) => {
                const { path, exact, component, title, meta } = route;

                return (
                    <CustomRoute
                        key={path}
                        path={path}
                        exact={exact}
                        meta={meta}
                        title={title}
                        component={component}
                    />
                );
            })}
            <Redirect to="/not-found" />
        </Switch>
    );
};

Routes.propTypes = {
    user: PropTypes.object,
};

export default Routes;
