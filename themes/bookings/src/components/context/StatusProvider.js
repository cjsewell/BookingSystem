import React, {useState, useEffect} from 'react';
import BookingAPI from "../../api-client/BookingAPI";


const StatusContext = React.createContext({});

function StatusProvider(props) {
    const [company, setCompany] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState({value: null, label: null});
    const [selectedRoom, setSelectRoom] = useState({value: null, label: null});
    const [rooms, setRooms] = useState(null);


    useEffect(() => {
        BookingAPI.request.get({url: '/api/company/list'})
            .then((data) => {
                setCompany(data)
            })
    }, []);

    const fetchRooms = (id) => (
        BookingAPI.request.get({url: `/api/company/list/space/${id}`})
            .then((data) => {
                setRooms(data.Rooms)
            })
    );

    const updateCompany = (data) => {
        if(data){
            setSelectedCompany({value: data.value, label: data.label});
        }
    };

    const updateRoom = (data) => {
        if(data){
            setSelectRoom({value: data.value, label: data.label});
        }
    };

    return (
        <StatusContext.Provider value={{company, selectedCompany, selectedRoom, rooms, updateCompany: updateCompany, updateRoom: updateRoom, fetchRooms: fetchRooms}}>
            {props.children}
        </StatusContext.Provider>
    )
}

const StatusConsumer = StatusContext.Consumer;

export {StatusProvider, StatusConsumer};
export default StatusContext;