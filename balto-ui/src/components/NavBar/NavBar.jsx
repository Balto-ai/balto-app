import React from 'react'
import "./NavBar.css"
import {Link, useNavigate} from 'react-router-dom'
import { BsLightningCharge, BsStar } from "react-icons/bs";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <div className='header'>
        <div className='logo'>Balto</div>
        <div className='navlinks-div'>
          <NavLinks className="nav-link"/>
        </div>
        <div className='nav-btns'>
          <button className='navbar-btns' onClick={() => navigate("/register")}>Sign Up</button>
          <button id='login' className='navbar-btns' onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    </div>
  )
}

export function NavLinks(){
  
  return(
    <div className='navlinks'>
      <span className='nav-header'>
        <Link className='links' to="/search"><BsLightningCharge/> Find A Dog</Link>
        <Link className='links' to="/star"><BsStar/> Favorites</Link>
      </span>
    </div>
  )
}