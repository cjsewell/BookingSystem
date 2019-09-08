import React from 'react';
import { Switch } from 'react-router-dom';
import routes from '../../route';
import ProtectedRoute from '../routes/ProtectedRoute';
import {StatusProvider} from "../context/StatusProvider";

function DefaultLayout() {
    return (
        <div className="main">
            <StatusProvider>
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
            </StatusProvider>
        </div>
    )
}
export default DefaultLayout;