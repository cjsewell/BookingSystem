import React, {useState, useEffect} from 'react';
import BookingAPI from "../../api-client/BookingAPI";

const initialState = {
    company: null,
    selectedCompany: {value: null, label: null},
    selectedRoom: {value: null, label: null},
    rooms: null
};

export const StatusContext = React.createContext(initialState);

function StatusProvider(props) {
    const [state, setState] = useState({...initialState});

    useEffect(() => {
        BookingAPI.request.get({url: '/api/company/list'})
            .then((data) => {
                setState({company: data})
            })
    }, []);

    const updateStates = (data) => {
        console.log("before update: ", data);
        setState({...state, selectedCompany: {value: data.value, label: data.label}})
        console.log("after update: ", state);
    };

    return (
        <StatusContext.Provider value={{ ...state, updateStates: updateStates}}>
            {props.children}
        </StatusContext.Provider>
    )
}

const StatusConsumer = StatusContext.Consumer;

export {StatusProvider, StatusConsumer};