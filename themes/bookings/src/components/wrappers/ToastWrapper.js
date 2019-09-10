import React from 'react';
import {ToastContainer} from 'react-toastify';

function ToastWrapper() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnVisibilityChange
            draggable={false}
            pauseOnHover={false}
        />
    )
}

export default ToastWrapper;
