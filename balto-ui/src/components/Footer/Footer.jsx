import React from 'react'
import "./Footer.css"
import {Link} from 'react-router-dom'
import {BsFillTelephoneFill,BsFillEnvelopeFill,BsFillHouseDoorFill,BsFacebook, BsTwitter, BsGoogle, BsInstagram, BsLinkedin, BsGithub} from "react-icons/bs";
export default function Footer() {
  return (
    <div className='footer'>
        <section className='social-network'>
        <div className='social-span'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div className='social-logos'>
          <a href='facebook' className='socials'>
            <BsFacebook/>
          </a>
          <a href='twitter' className='socials'>
            <BsTwitter/>
          </a>
          <a href='google' className='socials'>
            <BsGoogle/>
          </a>
          <a href='instagram' className='socials'>
            <BsInstagram/>
          </a>
          <a href='linkedin' className='socials'>
            <BsLinkedin/>
          </a>
          <a href='github' className='socials'>
            <BsGithub/>
          </a>
        </div>
      </section>

      <div className='footer-container'>
        {/* column1 */}
        <div className='col'>
          <h4 className='footer-title'>BALTO</h4>
          <ul className="list-unstyled">
            <li className='footer-content'><BsFillHouseDoorFill/> New York, NY 10012, US</li>
            <li className='footer-content'><BsFillEnvelopeFill/> info@example.com</li>
            <li className='footer-content'><BsFillTelephoneFill/> + 01 234 567 89</li>
          </ul>
        </div>
        {/* comlumn2 */}
        <div className='col'>
          <h4 id="company-info" className='footer-title'>COMPANY</h4>
          <ul className='list-unstyled'>
              <li className='footer-content'>About Us</li>
              <li className='footer-content'>Privacy Policy</li>
              <li className='footer-content'>Terms of Service</li>
            </ul>
        </div>
        {/* column3 */}
        <div  className='col'>
          <h4 id="useful-links" className='footer-title'>USEFUL LINKS</h4>
          <ul className='list-unstyled'>
            <li className='footer-content'><Link className='footer-links' to="/search">Find a Dog</Link></li>
            <li className='footer-content'><Link className='footer-links' to="/">Take a Quiz</Link></li>
            <li className='footer-content'><Link className='footer-links' to="/register">Register for Free</Link></li>
          </ul>
        </div>
      </div>

      <div className='copyright' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2022 Copyright Balto
      </div>
    </div>
  )
}