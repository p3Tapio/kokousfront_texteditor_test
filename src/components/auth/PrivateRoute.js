import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from './Sessions'

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest}
            render={(props) => getUser() ? <Component {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
    )
}