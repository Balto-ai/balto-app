import { useState, useEffect, useContext } from 'react'
import './DogProfile.css'
import { BsFillHouseDoorFill, BsStar, BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";
// import TrainingFeed from '../TrainingFeed/TrainingFeed';
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
import AdoptionModal from "../AdoptionModal/AdoptionModal"


export default function DogProfileContainer() {
  return (
    <DogProfileContextProvider>
      <DogProfile />
    </DogProfileContextProvider>
  )
}

export function DogProfile() {

  const { dogInfo, setDogInfo, error, getAgeGroup, milestones } = useDogProfileContext()
  const { user, location } = useAuthContext({})
  const [kidFriendly, setKidFriendly] = useState(false)
  const [strangerFriendly, setStrangerFriendly] = useState(false)
  const [dogFriendly, setDogFriendly] = useState(false)
  const [catFriendly, setCatFriendly] = useState(false)
  const [noviceFriendly, setNoviceFriendly] = useState(false)
  const [energyLevels, setEnergyLevels] = useState(0)
  const [exerciseNeeds, setExerciseNeeds] = useState(0)
  const [playfulness, setPlayfulness] = useState(0)
  const [modalShow, setModalShow] = useState(false)

  // set the dog attributes to state variables for ratings
  useEffect(() => {
    setKidFriendly(dogInfo.kid_friendly)
    setStrangerFriendly(dogInfo.stranger_friendly)
    setDogFriendly(dogInfo.dog_friendly)
    setNoviceFriendly(dogInfo.novice_friendly)
    setCatFriendly(dogInfo.cat_friendly)
    setEnergyLevels(dogInfo.energy_level)
    setExerciseNeeds(dogInfo.exercise_needs)
    setPlayfulness(dogInfo.playfulness)
  })

  const handleOnFavorite = async () => {
    return await ApiClient.starDog(dogInfo.id)
  }

  console.log("User's city: ", location.city)

  // if (dogInfo) { // TODO: hacky solution to prevent object undefined errors
  return (
    <div className='profile-page'>
      
    </div>
  )
  // }
}
