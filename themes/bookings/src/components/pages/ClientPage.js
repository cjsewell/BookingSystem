import React, {useState, useEffect, useContext} from 'react';
import StatusBar from "../filters/StatusBar";
import BookingAPI from "../../api-client/BookingAPI";
import ErrorAlert from "../alerts/ErrorAlert";
import StatusContext from "../context/StatusProvider";
import ClientTable from "../tables/ClientsTable";
import DeleteModal from "../Modals/DeleteModal";
import ToastWrapper from "../wrappers/ToastWrapper";

function ClientPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [clientData, setClientData] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [modalHeading, setModalHeading] = useState(null);
    const [rowData, setRowData] = useState({});

    const myContext = useContext(StatusContext);
    const {selectedCompany} = myContext;

    useEffect(() => {
        // if (selectedCompany && selectedCompany.value) {
        fetchClientData();
        // }
    }, [selectedCompany]);

    const fetchClientData = () => (
        BookingAPI.request.get({url: `/api/clients/list/${selectedCompany.value}`})
            .then((data) => {
                if (data) {
                    setClientData(data.Clients);
                    setIsLoading(false);
                }
            }, (error) => {
                setError(error);
                setIsLoading(false)
            })
    );

    const resetStates = () => {
        setOpenDelete(false);
        setModalHeading(null);
        setRowData({});
    };

    const addHandler = () => {

    };

    const deleteHandler = (data) => {
        resetStates();
        setOpenDelete(true);
        setRowData(data.original);
        setModalHeading("Delete");
    };

    const editHanlder = () => {

    };


    console.log(openDelete)
    console.log(rowData)
    console.log(modalHeading)

    if (error) {
        return (
            <ErrorAlert error={error}/>
        )
    } else {
        return (
            <div className="custom-container">
                <ToastWrapper/>
                <StatusBar
                    showCompany={true}
                />

                <DeleteModal
                    open={openDelete}
                    data={rowData}
                    heading={modalHeading}
                    reset={resetStates}
                    onSuccess={() => {
                        fetchClientData();
                        resetStates();
                    }}
                />

                <ClientTable
                    data={clientData}
                    loading={selectedCompany && selectedCompany.value ? isLoading : false}
                    handleDelete={deleteHandler}
                />

            </div>
        );
    }
}

export default ClientPage;
