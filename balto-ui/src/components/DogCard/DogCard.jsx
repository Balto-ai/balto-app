import React from 'react'
import "./DogCard.css"
import { useNavigate } from 'react-router-dom'

export default function DogCard(props) {
  const navigate = useNavigate();
  // NOTE: onClick listener will send user to search view, but we'll
  // change the navigation when quiz route is made
  return (
    <div onClick={()=>{navigate('/search')}} className='dog-card'>
      <div className='dog-img'><img src={props.imgUrl} alt='dog-pic' id='dog-card-img'/></div>
      <div className='dog-info'>
        <h2 className='dog-name'>{props.name}</h2>
        <p className='dog-breed'>{props.breed}</p>
        <p className='dog-age-group'>{props.ageGroup}</p>
      </div>
    </div>
  )
}
