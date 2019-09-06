import React, { useState, useEffect } from 'react';
import { Authentication } from "../partials/Authentication";
import BookingAPI from "../../api-client/BookingAPI";

const initialState = {
    member: null,
    isLoading: true,
    error: null
};

export const AuthContext = React.createContext(initialState);

function AuthProvider(props) {
    const [state, setState] = useState({ ...initialState });

    useEffect(() => {
        BookingAPI.request.get({ url: '/api/auth/whoami' })
            .then((data) => {
                if (data.success) {
                    setState({ isLoading: false, member: data.member })
                } else {
                    setState({ error: "Error logging in", isLoading: false, member: null })
                }
            })
    }, []);

    const login = (data) => (
        BookingAPI.request.post({url:'/api/auth/login', body: JSON.stringify(data, null, 2)})
            .then((result) => {
                if (result.success) {
                    setState({ isLoading: false, member: result.member })
                }
                return result;
            })
    );

    const logout = () => (
        BookingAPI.request.get({url: 'api/auth/logout'})
            .then((result) => {
                if(result.success) {
                    setState({ error: null, isLoading: false, member: null })
                }
            }, (error) => {
                setState({ error: error, isLoading: false, member: null})
            })
    );

    if (state.isLoading) {
        return (
            <Authentication />
        );
    } else {
        return (
            <AuthContext.Provider value={{ ...state, login: login, logout: logout}}>
                {props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer;
export { AuthProvider, AuthConsumer };