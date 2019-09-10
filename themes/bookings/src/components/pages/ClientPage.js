import React, {useState, useEffect, useContext} from 'react';
import StatusBar from "../filters/StatusBar";
import BookingAPI from "../../api-client/BookingAPI";
import ErrorAlert from "../alerts/ErrorAlert";
import StatusContext from "../context/StatusProvider";
import ClientTable from "../tables/ClientsTable";
import DeleteModal from "../Modals/DeleteModal";
import ToastWrapper from "../wrappers/ToastWrapper";
import ClientForm from "../form/ClientForm";

function ClientPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [clientData, setClientData] = useState([]);
    const [rowData, setRowData] = useState({});
    const [modalHeading, setModalHeading] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const myContext = useContext(StatusContext);
    const {selectedCompany} = myContext;

    useEffect(() => {
        if (selectedCompany && selectedCompany.value) {
            fetchClientData();
        }
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
        setOpenModal(false);
        setModalHeading(null);
        setRowData({});
    };

    const addHandler = () => {
        resetStates();
        setOpenModal(true);
        setModalHeading("Add User");
    };

    const deleteHandler = (data) => {
        resetStates();
        setOpenDelete(true);
        setRowData(data.original);
        setModalHeading("Delete User");
    };

    const editHandler = (data) => {
        resetStates();
        setOpenModal(true);
        setRowData(data.original);
        setModalHeading("Edit User");
    };


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

                {openModal && (
                    <ClientForm
                        open={openModal}
                        data={rowData}
                        heading={modalHeading}
                        reset={resetStates}
                        onSuccess={() => {
                            fetchClientData();
                        }}
                    />
                )}

                {openDelete && (
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
                )}

                <ClientTable
                    data={clientData}
                    loading={selectedCompany && selectedCompany.value ? isLoading : false}
                    handleDelete={deleteHandler}
                    handleAdd={addHandler}
                    handleEdit={editHandler}
                />

            </div>
        );
    }
}

export default ClientPage;
