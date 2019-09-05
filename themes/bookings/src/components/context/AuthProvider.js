import React, {useState, useEffect} from 'react';
import {Authentication} from "../partials/Authentication";
import BookingAPI from "../../api-client/BookingAPI";

const initialState = {
    isLoggedIn: false,
    member: null,
    isLoading: true,
    error: null
};

export const AuthContext = React.createContext(initialState);

function AuthProvider(props) {
    const [state, setState] = useState({...initialState});

    useEffect(() => {
            BookingAPI.request.get({url: '/api/auth/whoami'})
                .then((data) => {
                if(data.success){
                    setState({isLoading: false, member: data.member, isLoggedIn: true})
                }
            }, (error) => {
                    setState({error: error, isLoading: false, member: null})
                })
    }, []);

    if(state.isLoading) {
        return (
            <Authentication />
        );
    } else {
        return (
            <AuthContext.Provider value={{...state}}>
                {props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer;
export {AuthProvider, AuthConsumer};