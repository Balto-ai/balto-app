import { useState, useEffect, useContext } from 'react'
import './DogProfile.css'
import { BsFillHouseDoorFill, BsStar } from "react-icons/bs";
import TrainingFeed from '../TrainingFeed/TrainingFeed';
import React from 'react';
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useAuthContext } from '../../contexts/auth';
import { DogProfileContextProvider, useDogProfileContext } from '../../contexts/dog-profile';
import ApiClient from '../../services/ApiClient';
import { Rating, Typography } from '@mui/material'
import EmptyBone from "../Icon/EmptyBone"
import FilledBone from "../Icon/FilledBone"


export default function DogProfileContainer() {
  return (
    <DogProfileContextProvider>
      <DogProfile />
    </DogProfileContextProvider>
  )
}

export function DogProfile() {

  const { dogInfo, setDogInfo, error, getAgeGroup, milestones } = useDogProfileContext()
  const { user } = useAuthContext({})
  const [kidFriendly, setKidFriendly] = useState(0)
  const [strangerFriendly, setStrangerFriendly] = useState(0)
  const [dogFriendly, setDogFriendly] = useState(0)
  const [noviceFriendly, setNoviceFriendly] = useState(0)
  const [easyToGroom, setEasyToGroom] = useState(0)
  const [energyLevels, setEnergyLevels] = useState(0)
  const [exerciseNeeds, setExerciseNeeds] = useState(0)
  const [easyToTrain, setEasyToTrain] = useState(0)

  // set the dog attributes to state variables for ratings
  useEffect(() => {
    setKidFriendly(dogInfo.kid_friendly)
    setStrangerFriendly(dogInfo.stranger_friendly)
    setDogFriendly(dogInfo.dog_friendly)
    setNoviceFriendly(dogInfo.novice_friendly)
    setEasyToGroom(dogInfo.easy_to_groom)
    setEnergyLevels(dogInfo.energy_level)
    setExerciseNeeds(dogInfo.exercise_needs)
    setEasyToTrain(dogInfo.trainability)
  })

  const handleOnFavorite = async () => {
    return await ApiClient.starDog(dogInfo.id)
  }

  console.log("dog profile milestone: ", milestones)

  // if (dogInfo) { // TODO: hacky solution to prevent object undefined errors
  return (
    <div className='profile-page'>
      <div className='banner'>
        <img src="#" className='banner-img'></img>
      </div>
      <div className='split-pane'>
        <div className='profile-pane'>
          <div className='profile-header'>
            <img src={dogInfo.image_url} className='profile-img'></img>
            <div className='profile-title'>
              <span>Hi, I'm <h1>{dogInfo.dog_name}</h1></span>
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
            <section className='attributes'>
              <h2>A little more about me...</h2>
              <div className='attributes-list'>
                <div>
                  <Typography component="legend">Kid Friendly</Typography>
                  <Rating value={kidFriendly} readOnly icon={<FilledBone fontSize="inherit" />}
                    emptyIcon={<EmptyBone fontSize="inherit" />} />
                  <br></br>
                  <Typography component="legend">Stranger Friendly</Typography>
                  <Rating value={strangerFriendly} readOnly icon={<FilledBone fontSize="inherit" />}
                    emptyIcon={<EmptyBone fontSize="inherit" />} />
                  <br></br>
                  <Typography component="legend">Dog Friendly</Typography>
                  <Rating value={dogFriendly} readOnly icon={<FilledBone fontSize="inherit" />}
                    emptyIcon={<EmptyBone fontSize="inherit" />} />
                  <br></br>
                  <Typography component="legend">Novice Friendly</Typography>
                  <Rating value={noviceFriendly} readOnly icon={<FilledBone fontSize="inherit" />}
                    emptyIcon={<EmptyBone fontSize="inherit" />} />
                  <br></br>
                </div>
                <div>
                  <Typography component="legend">Easy to Groom</Typography>
                  <Rating value={easyToGroom} readOnly icon={<FilledBone fontSize="inherit" />}
                    emptyIcon={<EmptyBone fontSize="inherit" />} />
                  <br></br>
                  <Typography component="legend">Energy Levels</Typography>
                  <Rating value={energyLevels} readOnly icon={<FilledBone fontSize="inherit" />}
                    emptyIcon={<EmptyBone fontSize="inherit" />} />
                  <br></br>
                  <Typography component="legend">Exercise Needs</Typography>
                  <Rating value={exerciseNeeds} readOnly icon={<FilledBone fontSize="inherit" />}
                    emptyIcon={<EmptyBone fontSize="inherit" />} />
                  <br></br>
                  <Typography component="legend">Easy to Train</Typography>
                  <Rating value={easyToTrain} readOnly icon={<FilledBone fontSize="inherit" />}
                    emptyIcon={<EmptyBone fontSize="inherit" />} />
                </div>
              </div>
            </section>
            <section className='shelter-loc'>
              <h2>You can meet me at...</h2>
              <p>{dogInfo.shelter_name}</p>
              <p>{dogInfo.address}, {dogInfo.city}, {dogInfo.state} {dogInfo.zipcode}</p>
              <p>{dogInfo.email}</p>
            </section>
          </div>
        </div>
        <div className='training-pane'>
          <section className='action-btns'>
            <Button variant="info" className='btn' onClick={handleOnFavorite} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
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
              {/* <TrainingFeed /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  // }
}
