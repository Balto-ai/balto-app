import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import { useAuthContext } from '../../contexts/auth'
import "./RegistrationForm.css"
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { BsX } from "react-icons/bs"

export default function RegistrationForm() {

  const navigate = useNavigate()
  const [errors, setErrors] = React.useState({})
  const [form, setForm] = React.useState( { firstName: "",
                                            lastName: "",
                                            zipCode: "",
                                            email: "",
                                            password: "",
                                            passwordConfirm: ""
                                          })
  const [isValidated, setIsValidated] = React.useState(false)
  const { user, signupUser } = useAuthContext()
  console.log('errors',errors)
  console.log('form',form)
  
  const handleOnInputChange = (evt) => {

    // check if email is valid
    if (evt.target.name === "email") {
      if (evt.target.value.indexOf("@") === -1) {
        setErrors((existingErrors) => ({ ...existingErrors, email: "Please enter a valid email"}))
      } else {
        setErrors((existingErrors) => ({ ...existingErrors, email: null }))
      }
    }

    // check if passwords match
    if (evt.target.name === "password") {
        if (form.passwordConfirm && form.passwordConfirm !== evt.target.value) {
          setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match" }))
        } else {
          setErrors((e) => ({ ...e, passwordConfirm: null }))
        }
      }
      if (evt.target.name === "passwordConfirm") {
        if (form.password && form.password !== evt.target.value) {
          setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match" }))
        } else {
          setErrors((e) => ({ ...e, passwordConfirm: null }))
        }
      }

    // update form state var with input value
    setForm((existingForm) => ({ ...existingForm, [evt.target.name]: evt.target.value }))
  }

  const handleOnFormSubmit = async (evt) => {
    evt.preventDefault()
    setIsValidated(true)
    setErrors((existingErrors) => ({ ...existingErrors, form: null }))

    const registerForm = evt.currentTarget;
    if (form.password !== form.passwordConfirm) {
      setErrors((existingErrors) => ({ ...existingErrors, form: "Passwords do not match" }))
    }

    if (errors.form) {
      console.log("invalid form")
    } else {
      console.log(form)
    }
    
    if (registerForm.checkValidity() === false) {
      evt.stopPropagation()
    } else {
      // TODO: check for valid zip code using third-party API
      await signupUser(form)
      if (user?.email) navigate("/")
      // TODO: check for user type and navigate to appropriate page for the user type
  }
}

  return (
    
    <div className="registration-form">
    {/* login card form (left) */}
    <div className="registration-card">
      <h2>Sign Up</h2>
      <Form className="form" noValidate validated={isValidated} onSubmit={handleOnFormSubmit}>
          {errors.email ? <Alert className="form-item" variant='danger'><BsX height="32px" /> {errors.email}</Alert> : null}
          {errors.passwordConfirm ? <Alert className="form-item" variant='danger'><BsX height="32px" /> {errors.passwordConfirm}</Alert> : null}
          <Form.Group controlId="validationCustom01" className="form-item">
            <FloatingLabel controlId="floatingInput" label="Email Address" className="mb-3">
              <Form.Control
                name="email"
                type="email"
                onChange={handleOnInputChange}
                required
                isInvalid={errors.email}
                placeholder="Email Address" 
                className="form-input" />
            <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="validationCustom02" className="form-item">
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 form-input">
            <Form.Control
                name="password"
                type="password"
                onChange={handleOnInputChange}
                required
                placeholder="Password"
                isInvalid={errors.passwordConfirm}
                defaultValue={form.password} />
                
            <Form.Control.Feedback type="invalid">Passwords do not match</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="validationCustom03" className="form-item">
            <FloatingLabel controlId="floatingPasswordConfirm" label="Confirm Password" className="mb-3 form-input">
            <Form.Control
                name="passwordConfirm"
                type="password"
                onChange={handleOnInputChange}
                required
                placeholder="PasswordConfirm"
                isInvalid={errors.passwordConfirm}
                defaultValue={form.passwordConfirm} />
                <Form.Control.Feedback type="invalid">Passwords do not match</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Button type="submit" className="mb-2 form-item">Sign Up</Button>
          <Form.Text>Already have an account? <a href="/login">Login here</a></Form.Text>
        </Form>


    </div>
  </div>

  )
}
