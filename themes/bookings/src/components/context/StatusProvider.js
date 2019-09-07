import React, {useState, useEffect} from 'react';
import BookingAPI from "../../api-client/BookingAPI";

const initialState = {
    company: null,
    selectedCompany: null,
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


    // const fetchRooms = () => (
    //         BookingAPI.request.get({url: 'api/clients/list/1'})
    //             .then((data) => {
    //                 console.log("data back", data)
    //                  setState({rooms: data})
    //     })
    // );

    // useEffect(() => {
    //         BookingAPI.request.get({url: 'api/clients/list/1'})
    //             .then((data) => {
    //                 console.log("data back", data)
    //                 setState({rooms: data})
    //             })
    //     }, []
    // );

    const updateStates = () => (
        console.log("yes executed")
    );



    return (
        <StatusContext.Provider value={{ ...state, updateStates: updateStates}}>
            {props.children}
        </StatusContext.Provider>
    )
}

const StatusConsumer = StatusContext.Consumer;

export {StatusProvider, StatusConsumer};