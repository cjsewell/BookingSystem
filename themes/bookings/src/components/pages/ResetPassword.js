import React from 'react';
import {Formik} from "formik";
import {Form, InputGroup, Button} from "react-bootstrap";
import {ResetPasswordValidation} from "../form/validation/LoginFormValidation";
import {Link} from 'react-router-dom'

function ResetPassword() {
    return (
        <div className="login-page">
            <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                <Formik
                    initialValues={{username: ''}}
                    validationSchema={ResetPasswordValidation}
                >
                    {({handleSubmit}) => (
                        <Form onSubmit={handleSubmit} className='login-wrapper'>
                            <Form.Label>
                                <h2 className='login-heading'>Email Address</h2>
                            </Form.Label>
                            <InputGroup>
                                <Form.Control

                                />
                            </InputGroup>

                            <Button
                                variant="primary"
                                className="mt-2 btn-lg btn-block"
                                type="submit"
                                // disabled={isSubmitting}
                            >Submit</Button>

                            <div className="w-100 forgot-password">
                                <Link to='/'>Back to Login</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default ResetPassword;