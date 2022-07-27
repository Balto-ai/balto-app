import React from 'react'
import "./StarredPage.css"
import { useStarredContext } from '../../contexts/starred'
import { StarredContextProvider } from '../../contexts/starred'

// import DogCard from "../DogCard/DogCard"
// import DogProfile from "../DogProfile/DogProfile"
// import { Link } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from "react-bootstrap/Button"
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ApiClient from '../../services/ApiClient'
import { useEffect } from 'react'
// import { user_dog_pairings, dogs } from "../../data"

export default function StarredPageContainer() {
  return (
    <StarredContextProvider>
      <StarredPage />
    </StarredContextProvider>
  )
}

export function StarredPage() {

  const { starredList, error, isLoading } = useStarredContext() // user_dog_pairings
  const [sort, setSort] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  console.log("STARRED LIST:", starredList[0])

  return (
    <div className='main-div'>
      <h1 className='title'>Favorited Dogs ({starredList.length})</h1>
      <div className='filter-section'>
        <Form.Control id="search-bar" placeholder="Search for a life-long friend" />
        <DropDownSortMenu />
      </div>
      <div className='starred-grid'>
        {starredList.map((dogObj, idx) => {
          return <StarredCard dog={dogObj} key={idx} />
        })
        }

      </div>
    </div>
  )
}

export function DropDownSortMenu() {
  return (
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
  )
}

export function StarredCard(dog, key) {
  const navigate = useNavigate();

  function getAgeGroup(dob) {
    const birthDate = new Date(dob)
    const currentDate = new Date()
    let ageTime = currentDate - birthDate
    let ageDays = Math.floor(ageTime / (1000 * 3600 * 24))
    // following this source for age groupings:
    // https://www.frontiersin.org/articles/10.3389/fvets.2021.643085/full#:~:text=An%20option%20here%20would%20be,11%20years%20as%20Late%2DSenior.
    if (ageDays <= 180) {
      return "Puppy"
    } else if (ageDays > 180 && ageDays <= 365) {
      return "Junior"
    } else if (ageDays > 365 && ageDays <= 730) {
      return "Young Adult"
    } else if (ageDays > 730 && ageDays <= 2555) {
      return "Mature Adult"
    } else if (ageDays > 2555 && ageDays <= 4380) {
      return "Senior"
    } else {
      return "Geriatric"
    }
  }

  return (
    <Card className='cards' bg='light' onClick={() => navigate("/dog-profile")}>
      <img src={dog.dog.image_url} />
      <Card.Body>
        <Card.Title>{dog.dog.name}</Card.Title>
        <Card.Text>
          {dog.dog.breed}<br></br>
          {getAgeGroup(dog.dog.dob)}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}