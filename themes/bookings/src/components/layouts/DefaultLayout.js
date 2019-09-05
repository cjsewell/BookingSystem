import React, {Component} from 'react';
import {Switch, Route } from 'react-router-dom';
import routes from '../../route';

class DefaultLayout extends Component {
    render() {
        return (
            <div className="main">
                <Switch>
                    {routes.map((route, idx) => {
                        return (
                            <Route
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
}

export default DefaultLayout;