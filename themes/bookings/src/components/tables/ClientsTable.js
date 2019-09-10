import React from 'react';
import ReactTableWrapper from "../wrappers/ReactTableWrapper";
import {OptionalHeader} from "./OptionalFields/OptionalHeader";
import {OptionalCells} from "./OptionalFields/OptionalCells";

function ClientTable(props) {
    const {data, loading, handleDelete, handleAdd, handleEdit} = props;

    const deleteClicked = (row) => {
        handleDelete(row);
    };

    const addClicked = () => {
        handleAdd()
    };

    const editClicked = (row) => {
        handleEdit(row);
    };

    const clientColumn = [
        {
            id: 'FirstName',
            Header: 'First Name',
            accessor: 'FirstName'
        }, {
            id: 'LastName',
            Header: 'Last Name',
            accessor: 'LastName'
        }, {
            Header: 'Email',
            accessor: 'Email',
        }, {
            Header: 'Phone',
            accessor: 'Phone',
            filterable: false
        }, {
            Header: "Mobile",
            accessor: 'Mobile',
            filterable: false
        }, {
            Header: 'Address',
            accessor: 'Address'
        }, {
            Header: OptionalHeader({
                addButton: true,
                onAddClick: () => addClicked()
            }),
            Cell: (row) =>
                OptionalCells({
                    editButton: true,
                    deleteButton: true,
                    onDeleteClick: () => deleteClicked(row),
                    onEditClick: () => editClicked(row)
                }),
            filterable: false,
            sortable: false
        }
    ];

    return (
        <ReactTableWrapper
            data={data}
            columns={clientColumn}
            loading={loading}
            sorted={[
                {
                    id: 'FirstName',
                    desc: false
                },
                {
                    id: 'LastName',
                    desc: false
                }
            ]}
        />
    )
}

export default ClientTable;
