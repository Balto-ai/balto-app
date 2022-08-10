import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMapPin } from 'react-icons/fi'
// import StarButton from '../StarButton/StarButton'
import defaultImage from '../../assets/default-image.svg'
import './DogCard.css'
import StarButtonRect from '../StarButtonRect/StarButtonRect';

export default function DogCard({ dogId=1, name="", breed="", dob=null, imgUrl="", distancebetween=0, onStarPage, setOnStarPage }) { 

  const navigate = useNavigate()
  const imageSrc = imgUrl || defaultImage

  // function to return approximate age in years/months 
  //    TODO: probably want to consider moving this to a context to be used in multiple components
  function calculateAge(dateOfBirth) {  

      const dob = new Date(dateOfBirth)
      const now = new Date()

      const dobYear = dob.getYear()  
      const dobMonth = dob.getMonth()  

      const currentYear = now.getYear()  
      const currentMonth = now.getMonth()
      
      // get years  
      let yearAge = currentYear - dobYear
      let monthAge = 0
        
      // get months  
      if (currentMonth >= dobMonth)  {
        monthAge = currentMonth - dobMonth  
      } else {  
        yearAge -= 1 
        monthAge = 12 + currentMonth - dobMonth
      }  
      
      // return appropriate string based on calculated months and years
      if (yearAge == 1) { // if 1 year old
        return `${yearAge} year`
      } else if (yearAge > 1) { // if older than 1 year
        return `${yearAge} years`
      } else if (yearAge == 0 && monthAge == 1) { // if only 1 month old
        return `${monthAge} month`
      } else if (monthAge > 1) { // if less than 1 year old but more than 1 month
        return `${monthAge} months`
      } else {
        return `Less than 1 month` 
      }                 
    }

    return (
      <div className='dog-card'>
        <img src={imageSrc} className='dog-card-img' alt={`Image of ${name}`}  onClick={()=>{navigate(`/dog/${dogId}`)}}/>
          {/* name, distance, and star button */}
        <div className="dog-info">
          <div className='dog-info-topline' >
            {/* name and distance */}
            <div className="dog-name-distance">
              <div className='dog-name'>{name}</div>
              <div className='dog-distance'>
                <FiMapPin />
                {distancebetween < 500 ? distancebetween.toFixed(1) : "500+"} mi
              </div>
            </div>

            {/* star button */}
            <div className="dog-card-star-button-container">
              <StarButtonRect dogId={dogId} dogName={name} onStarPage={onStarPage} setOnStarPage={setOnStarPage} />
            </div>
          </div>
          <div className="dog-details">
            <div className='dog-breed'>{breed} </div>
            <div className='dog-age'> {calculateAge(dob)}</div>
          </div>

        </div>
          
      </div>
    )
  }

