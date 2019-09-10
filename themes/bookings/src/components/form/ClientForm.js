import React from 'react';
import {Button, Form, InputGroup, Modal, Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Formik} from 'formik';

function ClientForm(props) {
    const {data, open, heading, reset} = props;

    return (
        <Modal show={open} onHide={() => reset()}>
            <Formik
                initialValues={{...data}}

            >{({handleSubmit, values, errors, touched, isSubmitting, handleBlur, handleChange}) => (
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <h3>
                            <FontAwesomeIcon icon={heading === "Add" ? "user-plus" : "edit"} className="mr-2"/>{heading}
                        </h3>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Label className="form-heading">First Name</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        value={values.FirstName || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.FirstName && !errors.FirstName}
                                        isInvalid={!!errors.FirstName}
                                    />
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <Form.Label className="form-heading">Last Name</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        value={values.LastName || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.LastName && !errors.LastName}
                                        isInvalid={!!errors.LastName}
                                    />
                                </InputGroup>
                            </Col>

                            <Col md={12} className="mt-2">
                                <Form.Label className="form-heading">Email Address</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="email"
                                        value={values.Email || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.Email && !errors.Email}
                                        isInvalid={!!errors.Email}
                                    />
                                </InputGroup>
                            </Col>

                            <Col md={6} className="mt-2">
                                <Form.Label className="form-heading">Phone Number</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="number"
                                        value={values.Phone || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.Phone && !errors.Phone}
                                        isInvalid={!!errors.Phone}
                                    />
                                </InputGroup>
                            </Col>

                            <Col md={6} className="mt-2">
                                <Form.Label className="form-heading">Mobile Number</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="number"
                                        value={values.Mobile || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.Mobile && !errors.Mobile}
                                        isInvalid={!!errors.Mobile}
                                    />
                                </InputGroup>
                            </Col>

                            <Col md={12} className="mt-2">
                                <Form.Label className="form-heading">Address</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        value={values.Address || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.Address && !errors.Address}
                                        isInvalid={!!errors.Address}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => reset()}> Cancel </Button>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Save {isSubmitting ? <FontAwesomeIcon icon="circle-notch" spin/> : ""}
                        </Button>
                    </Modal.Footer>
                </Form>
            )}
            </Formik>
        </Modal>
    );
}

export default ClientForm;
