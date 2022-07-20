import React from 'react'
import "./StarredPage.css"
import DogCard from "../DogCard/DogCard"
import { user_dog_pairings, dogs } from "../../data"

export default function FavoritesPage() {
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
          return ( <DogCard className="cards" key={idx} imgUrl={dog.image_url} name={dog.name} breed={dog.breed} ageGroup={dog.dob}   />)
        })}
      </div>
    </div>
  )
}
