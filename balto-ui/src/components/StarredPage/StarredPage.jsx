import React from 'react'
import "./StarredPage.css"
import DogCard from "../DogCard/DogCard"
import { user_dog_pairings, dogs } from "../../data"

export default function FavoritesPage() {

  function getAgeGroup(dob) {
    const birthDate = new Date(dob)
    const currentDate = new Date()
    let age_time = currentDate - birthDate
    let age_days = Math.floor(age_time / (1000 * 3600 * 24))
    // following this source for age groupings:
    // https://www.frontiersin.org/articles/10.3389/fvets.2021.643085/full#:~:text=An%20option%20here%20would%20be,11%20years%20as%20Late%2DSenior.
    if (age_days <= 180) {
      return "Puppy"
    } else if (age_days > 180 && age_days <=365) {
      return "Junior"
    } else if (age_days > 365 && age_days <= 730) {
      return "Young Adult"
    } else if (age_days > 730 && age_days <= 2555) {
      return "Mature Adult"
    } else if (age_days > 2555 && age_days <= 4380) {
      return "Senior"
    } else {
      return "Geriatric"
    }
  }



  return (
    <div className='main-div'>
      <h1 className='title'>Favorited Dogs {user_dog_pairings.length}</h1>
      <div className='filter-section'>
        <input className="search-bar" type="text" placeholder="Search for a dog"></input>
        <form className="sort-menu" action="#">
          <select name="sort-option">
            <option>Sort by: Name</option>
            <option>Sort by: Location</option>
            <option>Sort by: Size</option>
            <option>Sort by: Age</option>
          </select>
        </form>
      </div>
      <div className='starred-grid'>
        {dogs.map((dog, idx) => {
          return (<DogCard className="cards" key={idx} imgUrl={dog.image_url} name={dog.name} breed={dog.breed} ageGroup={getAgeGroup(dog.dob)} />)
        })}
      </div>
    </div>
  )
}
