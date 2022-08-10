import React from 'react'
import { useAuthContext } from '../../contexts/auth'
import { BsLightningCharge } from "react-icons/bs"
import { BiHeart } from "react-icons/bi"
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
  // if the user is a shelter admin, display dogs and adoption inquiries tabs
  if (isShelterAdmin) {
    return (
      <Nav className="me-auto">
        <Nav.Link href="/admin-dashboard/" id="dog-records-navlink">Dogs</Nav.Link>
        <Nav.Link href="/admin-dashboard/adoption-inquiries" id="adoption-inquiries-navlink">Adoption Inquiries</Nav.Link>
      </Nav>
    )
  }
  // else, show the find a dog and favorites links
  return (
    <Nav className="me-auto">
      <Nav.Link href="/search" id="search-navlink"><BsLightningCharge /> Find A Dog</Nav.Link>
      <Nav.Link href="/star" id="favorites-navlink"><BiHeart /> Favorites</Nav.Link>
    </Nav>
  )
}

// 
export function UserLinks({ isLoggedIn, logoutUser, userFirstName }) {

  // if no one is logged in, display the signup/registration buttons
  if (!isLoggedIn) {
    return (
    <Form className="d-flex">
      <Button id='register-btn' href="/register">Register</Button>
      <Button id='login-btn'  className='shadow-btn' href="/login">Login</Button>
    </Form>
    )
  }

  return (
    <NavDropdown title={"Hi, " + userFirstName} id="basic-nav-dropdown" align="end">
      <NavDropdown.Item href="/" onClick={logoutUser}>Logout</NavDropdown.Item>
    </NavDropdown>
  )
}