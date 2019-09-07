import React, {useContext} from 'react';
import Select from 'react-select';
import {StatusProvider, StatusConsumer, StatusContext} from "../context/StatusProvider";


function StatusBar(props) {
    const {showCompany, showRoom} = props;
    const mycontext = useContext(StatusContext);

    function updateCompany(companyValue) {
        mycontext.updateStates(companyValue)
    }

        return (
           <StatusProvider>
               <StatusConsumer>
                   {({company}) => {
                       const companyOptions = company && company.map((item) => {
                           return {
                               value: item.ID, label: item.Name
                           }
                       });

                       return (
                           <div className="filter-wrapper">
                               {console.log(mycontext)}
                               {showCompany && (
                                   <div>
                                       <div className='heading'>Company</div>
                                       <Select
                                           className="dropdown-select"
                                           value={mycontext.selectedCompany}
                                           options={companyOptions}
                                           onChange={updateCompany}
                                       />
                                   </div>
                               )}

                               {showRoom && (
                                   <div>
                                       <div className="heading">Space</div>
                                       <Select
                                           className="dropdown-select"
                                       />
                                   </div>
                               )}
                       </div>
                   )}}
               </StatusConsumer>
           </StatusProvider>
    )
}

export default StatusBar;