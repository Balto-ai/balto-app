import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from '../../contexts/auth'
import "./LoginForm.css"

export default function LoginForm() {
  
  const navigate = useNavigate()
  const [errors, setErrors] = React.useState({})
  const [form, setForm] = React.useState( { email: "",
                                            password: ""
                                          })
  
  const { user, loginUser, validateEmail } = useAuthContext()
  
  const handleOnInputChange = (evt) => {
    // check if email is valid
    if (evt.target.name === "email") {
      if (!validateEmail(evt.target.value)) {
        setErrors((existingErrors) => ({ ...existingErrors, email: "Please enter a valid email"}))
      } else {
        setErrors((existingErrors) => ({ ...existingErrors, email: null }))
      }
    }
    // update form state var with input value
    setForm((existingForm) => ({ ...existingForm, [evt.target.name]: evt.target.value }))
  }

  const handleOnFormSubmit = async (evt) => {
    evt.preventDefault()
    setErrors((existingErrors) => ({ ...existingErrors, form: null }))

    // TODO: attempt to login user (using auth context function OR ApiClient)
    // TODO: check for user type and navigate to appropriate page for the user type

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

  return (

    <div className="login-form">

      {/* login card form (left) */}
      <div className="login-card">
        <h2>Login</h2>
        <form className="form">

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

          {/* submit button */}
          <button className="submit-login" onClick={handleOnFormSubmit}>Login</button>

        </form>

      </div>

      {/* login image (right) */}
      <div className="login-image">
        <img src="" alt="Login Image" />
      </div>

    </div>
  )
}
