import React from 'react'
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { BsX } from "react-icons/bs"
// import "./AdoptionInquiryForm.css"
import ApiClient from '../../services/ApiClient'

export default function AdoptionInquiryForm({ userId = 0, dogId = 0, onHide = () => { } }) {

    const navigate = useNavigate()
    const [error, setError] = React.useState(null)
    const [form, setForm] = React.useState({
        userId: userId,
        dogId: dogId,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        comments: ""
    })

    const [isValidated, setIsValidated] = React.useState(false)
    const [showConfirmMsg, setShowConfirmMsg] = React.useState(false)

    const handleOnInputChange = (evt) => {
        // update form state var with input value
        setForm((existingForm) => ({ ...existingForm, [evt.target.name]: evt.target.value }))
    }

    const handleConfirmMsg = (e) => {
        if (!showConfirmMsg) {
            e.preventDefault()
            setShowConfirmMsg(true) // toggle confirm message
        }
    }

    const handleOnFormSubmit = async (evt) => {
        evt.preventDefault()
        setIsValidated(true)
        // TODO: add form validation
        submitForm(form)
    }

    const submitForm = async (submittedForm) => {
        setIsValidated(true)
        const { data, error } = await ApiClient.createAdoptionInquiry(submittedForm)
        onHide()
        if (data) {
            setError(null)
            return (<Alert variant='secondary'>Your inquiry has been submitted!</Alert>)
        }
        if (error) {
            setError(error)
        }
    }

    return (
        <div className="adoption-inquiry-form">
            <div className="adoption-inquiry-card">
                <Form className="form" noValidate validated={isValidated} onSubmit={handleOnFormSubmit}>
                    {error ? <Alert className="form-item" variant='danger'><BsX height="32px" /> {error}</Alert> : null}

                    <Row className="mb-3">
                        <Form.Group controlId="validationCustom01" as={Col} className="form-item">
                            <FloatingLabel controlId="floatingInput" label="First Name">
                                <Form.Control
                                    name="firstName"
                                    type="text"
                                    onChange={handleOnInputChange}
                                    required
                                    placeholder="First Name"
                                    className="form-input" />
                                <Form.Control.Feedback type="invalid">Please enter a first name</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group controlId="validationCustom02" as={Col} className="form-item">
                            <FloatingLabel controlId="floatingInput" label="Last Name">
                                <Form.Control
                                    name="lastName"
                                    type="text"
                                    onChange={handleOnInputChange}
                                    required
                                    placeholder="Last"
                                    className="form-input" />
                                <Form.Control.Feedback type="invalid">Please enter a last</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group controlId="validationCustom03" as={Col} className="form-item">
                            <FloatingLabel controlId="floatingInput" label="Email Address">
                                <Form.Control
                                    name="email"
                                    type="email"
                                    onChange={handleOnInputChange}
                                    required
                                    placeholder="Email Address"
                                    className="form-input" />
                                <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group controlId="validationCustom04" as={Col} className="form-item">
                            <FloatingLabel controlId="floatingInput" label="Phone Number">
                                <Form.Control
                                    name="phoneNumber"
                                    type="text"
                                    onChange={handleOnInputChange}
                                    required
                                    placeholder="Phone Number"
                                    className="form-input" />
                                <Form.Control.Feedback type="invalid">Please enter a phone number</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Text muted>
                            The shelter may contact you through your email address or phone number
                        </Form.Text>
                    </Row>

                    <Form.Group controlId="validationCustom05" className="form-item">
                        <Form.Label>Please note any comments, questions, or concerns</Form.Label>
                        <Form.Control
                            name="comments"
                            onChange={handleOnInputChange}
                            as="textarea"
                            className="form-input mb-3" />
                    </Form.Group>

                    <Button type="submit" onClick={handleConfirmMsg} className="mb-2 form-item">Submit</Button>
                    {showConfirmMsg && (
                        <Alert className="text-center">
                            Are you sure want to submit?{" "}
                            <Button type="submit" onClick={submitForm}>Yes</Button>
                        </Alert>
                    )}
                </Form>

            </div>
        </div>
    )
}