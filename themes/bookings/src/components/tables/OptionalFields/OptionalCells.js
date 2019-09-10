import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";

export const OptionalCells = ({editButton, deleteButton, onDeleteClick}) => {
  return (
      <div className='text-right'>
          {editButton && (
              <Button variant="success" size="sm" className="mr-1">
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
