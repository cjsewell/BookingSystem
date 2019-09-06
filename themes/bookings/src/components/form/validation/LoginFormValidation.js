import * as Yup from 'yup';

export const LoginFormValidation = Yup.object().shape({
    username: Yup.string().email('Invalid email type').required('Please enter a valid email address!'),
    password: Yup.string().required('Password is required!')
});

export const ResetPasswordValidation = Yup.object().shape({
    username: Yup.string().email('Invalid email type').required('Please enter a valid email address!'),
});