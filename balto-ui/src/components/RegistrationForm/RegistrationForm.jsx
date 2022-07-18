import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import "./RegistrationForm.css"

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

  const handleOnFormSubmit = (evt) => {
    evt.preventDefault()
    setErrors((existingErrors) => ({ ...existingErrors, form: null }))

    if (form.password !== form.passwordConfirm) {
      setErrors((existingErrors) => ({ ...existingErrors, form: "Passwords do not match" }))
    }

    if (errors.form) {
      console.log("invalid form")
    } else {
      console.log(form)
    }
    
    // TODO: check for valid zip code using third-party API
    // TODO: attempt to register user (using auth context function OR ApiClient)
    // TODO: check for user type and navigate to appropriate page for the user type
  }

  return (
    
    <div className="registration-form">

    {/* login card form (left) */}
    <div className="registration-card">
      <h2>Sign Up</h2>
      <form className="form">

        {/* div element so that first name and last name inputs are on the same "line" */}
        <div className="name-inputs">

          {/* first name input */}
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input className="form-input"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleOnInputChange}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          {/* last name input */}
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input className="form-input"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleOnInputChange}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        </div>

        {/* zip code input */}
        <div className="input-field">
          <label htmlFor="zipCode">ZIP Code</label>
          <input className="form-input"
            name="zipCode"
            type="text"
            value={form.zipCode}
            onChange={handleOnInputChange}
          />
          {errors.zipCode && <span className="error">{errors.zipCode}</span>}
        </div>

        {/* email input */}
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input className="form-input"
            name="email"
            type="email"
            value={form.email}
            onChange={handleOnInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* password input */}
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input className="form-input"
            name="password"
            type="password"
            value={form.password}
            onChange={handleOnInputChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* password confirm input */}
        <div className="input-field">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input className="form-input"
            name="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            onChange={handleOnInputChange}
          />
          {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
        </div>
      
        {/* submit button */}
        <button className="submit-registration" onClick={handleOnFormSubmit}>Sign Up</button>

      </form>

    </div>

    {/* login image (right) */}
    <div className="registration-image">
      <img src="" alt="Registration Image" />
    </div>

  </div>

  )
}
