import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMapPin } from 'react-icons/fi'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import StarButton from '../StarButton/StarButton'
import defaultImage from '../../assets/default-image.svg'
import './DogCard.css'
import StarButtonRect from '../StarButtonRect/StarButtonRect';

export default function DogCard({ dogId=1, name="", breed="", dob=null, imgUrl="", distancebetween=0 }) { 

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
          <Row className='dog-info-topline' xs={3} s={3} m={3} lg={3} xlg={3} >
            {/* name and distance */}
            <Col className='dog-name'>{name}</Col>
            <Col className='dog-distance'>
                <FiMapPin />
                {Math.round(distancebetween) < 500 ? Math.round(distancebetween) : "500+"} mi
            </Col>
            {/* star button */}
            <Col className="dog-card-star-button-container">
              <StarButtonRect dogId={dogId} dogName={name} />
            </Col>
          
          </Row>

          <Row className="dog-details">
            <Col>
              <div className='dog-breed'>{breed}</div>
              <div className='dog-age'>{calculateAge(dob)}</div>
            </Col>
          </Row>

          </div>
          
      </div>
    )
  }


//   return (
//     <div className='dog-card'>
//       <img src={imgUrl} className='dog-card-img' alt={`Image of ${name}`}  onClick={()=>{navigate(`/dog/${dogId}`)}}/>
//       <div className='dog-info'>
//         {/* name, distance, and star button */}
//         <div className='dog-info-topline'>
//           {/* name and distance */}
//           <div className='dog-info-header'>
//             <h2 className='dog-name'>{name}</h2>
//             {/* using placeholder distance here */}
//             <h2 className='dog-distance'>
//               <FiMapPin />
//               {Math.round(distancebetween) < 500 ? Math.round(distancebetween) : "500+"} mi
//             </h2>
//           </div>
//           <StarButton dogId={dogId} dogName={name} />
//         </div>
//         <div className="dog-details">
//           <p className='dog-breed'>{breed}</p>
//           <p className='dog-age'>{calculateAge(dob)}</p>
//         </div>
//       </div>
//     </div>
//   )
// }
