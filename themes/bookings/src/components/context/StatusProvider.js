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
                setCompany(data);
                if(data && data.length === 1){
                    setSelectedCompany({value: data[0].ID, label: data[0].Name});
                    fetchRooms(data[0].ID);
                }
            })
    }, []);

    const fetchRooms = (id) => (
        BookingAPI.request.get({url: `/api/company/list/space/${id}`})
            .then((data) => {
                setRooms(data.Rooms);
                if(data.Rooms && data.Rooms.length === 1){
                    setSelectRoom({value: data.Rooms[0].ID, label: data.Rooms[0].Name})
                }
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