// @ts-nocheck
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import routes from './routes';
import CustomRoute from '../components/common/CustomRoute';

const Routes = () => {
    return (
        <Switch>
            {routes.map((route) => {
                const { path, exact, component, title } = route;

                return (
                    <CustomRoute
                        key={path}
                        path={path}
                        exact={exact}
                        title={title}
                        component={component}
                    />
                );
            })}
            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;
