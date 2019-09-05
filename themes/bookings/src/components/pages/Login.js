import React from 'react';
import {Formik} from 'formik';
import {Form, InputGroup, Button} from 'react-bootstrap';
// import {AuthContext} from '../context/AuthProvider.js';
// import {Redirect} from 'react-router';
import {Link} from 'react-router-dom'
import {LoginFormValidation} from "../form/validation/LoginFormValidation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Login() {
        return (
            <div className="login-page">
                <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                    <Formik
                        initialValues={{username: '', password: ''}}
                        // onSubmit={(values, {setSubmitting}) => {
                        //     this.context.login(values)
                        //         .then((data) => {
                        //                 const {history} = this.props
                        //                 if (data.success) {
                        //                     history.push('/')
                        //                 } else {
                        //                     history.push('/profile/login')
                        //                     this.setState({
                        //                         error: data.message
                        //                     })
                        //                 }
                        //             }
                        //         ).finally(() => {
                        //         setSubmitting(false)
                        //     })
                        // }}
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

                            {/*{error && (*/}
                                {/*<Alert variant="danger" className={error ? 'd-block mt-2' : 'd-none'}>*/}
                                    {/*{error}*/}
                                {/*</Alert>*/}
                            {/*)}*/}

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