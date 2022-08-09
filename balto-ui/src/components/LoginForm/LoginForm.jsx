import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from '../../contexts/auth'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { BsX } from "react-icons/bs"
import "./LoginForm.css"


export default function LoginForm() {
  const navigate = useNavigate()
  const [form, setForm] = React.useState( { email: "",
                                            password: ""
                                          })
  const [isValidated, setIsValidated] = React.useState(false)

  const { user, loginUser, error } = useAuthContext()


  const handleOnInputChange = (evt) => {
    // update form state var with input value
    setForm((existingForm) => ({ ...existingForm, [evt.target.name]: evt.target.value }))
  }

  const handleOnFormSubmit = async (evt) => {
    evt.preventDefault()
    setIsValidated(true)
    const loginForm = evt.currentTarget
    if (loginForm.checkValidity() === false) {
      evt.stopPropagation()
    } else {
      await loginUser(form)

      if (user?.email) {
        if (user?.shelterId) {
          navigate("/admin-dashboard")
        } else {
          navigate("/")
        }
        return null
      }
    }
  }

  return (
    <div className="login-form">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <Form className="form" noValidate validated={isValidated} onSubmit={handleOnFormSubmit}>
          {error ? <Alert className="form-item" variant='danger'><BsX height="32px" /> {error}</Alert> : null}
          <Form.Group controlId="validationCustom01" className="form-item">
            <FloatingLabel controlId="floatingInput" label="Email Address" className="mb-3">
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

          <Form.Group controlId="validationCustom02" className="form-item">
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 form-input">
            <Form.Control
                name="password"
                type="password"
                onChange={handleOnInputChange}
                required
                placeholder="Password" />
            </FloatingLabel>
          </Form.Group>
        
          <Button style={{color:'white'}} type="submit" className="mb-2 form-item">Login</Button>
          <Form.Text>Need an account? <a href="/register">Sign up here.</a></Form.Text>
        </Form>

      </div>
    </div>
  )
}
