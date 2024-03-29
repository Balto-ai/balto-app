import React from 'react'
import RegistrationForm from "../RegistrationForm/RegistrationForm"
import { Container, Row, Col } from 'react-bootstrap'
import pet from '../../assets/Adopt a pet-pana.svg'

export default function RegistrationPage() {

  // TODO: create useEffect here, if user is logged in, navigate to the landing page OR the admin dashboard

  return (
    <Container>
      <Row>
        <Col class='col-6'>
          <img src={pet} alt='adopter hugging newly adopted dog' />
        </Col>
        <Col class='col-6'>
          <RegistrationForm />
        </Col>
      </Row>
    </Container>
  )
}
