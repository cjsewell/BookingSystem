import React, {Component} from 'react';
import {Authentication} from "../partials/Authentication";

const initialState = {
    isLoggedIn: false,
    member: null,
    isLoading: true,
    error: null
};

export const AuthContext = React.createContext(initialState);

class AuthProvider extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    render() {
        const {isLoading} = this.state;
        if(isLoading) {
            return (
                   <Authentication />
            );
        }else {
            return (
                <AuthContext.Provider value={{...this.state}}>
                    <h1>tes</h1>
                    {/*{this.props.children}*/}
                </AuthContext.Provider>
            )
        }
    }
}
const AuthConsumer = AuthContext.Consumer;
export {AuthProvider, AuthConsumer};