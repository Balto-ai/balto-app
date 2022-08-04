import { useState, useEffect, useContext } from 'react'
import './DogProfile.css'
import { BsFillHouseDoorFill, BsStar, BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";
// import TrainingFeed from '../TrainingFeed/TrainingFeed';
import React from 'react';

import { Container, Row, Col, Image, Badge, Button, Carousel } from 'react-bootstrap'

import { useAuthContext } from '../../contexts/auth';
import { DogProfileContextProvider, useDogProfileContext } from '../../contexts/dog-profile';
import ApiClient from '../../services/ApiClient';
import { Rating, Typography } from '@mui/material'
import EmptyBone from "../Icon/EmptyBone"
import FilledBone from "../Icon/FilledBone"
import AdoptionModal from "../AdoptionModal/AdoptionModal"

import ShelterMap from '../ShelterMap/ShelterMap';

export default function DogProfileContainer() {
  return (
    <DogProfileContextProvider>
      <DogProfile />
    </DogProfileContextProvider>
  )
}

export function DogProfile() {

  const { dogInfo, setDogInfo, error, getAgeGroup, milestones } = useDogProfileContext()
  const { user, userLocation } = useAuthContext()
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

  console.log("DOG INFO: ", dogInfo)
  // if (dogInfo) { // TODO: hacky solution to prevent object undefined errors
  return (

    <Container>
      <Row>
        <Col>
          <Row>
            <Carousel>
              <Carousel.Item>
                <img src={dogInfo.dog_image_url} className="main-image" />
              </Carousel.Item>
            </Carousel>
          </Row>
          <Row>
            <div>
              <Badge pill bg="primary">{dogInfo.breed}</Badge>{' '}
              <Badge pill bg="primary">{getAgeGroup(dogInfo.dob)}</Badge>{' '}
              <Badge pill bg="primary">{dogInfo.size}</Badge>{' '}
              <Badge pill bg="primary">{dogInfo.sex === 'm' ? 'male' : 'female'}</Badge>{' '}
            </div>
          </Row>
          <Row>
            <Container>
              <ShelterMap lat={dogInfo.latitude} lon={dogInfo.longitude} />
            </Container>
          </Row>
        </Col>
        <Col>
          <Row>
            <h1>Hi! I'm {dogInfo.dog_name}.</h1>
          </Row>
          <Row>
            <section className='action-btns'>
              <Button variant="info" className='btn' onClick={handleOnFavorite} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                <BsStar /> Favorite
              </Button>
              <Button onClick={() => { setModalShow(true) }} variant="secondary" className='btn' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                <BsFillHouseDoorFill /> Adopt Me
              </Button>
              <AdoptionModal show={modalShow} onHide={() => { setModalShow(false) }} userId={user.id} dogId={dogInfo.id} />
            </section>
          </Row>
          <Row>
            <div className='about-section'>
              <Row className='desc-1'>
                <h2>I'm known for being...</h2>
                <p>{dogInfo.desc_1}</p>
              </Row>
              <Row className='desc-2'>
                <h2>I'm looking for someone who...</h2>
                <p>{dogInfo.desc_2}</p>
              </Row>
              <Row className='attributes'>
                <h2>A little more about me...</h2>
                <div className='attributes-list'>
                  <span className='checkbox-line'>
                    {noviceFriendly ? <BsCheckCircleFill color='#908AF8' fontSize="150%" /> : <BsCheckCircle color='#908AF8' fontSize="150%" />}
                    <Typography component="legend" noWrap={true}>&nbsp; Novice Friendly</Typography>
                  </span>
                  <span className='checkbox-line'>
                    {kidFriendly ? <BsCheckCircleFill color='#908AF8' fontSize="150%" /> : <BsCheckCircle color='#908AF8' fontSize="150%" />}
                    <Typography component="legend" noWrap={true}>&nbsp; Kid Friendly</Typography>
                  </span>
                  <span className='checkbox-line'>
                    {dogFriendly ? <BsCheckCircleFill color='#908AF8' fontSize="150%" /> : <BsCheckCircle color='#908AF8' fontSize="150%" />}
                    <Typography component="legend" noWrap={true}>&nbsp; Dog Friendly</Typography>
                  </span>
                  <span className='checkbox-line'>
                    {catFriendly ? <BsCheckCircleFill color='#908AF8' fontSize="150%" /> : <BsCheckCircle color='#908AF8' fontSize="150%" />}
                    <Typography component="legend" noWrap={true}>&nbsp; Cat Friendly</Typography>
                  </span>
                  <span className='checkbox-line'>
                    {strangerFriendly ? <BsCheckCircleFill color='#908AF8' fontSize="150%" /> : <BsCheckCircle color='#908AF8' fontSize="150%" />}
                    <Typography component="legend" noWrap={true}>&nbsp; Stranger Friendly</Typography>
                  </span>
                </div>
                <div>
                  <Typography component="legend" noWrap={true}>Playfulness</Typography>
                  <Rating value={playfulness} readOnly icon={<FilledBone fontSize="inherit" />}
                    emptyIcon={<EmptyBone fontSize="inherit" />} />
                  <br></br>
                  <Typography component="legend" noWrap={true}>Energy Levels</Typography>
                  <Rating value={energyLevels} readOnly icon={<FilledBone fontSize="inherit" />}
                    emptyIcon={<EmptyBone fontSize="inherit" />} />
                  <br></br>
                  <Typography component="legend" noWrap={true}>Exercise Needs</Typography>
                  <Rating value={exerciseNeeds} readOnly icon={<FilledBone fontSize="inherit" />}
                    emptyIcon={<EmptyBone fontSize="inherit" />} />
                  <br></br>
                </div>
              </Row>
              <Row className='shelter-loc'>
                <h2>You can meet me at...</h2>
                <p>{dogInfo.shelter_name}</p>
                <p>{dogInfo.address}, {dogInfo.city}, {dogInfo.state} {dogInfo.zipcode}</p>
                <p>{dogInfo.email}</p>
              </Row>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  )
  // }
}
