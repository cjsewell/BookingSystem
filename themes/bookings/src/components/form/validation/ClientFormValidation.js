import React from 'react';
import * as Yup from 'yup';

export const ClientFormValidation = Yup.object().shape({
    FirstName: Yup.string().required('First name required!'),
    LastName: Yup.string().required('Last name required!'),
    Email: Yup.string().email('Please enter a valid email type').required('Email address is required!'),
    Phone: Yup.number().notRequired()
        .when('Mobile', {
            is: (val) => !val,
            then: Yup.number().positive('Phone number needs to be positive').required('Phone Number is required!')
        }),
    Mobile: Yup.number().notRequired(),
});
