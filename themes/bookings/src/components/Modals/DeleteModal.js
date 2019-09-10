import React, {useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BookingAPI from "../../api-client/BookingAPI";
import {toast} from "react-toastify";

function DeleteModal(props) {
    const {open, data, heading, reset, onSuccess} = props;
    const [isDeleting, setIsDeleting] = useState(false);

    const name = () => {
        if (data && data.FirstName && data.LastName) {
            return `${data.FirstName + " " + data.LastName}`
        } else if (data && data.FirstName) {
            return `${data.FirstName}`;
        } else {
            return null;
        }
    };

    const handleSuccess = (data) => {
        toast.success(data.message);
        if (onSuccess) {
            onSuccess();
        }
        setIsDeleting(false);
    };

    const handleError = (err) => {
        toast.error(err.message);
        setIsDeleting(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDeleting(true);
        BookingAPI.request.post({url: '/api/clients/delete', body: JSON.stringify(data, null, 2)})
            .then((data) => {
                if (data.success) {
                    handleSuccess(data);
                } else {
                    handleError(data)
                }
            }).catch((e) => {
            handleError(e);
        })
    };

    return (
        <Modal show={open} onHide={() => reset()}>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Modal.Header closeButton>
                    <h3 className="mb-0"><FontAwesomeIcon icon="trash-alt" className="mr-2"/>{heading}</h3>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete <strong>{name()}</strong></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => reset()}> Close </Button>
                    <Button variant="danger" type="submit">
                        Delete {isDeleting ? <FontAwesomeIcon icon="circle-notch" spin/> : ""}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default DeleteModal;
