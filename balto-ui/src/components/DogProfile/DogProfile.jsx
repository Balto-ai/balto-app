import { useState, useEffect } from 'react'
import './DogProfile.css'
import { Link, useNavigate } from 'react-router-dom'
import { BsFillHouseDoorFill, BsStar } from "react-icons/bs";
import TrainingFeed from '../TrainingFeed/TrainingFeed';
import { milestones } from '../../data'
import React from 'react';
import { useParams } from 'react-router-dom';
import ApiClient from '../../services/ApiClient';
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { AuthContextProvider, useAuthContext } from '../../contexts/auth';

export default function DogProfile() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dogInfo, setDogInfo] = useState({})
  const { dogId } = useParams()
  const { user } = useAuthContext()

  useEffect(() => {
    const getDog = async (id) => {
      setIsLoading(true)
      const { data, error } = await ApiClient.fetchDogById(id)
      if (data?.dog) {
        setDogInfo(data.dog[0])
      }
      if (error) {
        setError(error)
        console.log("error: ", error)
      }
      setIsLoading(false)
    }
    getDog(dogId)
    // TODO: can't use await keyword above...so need to deconstruct object on call (setDogInfo(data.dog[0])) or else risks synchronous array destructuring to throw key not found error
    // SOLUTION: set default state variable dogInfo to empty object
  }, []);
  { console.log("dogInfo object after useEffect: ", dogInfo) }
  { console.log("AUTH USER DATA", user) }

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

  const handleOnFavorite = async () => {
    return await ApiClient.starDog(dogInfo.id)
  }

  // if (dogInfo) { // TODO: hacky solution to prevent object undefined errors
  return (
    <div className='profile-page'>
      <div className='banner'>
        <img src="#" className='banner-img'></img>
      </div>
      <div className='split-pane'>
        <div className='profile-pane'>
          <div className='profile-header'>
            <Image src={dogInfo.image_url} className='profile-img' roundedCircle ></Image>
            <div className='profile-title'>
              <span>Hi, I'm <h1>{dogInfo.name}</h1></span>
              <section className='tags'>
                <Badge bg="primary" className='tag'>{dogInfo.breed}</Badge>
                <Badge bg="primary" className='tag'>{getAgeGroup(dogInfo.dob)}</Badge>
                <Badge bg="primary" className='tag'>{dogInfo.size}</Badge>
                <Badge bg="primary" className='tag'>{dogInfo.sex === 'm' ? 'male' : 'female'}</Badge>
              </section>
            </div>
          </div>
          <div className='about-section'>
            <section className='desc-1'>
              <h2>I'm known for being...</h2>
              <p>{dogInfo.desc_1}</p>
            </section>
            <section className='desc-2'>
              <h2>I'm looking for someone who...</h2>
              <p>{dogInfo.desc_2}</p>
            </section>
            <section className='shelter-loc'>
              <h2>You can meet me at...</h2>
              <p>Wags for Treats Animal Shelter</p>
              <p>2700 Ninth St, Berkeley, CA, 94710</p>
            </section>
          </div>
        </div>
        <div className='training-pane'>
          <section className='action-btns'>
            <Button variant="info" className='btn' onClick={handleOnFavorite()} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
              <BsStar /> Favorite
            </Button>
            <Button variant="secondary" className='btn' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
              <BsFillHouseDoorFill /> Adopt Me
            </Button>
          </section>
          <section className='progress-bar'>
            <b>Progress in the shelter's training milestones</b>
            <br></br>
            <ProgressBar now={60} striped variant="secondary" />
          </section>
          <div className='training-feed'>
            <h2>Training Feed</h2>
            <div className='feed'>
              <TrainingFeed milestones={milestones} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  // }
}
