import React from 'react'
import { useNavigate } from 'react-router-dom'
import StarButton from '../StarButton/StarButton'
import './DogCard.css'

export default function DogCard({ dogId=1, name="", breed="", dob=null, imgUrl="" }) { 

  const navigate = useNavigate()

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
      <img src={imgUrl} className='dog-card-img' alt={`Image of ${name}`}  onClick={()=>{navigate(`/dog/${dogId}`)}}/>
      <div className='dog-info'>
        <div className='dog-info-topline'>
          <div className='dog-info-header'>
            <h2 className='dog-name'>{name}</h2>
            {/* placeholder distance here */}
            <h2 className='dog-distance'>2.1 mi</h2>
          </div>
          <StarButton dogId={dogId} dogName={name} />
        </div>
        <div className="dog-details">
          <p className='dog-breed'>{breed}</p>
          <p className='dog-age'>{calculateAge(dob)}</p>
        </div>
      </div>
    </div>
  )
}
