import React from 'react'
import "./LandingPage.css"
import {FiArrowRight} from 'react-icons/fi'
import Hero from "./image/Adopt a pet-amico 2.png"
import {useNavigate} from 'react-router-dom'
import DogCard from '../DogCard/DogCard'

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className='landing-page'>
      <div className='landing-container'>
        <div className='landing-col'>
          <h1 className='landing-title'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
          <p className='landing-para'>Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.</p>
          <button className='quiz-btn' onClick={() => {navigate("/search")}}>Start a quiz<i className='quiz-icon'><FiArrowRight size={18} /></i></button>
        </div>
        <div className='landing-col'>
          <img src={Hero} alt="hero-dog-pic"></img>
        </div>
        <div className='landing-col'></div>
      </div>  
      <div className='landing-dog-grids'>
        <h1>Dogs Near You</h1>
        <div className='landing-dog-container'>
          <LandingDogGrid/>
        </div>
        <button className='landing-see-more-btn' onClick={() => {navigate('/search')}}>See More</button>
      </div>
    </div>
  )
}

export function LandingDogGrid(){
  // NOTE: this is just dummy data
  const dogs = [{name:'Sparky', breed: 'Welsh Corgi', ageGroup: 'Young Adult',imgUrl:'https://us.123rf.com/450wm/vectortatu/vectortatu1902/vectortatu190200031/125007968-corgi-funny-orange-smiling-welsh-corgi-vector-illustration-cute-comic-canine-character.jpg?ver=6'}, {name:'Buddy', breed: 'Welsh Corgi', ageGroup: 'Young Adult',imgUrl:'https://us.123rf.com/450wm/vectortatu/vectortatu1902/vectortatu190200031/125007968-corgi-funny-orange-smiling-welsh-corgi-vector-illustration-cute-comic-canine-character.jpg?ver=6'}, {name:'Lola', breed: 'Welsh Corgi', ageGroup: 'Young Adult',imgUrl:'https://us.123rf.com/450wm/vectortatu/vectortatu1902/vectortatu190200031/125007968-corgi-funny-orange-smiling-welsh-corgi-vector-illustration-cute-comic-canine-character.jpg?ver=6'}, {name:'Daisy', breed: 'Welsh Corgi', ageGroup: 'Young Adult',imgUrl:'https://us.123rf.com/450wm/vectortatu/vectortatu1902/vectortatu190200031/125007968-corgi-funny-orange-smiling-welsh-corgi-vector-illustration-cute-comic-canine-character.jpg?ver=6'}]
  return(
    <div className='landing-dog-grid'>
        {dogs.map((dog, idx)=>{
          return(
           
              <DogCard  key={idx} name={dog.name} breed={dog.breed} ageGroup={dog.ageGroup} imgUrl={dog.imgUrl}/>
          
          )
        })}
    </div>
  )
}