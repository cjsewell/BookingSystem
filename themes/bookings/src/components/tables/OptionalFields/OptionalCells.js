import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";

export const OptionalCells = ({editButton, deleteButton, onDeleteClick, onEditClick}) => {
  return (
      <div className='text-right'>
          {editButton && onEditClick && (
              <Button variant="success" size="sm" className="mr-1" onClick={() => onEditClick()} >
                  <FontAwesomeIcon icon='edit' className='mr-1'/>Edit
              </Button>
          )}

          {deleteButton && onDeleteClick && (
              <Button variant="danger" size="sm" className="ml-1" onClick={() => onDeleteClick()}>
                  <FontAwesomeIcon icon='trash-alt' className='mr-1'/>Delete
              </Button>
          )}
      </div>
  )
};
