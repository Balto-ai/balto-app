import React from 'react'
import { useNavigate } from "react-router-dom"
import RegistrationForm from "../RegistrationForm/RegistrationForm"

export default function RegistrationPage() {

  // TODO: create useEffect here, if user is logged in, navigate to the landing page OR the admin dashboard

  return (
    <RegistrationForm />
  )
}
