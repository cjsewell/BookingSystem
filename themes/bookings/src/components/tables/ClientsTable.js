import React from 'react';
import ReactTableWrapper from "../wrappers/ReactTableWrapper";
import {OptionalHeader} from "./OptionalFields/OptionalHeader";
import {OptionalCells} from "./OptionalFields/OptionalCells";

function ClientTable(props) {
    const {data, loading, handleDelete} = props;

    const deleteClicked = (row) => {
        handleDelete(row);
    };

    const clientColumn = [
        {
            Header: 'First Name',
            accessor: 'FirstName'
        }, {
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
            Header: OptionalHeader({
                addButton: true
            }),
            Cell: (row) =>
                OptionalCells({
                    editButton: true,
                    deleteButton: true,
                    onDeleteClick: () => deleteClicked(row)
                }),
            filterable: false
        }
    ];

    return (
        <ReactTableWrapper
            data={data}
            columns={clientColumn}
            loading={loading}

        />
    )
}

export default ClientTable;
