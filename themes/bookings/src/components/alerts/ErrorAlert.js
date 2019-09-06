import React from 'react';
import {Alert} from "react-bootstrap";

export default function ErrorAlert({error}) {
    return (
        <Alert variant="danger" className={error ? 'd-block mt-2' : 'd-none'}>
            {error}
        </Alert>
    )
}