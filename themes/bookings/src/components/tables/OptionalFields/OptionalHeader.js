import React from 'react';
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const OptionalHeader = ({buttonSize, addButton, onAddClick}) => {
    return (
        <div className="text-right">
            {addButton && (
                <Button variant="success" size={buttonSize} className="mr-1" onClick={() => onAddClick()}
                ><FontAwesomeIcon icon="plus"/> Add </Button>
            )}
        </div>
    )
};
