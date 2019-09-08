import React, {useState, useEffect} from 'react';
import {Authentication} from "../partials/Authentication";
import BookingAPI from "../../api-client/BookingAPI";

export const AuthContext = React.createContext({});

function AuthProvider(props) {
    const [member, setMember] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        BookingAPI.request.get({url: '/api/auth/whoami'})
            .then((data) => {
                if (data.success) {
                    setMember(data.member);
                    setIsLoading(false);
                } else {
                    setError("Error logging in");
                    setIsLoading(false);
                    setMember(null);
                }
            })
    }, []);

    const login = (data) => (
        BookingAPI.request.post({url: '/api/auth/login', body: JSON.stringify(data, null, 2)})
            .then((result) => {
                if (result.success) {
                    setMember(result.member);
                    setIsLoading(false);
                }
                return result;
            })
    );

    const logout = () => (
        BookingAPI.request.get({url: 'api/auth/logout'})
            .then((result) => {
                if (result.success) {
                    setMember(null);
                    setError(null);
                    setIsLoading(false);
                }
            }, (error) => {
                setError(error);
                setIsLoading(false);
                setMember(null);
            })
    );

    if (isLoading) {
        return (
            <Authentication/>
        );
    } else {
        return (
            <AuthContext.Provider value={{isLoading, member, error, login: login, logout: logout}}>
                {props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer;
export {AuthProvider, AuthConsumer};
