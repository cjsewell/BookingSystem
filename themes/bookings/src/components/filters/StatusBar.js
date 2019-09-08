import React, {useContext} from 'react';
import Select from 'react-select';
import StatusContext, {StatusConsumer} from "../context/StatusProvider";


function StatusBar(props) {
    const {showCompany, showRoom} = props;
    const myContext = useContext(StatusContext);

    function updateCompany(props) {
        myContext.updateCompany(props);
        myContext.fetchRooms(props.value)
    }

    function updateRoom(props) {
        myContext.updateRoom(props);
    }

    const companyOptions = myContext.company && myContext.company.map((item) => {
        return {
            value: item.ID, label: item.Name
        }
    });

    const roomOptions = myContext.rooms && myContext.rooms.map((item) => {
        return {
            value: item.ID, label: item.Name
        }
    });

    return (
        <StatusConsumer>
            {({selectedCompany, rooms, selectedRoom}) => (
                <div className="filter-wrapper">
                    {showCompany && (
                        <div>
                            <div className='heading'>Company</div>
                            <Select
                                className="dropdown-select"
                                value={selectedCompany && selectedCompany.value ? selectedCompany : null}
                                options={companyOptions}
                                onChange={updateCompany}
                            />
                        </div>
                    )}
                    {showRoom && (
                        <div>
                            <div className="heading">Location</div>
                            <Select
                                className="dropdown-select"
                                value={selectedRoom && selectedRoom.value ? selectedRoom : null}
                                options={roomOptions}
                                isDisabled={(rooms && rooms.length === 0) || rooms == null}
                                onChange={updateRoom}
                            />
                        </div>
                    )}
                </div>
            )}
        </StatusConsumer>
    )
}

export default StatusBar;