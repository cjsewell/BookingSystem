import React from 'react';
import Select from 'react-select';

function StatusBar(props) {
    const {showCompany} = props;
    return (
       <div className="filter-wrapper">
           {showCompany && (
               <Select
                   className="dropdown-select"
               />
           )}
       </div>
    )
}

export default StatusBar;