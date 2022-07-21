import React from 'react'
import "./NavBar.css"
import { Link, useNavigate } from 'react-router-dom'
import { BsLightningCharge, BsStar } from "react-icons/bs";

import 'bootstrap/dist/css/bootstrap.min.css'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Navbar bg="light" collapseOnSelect expand="md" fixed='top' >
      <Container className='main'>
        <Navbar.Brand><Link to="/" className='logo'>Balto</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLinks className="" />
          </Nav>
          <Container>
            <Button variant="light" className='navbar-btns' onClick={() => navigate("/register")}>Sign Up</Button>
            <Button variant="primary" className='navbar-btns' onClick={() => navigate("/login")}>Login</Button>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar >


    // <div className='navbar'>
    //   <div className='header'>
    //     <div className='logo'><Link to="/" className='logo'>Balto</Link></div>
    //     <div className='navlinks-div'>
    //       <NavLinks className="nav-link"/>
    //     </div>
    //     <div className='nav-btns'>
    //       <button className='navbar-btns' onClick={() => navigate("/register")}>Sign Up</button>
    //       <button id='login' className='navbar-btns' onClick={() => navigate("/login")}>Login</button>
    //     </div>
    //   </div>
    // </div>
  )
}

export function NavLinks() {

  return (
    <div className='navlinks'>
      <span className='nav-header'>
        <Link className='links' to="/search"><BsLightningCharge /> Find A Dog</Link>
        <Link className='links' to="/star"><BsStar /> Favorites</Link>
      </span>
    </div>
  )
}