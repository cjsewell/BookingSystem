import React, {useState, useEffect} from 'react';
import BookingAPI from "../../api-client/BookingAPI";

const initialState = {
    company: null,
    rooms: null
};

export const StatusContext = React.createContext(initialState);

function StatusProvider(props) {
    const [state, setState] = useState({...initialState})

    return (
        <StatusContext.Provider>
            {props.children}
        </StatusContext.Provider>
    )

}

const StatusConsumer = StatusContext.Consumer;

export {StatusProvider, StatusContext};