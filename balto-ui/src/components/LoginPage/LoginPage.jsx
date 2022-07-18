import React from 'react'
import { useNavigate } from "react-router-dom"
import LoginForm from "../LoginForm/LoginForm"

export default function LoginPage() {

  const navigate = useNavigate()

  // create useEffect here, if user is logged in, navigate to the landing page OR the admin dashboard
  
  return (
    <LoginForm />
  )
}
