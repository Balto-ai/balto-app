import React from 'react'
import './DogProfile.css'

export default function DogProfile() {
  return (
    <div className='profile-page'>
      <div className='banner'>
        <img src="#" className='banner-img'></img>
      </div>
      <div className='split-pane'>
        <div className='profile-pane'>
          <div className='profile-header'>
            <img src="#" className='profile-img'></img>
            <div className='profile-title'>
              <span>Hi, I'm <h1>Sparky</h1></span>
              <section className='tags'>
                <span className='tag'>Labrador Retriever</span>
                <span className='tag'>6-12 months</span>
                <span className='tag'>Large</span>
                <span className='tag'>Male</span>
              </section>
            </div>
          </div>
          <div className='about-section'>
            <section className='desc-1'>
              <h2>I'm known for being...</h2>
              <p>energetic and always ready for a game of frisbee or find the TV remote. </p>
            </section>
            <section className='desc-2'>
              <h2>I'm looking for someone who...</h2>
              <p>is active everyday and can take me on walks in the mornings and sometimes at night</p>
            </section>
            <section className='shelter-loc'>
              <h2>You can meet me at...</h2>
              <p>Wags for Treats Animal Shelter</p>
              <p>2700 Ninth St, Berkeley, CA, 94710</p>
            </section>
          </div>
        </div>
        <div className='training-pane'>

        </div>
      </div>
    </div>
  )
}
