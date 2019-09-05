import React from 'react';
import {Redirect, Route} from 'react-router';
import {AuthConsumer} from '../context/AuthProvider';

export default function ProtectedRoute({component, ...rest}) {
	return (
		<AuthConsumer>
			{({member}) => {
				return (
					<>
						{member ? <Route {...rest} component={component} /> : <Redirect to='/profile/login' />}
					</>
				)
			}}
		</AuthConsumer>
	)
};