import React from 'react'
import "./LandingPage.css"
import {FiArrowRight} from 'react-icons/fi'
import Hero from "./image/Adopt a pet-amico 2.png"
import {useNavigate} from 'react-router-dom'
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className='landing-page'>
      <div className='landing-container'>
        <div className='landing-col'>
          <h1 className='landing-title'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
          <p className='landing-para'>Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.</p>
          <button className='quiz-btn' onClick={() => {navigate("/search")}}>Start a Quiz<i className='quiz-icon'><FiArrowRight size={18} /></i></button>
        </div>
        <div className='landing-col'>
          <img src={Hero} alt="hero-dog-pic"></img>
        </div>
        <div className='landing-col'></div>
      </div>  
    </div>
  )
}
