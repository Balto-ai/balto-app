import React from 'react'
import "./StarredPage.css"
import DogCard from "../DogCard/DogCard"
import { user_dog_pairings, dogs } from "../../data"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from "react-bootstrap/Button"
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


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
    } else if (age_days > 180 && age_days <= 365) {
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
      <h1 className='title'>Favorited Dogs ({user_dog_pairings.length})</h1>
      <div className='filter-section'>
        <Form.Control id="search-bar" placeholder="Search for a life-long friend" />
        {/* <input className="search-bar" type="text" placeholder="Search for a dog"></input> */}
        <Dropdown name="sort-dropdown" id="sort-dropdown">
          <Dropdown.Toggle variant="primary" id="sort-toggle">
            Sort by:
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Location</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Size</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Age</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='starred-grid'>
        {dogs.map((dog, idx) => {
          // return (<DogCard className="cards" key={idx} imgUrl={dog.image_url} name={dog.name} breed={dog.breed} ageGroup={getAgeGroup(dog.dob)} />)
          return (
            <Card className='cards' bg='light'>
            <img src={dog.image_url} />
            <Card.Body>
              <Card.Title>{dog.name}</Card.Title>
              <Card.Text>
                <p>{dog.breed}<br></br>
                {getAgeGroup(dog.dob)}</p>
              </Card.Text>
            </Card.Body>
          </Card>
          )
        })}
      </div>
    </div>
  )
}
