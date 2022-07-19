import React from 'react'
import Dog from "./image/Error Naughty Dog.png"
import "./NotFound.css"
export default function NotFound() {
  return (
    <div className='not-found'>
      <div className='not-found-pic'>
        <img className='nf-dog' src={Dog} alt="Not Found Page"></img>
      </div>
      <div className='not-found-title'>
        <h4 className='nf-title'>Page Not Found</h4>
      </div>
    </div>
  )
}
