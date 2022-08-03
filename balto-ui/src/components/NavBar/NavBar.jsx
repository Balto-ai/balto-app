import React from 'react'
import { useAuthContext } from '../../contexts/auth'
import { BsLightningCharge, BsStar } from "react-icons/bs"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'
import "./NavBar.css"
import 'bootstrap/dist/css/bootstrap.min.css'

export default function NavBar() {

  const { user, logoutUser } = useAuthContext()
  const isLoggedIn = user?.email
  const isShelterAdmin = user?.shelterId

  return (
    <Navbar bg="light" id="navbar">
      <Container>
        <Logo isShelterAdmin={isShelterAdmin}/>
        <NavLinks isShelterAdmin={isShelterAdmin} />
        <UserLinks
          isLoggedIn={isLoggedIn}
          logoutUser={logoutUser}
          userFirstName={user?.firstName} />
      </Container>
    </Navbar >
  )
}

export function Logo({ isShelterAdmin=false }) {
  // if the user is signed in and a shelter admin user, logo goes to the admin-dashboard
  // else, the logo goes to the landing page
  const logoPath = isShelterAdmin ? "/admin-dashboard" : "/"
  return (
    <Navbar.Brand href={logoPath} id="navbar-logo">Balto</Navbar.Brand>
  )
}

// find a dog, starred page
export function NavLinks({ isShelterAdmin }) {
  // if the user is a shelter admin, do not display any navigation links
  if (isShelterAdmin) {
    return null
  }
  // else, show the find a dog and favorites links
  return (
    <Nav className="me-auto">
      <Nav.Link href="/search" id="search-navlink"><BsLightningCharge /> Find A Dog</Nav.Link>
      <Nav.Link href="/star" id="favorites-navlink"><BsStar /> Favorites</Nav.Link>
    </Nav>
  )
}

// 
export function UserLinks({ isLoggedIn, logoutUser, userFirstName }) {

  // if no one is logged in, display the signup/registration buttons
  if (!isLoggedIn) {
    return (
    <Form className="d-flex">
      <Button variant="outline-success" href="/register">Register</Button>
      <Button variant="outline-success" href="/login">Login</Button>
    </Form>
    )
  }

  return (
    <NavDropdown title={"Hi, " + userFirstName} id="basic-nav-dropdown" align="end">
      <NavDropdown.Item href="/" onClick={logoutUser}>Logout</NavDropdown.Item>
    </NavDropdown>
  )
}