import React from 'react';
import { Switch } from 'react-router-dom';
import routes from '../../route';
import ProtectedRoute from '../routes/ProtectedRoute';

function DefaultLayout() {
    return (
        <div className="main">
            <Switch>
                {routes.map((route, idx) => {
                    return (
                        <ProtectedRoute
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            component={route.component}
                        />
                    );
                })}
            </Switch>
        </div>
    )
}
export default DefaultLayout;