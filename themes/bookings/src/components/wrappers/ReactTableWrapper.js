import React from 'react';
import ReactTable from "react-table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import _ from 'lodash';

function ReactTableWrapper(props) {
    const defaultProps = {
        filterable: true,
        sortable: true,
        multiSort: true,
        defaultPageSize: 20,
        className: "-striped -highlight",
        loadingText: <FontAwesomeIcon icon="circle-notch" spin/>,
        defaultFilterMethod: (filter, row) => {
            let result = true;
            const columnValue = row[filter.id];
            const termValue = filter.value;
            if (isNaN(Number(columnValue)) || isNaN(Number(termValue))) {
                const cleanString = (input) => input ? String(input).trim().toLocaleLowerCase() : '';
                result = _.includes(cleanString(row[filter.id]), cleanString(filter.value));
            } else {
                result = Number(columnValue) === Number(termValue);
            }
            return result;
        }
    };

    const tableProps = {
        ...defaultProps,
        ...props
    };

    return (
        <ReactTable {...tableProps} />
    )
}

export default ReactTableWrapper;
