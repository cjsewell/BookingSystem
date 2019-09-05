import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function Authentication() {
    return (
        <div className="authentication">
            <FontAwesomeIcon icon="spinner" pulse/>
            <span className="message"> Authenticating...</span>
        </div>
    )
}