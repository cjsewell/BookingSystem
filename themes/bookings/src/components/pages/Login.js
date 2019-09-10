import React, {useContext, useState} from 'react';
import {Formik} from 'formik';
import {Form, InputGroup, Button} from 'react-bootstrap';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom'
import {LoginFormValidation} from "../form/validation/LoginFormValidation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { AuthContext } from '../context/AuthProvider';
import ErrorAlert from "../alerts/ErrorAlert";

function Login() {
    const [error, setError] = useState(null);
    const myContext = useContext(AuthContext);
        return myContext.member ? <Redirect to='/' /> : (
            <div className="login-page">
                <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                    <Formik
                        initialValues={{username: '', password: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            myContext.login(values)
                                .then((data) => {
                                    if (!data.success) {
                                        setError(data.message)
                                    }}
                                ).finally(() => {
                                setSubmitting(false)
                            })
                        }}
                        validationSchema={LoginFormValidation}
                    >{({handleBlur, handleChange, handleSubmit, errors, values, touched, isSubmitting}) => (
                        <Form onSubmit={handleSubmit} className="login-wrapper">
                            <Form.Label className="mb-2">
                                <h2 className="login-heading">Email Address</h2>
                            </Form.Label>
                            <InputGroup>
                                <Form.Control
                                    name="username"
                                    type="text"
                                    onBlur={handleBlur}
                                    value={values.username || ''}
                                    onChange={handleChange}
                                    isValid={touched.username && !errors.username}
                                    isInvalid={!!errors.username && touched.username}
                                />

                                {errors.username && touched.username && (
                                    <Form.Control.Feedback type='invalid' className="login-error-message">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                )}
                            </InputGroup>

                            <Form.Label className="mt-2 mb-2">
                                <h2 className="login-heading">Password</h2>
                            </Form.Label>
                            <InputGroup>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    onBlur={handleBlur}
                                    value={values.password || ""}
                                    onChange={handleChange}
                                    isValid={touched.password && !errors.password}
                                    isInvalid={!!errors.password && touched.password}
                                />

                                {errors.password && touched.password && (
                                    <Form.Control.Feedback type='invalid' className="login-error-message">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                )}
                            </InputGroup>

                            {error && (
                                <ErrorAlert error={error} />
                            )}

                            <Button variant="primary"
                                    className="mt-2 btn-lg btn-block"
                                    type="submit"
                                    disabled={isSubmitting}
                            >Login {isSubmitting ? <FontAwesomeIcon icon="circle-notch" spin/> : ""}</Button>

                            <div className="forgot-password">
                                <Link to='/profile/resetpassword'>Forgot Password</Link>
                            </div>
                        </Form>
                    )}
                    </Formik>
                </div>
            </div>
        );
}

export default Login;
