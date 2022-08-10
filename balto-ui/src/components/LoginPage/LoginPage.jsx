import React from 'react'
import { useNavigate } from "react-router-dom"
import { useAuthContext } from '../../contexts/auth'
import LoginForm from "../LoginForm/LoginForm"
import { Container, Row, Col } from 'react-bootstrap'
import pet from "../../assets/Adopt a pet-cuate.svg"

export default function LoginPage() {

  const navigate = useNavigate()
  const { user } = useAuthContext()

  // if user is logged in, navigate to the landing page OR the admin dashboard depending on user type
  if (user?.email) {
    if (user?.shelterId) {
      navigate("/admin-dashboard")
    } else {
      navigate("/")
    }
    return null
  }

  return (
    <Container>
      <Row>
        <Col>
          <img src={pet} alt='dog licking new adopter' />
        </Col>
        <Col>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  )
}
