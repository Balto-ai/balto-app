import { useState, useEffect, useContext } from 'react'
import './DogProfile.css'
import { BsFillHouseDoorFill } from "react-icons/bs";
import { RiCheckboxCircleFill, RiCheckboxBlankCircleLine } from "react-icons/ri"
import { GiPartyPopper } from "react-icons/gi"
// import TrainingFeed from '../TrainingFeed/TrainingFeed';
import React from 'react';

import { Container, Row, Col, Badge, Button, Carousel, Stack } from 'react-bootstrap'
import {Box, Tab, Tabs} from '@mui/material'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import { useAuthContext } from '../../contexts/auth';
import {PublicImagesContextProvider, usePublicImagesContext} from '../../contexts/public-dog-images'
import { DogProfileContextProvider, useDogProfileContext } from '../../contexts/dog-profile';
import ApiClient from '../../services/ApiClient';
import { Rating, Typography } from '@mui/material'
import EmptyBone from "../Icon/EmptyBone"
import FilledBone from "../Icon/FilledBone"
import AdoptionModal from "../AdoptionModal/AdoptionModal"
import AdoptionReceiptModal from '../AdoptionReceiptModal/AdoptionReceiptModal';
import ShelterMap from '../ShelterMap/ShelterMap';
import StarButtonRect from '../StarButtonRect/StarButtonRect';

export default function DogProfileContainer() {
  return (
    <DogProfileContextProvider>
      <PublicImagesContextProvider>
        <DogProfile />
      </PublicImagesContextProvider>
    </DogProfileContextProvider>
  )
}

export function DogProfile() {
  const [submittedForm, setSubmittedForm] = useState(false)
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
  const [receiptShow, setReceiptShow] = useState(false)
  const {images, setDogId} = usePublicImagesContext()
   //tab variabls and methods
   const [value, setValue] = React.useState('1');

   const handleChange = (event, newValue) => {
     setValue(newValue);
   };
 
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
    setDogId(dogInfo.dog_id)
  })

  return (

    <Container className='dog-profile'>
      <Row>
        <Col>
          <Row className='dog-profile-image'>
            <Carousel>
              <Carousel.Item>
                <img src={dogInfo.dog_image_url} className="main-image" alt='main dog images' />
              </Carousel.Item>
              {images.length > 0 && 
                (images.map((image, index)=>{
                  return(
                    <Carousel.Item key={index}>
                      <img src={image.image_url} className="main-image" alt='more dog images' />
                    </Carousel.Item>
                  )
                }))
              }
            </Carousel>
          </Row>
         
        </Col>
        <Col className='dog-profile-details'>
          <Row>
            <h1>{dogInfo.dog_name}</h1>
          </Row>
          <Row style={{paddingBottom: 0}} >
            <Container>
              <Badge pill bg="info">{dogInfo.breed}</Badge>{' '}
              <Badge pill bg="info">{getAgeGroup(dogInfo.dob)}</Badge>{' '}
              <Badge pill bg="info">{dogInfo.size}</Badge>{' '}
              <Badge pill bg="info">{dogInfo.sex === 'm' ? 'male' : 'female'}</Badge>{' '}
            </Container>
          </Row>
          <Row style={{paddingTop:15, paddingBottom: 15}}>
            <span><p>{dogInfo.desc_1 !== "" ? `I'm known for being ${dogInfo.desc_1}.` : ""}</p></span>
            <span><p>{dogInfo.desc_2 !== "" ? `I'm looking for someone who ${dogInfo.desc_2}.` : ""}</p></span>
          </Row>
          <Row>
            <section className='action-btns'>
              <Button onClick={() => { setModalShow(true) }} variant="secondary" className='shadow-btn' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                 ADOPT ME
              </Button>
              <AdoptionModal setSubmittedForm={setSubmittedForm} show={modalShow} onHide={() => { setModalShow(false); setReceiptShow(true); }} dogId={dogInfo.dog_id} />

              { /* Modals for adoption inquiry user story */}
              {submittedForm && <AdoptionReceiptModal show={receiptShow} onHide={() => { setReceiptShow(false) }} dogName={dogInfo.dog_name} shelterName={dogInfo.shelterName} />}
              <StarButtonRect dogId={dogInfo.dog_id} dogName={dogInfo.dog_name} />
          </section>
      </Row>
      
      <Row style={{paddingTop: 35}} className='dog-profile-tabs'>
      <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                  >
                    <Tab value="1" label="Characteristics" />
                    <Tab value="2" label="Contact Info" />
                    <Tab value="3" label="Locate Me" />
                  </Tabs>
                </Box>
                <TabPanel value='1'>
                <Box>
                <Row className='attributes'>
            {/* <h2 className='photo-title'>A little more about me...</h2> */}
            {/* <div className='attributes-list'> */}
            <Col>
            <Stack>
                <Stack direction="horizontal">
                  {noviceFriendly && <RiCheckboxCircleFill color='#908AF8' fontSize="150%" />}
                  {noviceFriendly && <Typography component="legend" noWrap={true}>&nbsp; Novice Friendly</Typography>}               
                </Stack>
                
                <Stack direction='horizontal'>
                  {kidFriendly && <RiCheckboxCircleFill color='#908AF8' fontSize="150%" />}
                  {kidFriendly && <Typography component="legend" noWrap={true}>&nbsp; Kid Friendly</Typography>}
                </Stack>
                
                <Stack direction='horizontal'>
                  {dogFriendly && <RiCheckboxCircleFill color='#908AF8' fontSize="150%" />}
                  {dogFriendly && <Typography component="legend" noWrap={true}>&nbsp; Dog Friendly</Typography>}
                </Stack>
                
                <Stack direction='horizontal'>
                  {catFriendly && <RiCheckboxCircleFill color='#908AF8' fontSize="150%" />}
                  {catFriendly && <Typography component="legend" noWrap={true}>&nbsp; Cat Friendly</Typography>}
                </Stack>
                
                <Stack direction='horizontal'>
                  {strangerFriendly && <RiCheckboxCircleFill color='#908AF8' fontSize="150%" />}
                  {strangerFriendly && <Typography component="legend" noWrap={true}>&nbsp; Stranger Friendly</Typography>}
                </Stack>
              </Stack>
            <br></br>
            {/* </div> */}
            {/* <Col> */}
            {/* <div> */}
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
            {/* </div> */}
            {/* </Col> */}
            </Col>
          </Row>
                </Box>
                  </TabPanel>
                <TabPanel value='2'>
                <Row className='shelter-loc'>
                  {/* <h2>You can meet me at...</h2> */}
                  <h4 className='detail-title'>Shelter</h4>
                  <p>{dogInfo.shelter_name}</p>
                  <h4 className='detail-title'>Address</h4>
                  <p>{dogInfo.address}, {dogInfo.city}, {dogInfo.state} {dogInfo.zipcode}</p>
                  <h4 className='detail-title'>Email</h4>
                  <p>{dogInfo.email}</p>
                </Row>
                </TabPanel>
                <TabPanel value='3'>
                <Row>
                  <Container >
                    <div className="rounded me-auto">
                      <ShelterMap lat={dogInfo.latitude} lon={dogInfo.longitude} />
                    </div>
                  </Container>
               </Row>
                </TabPanel>
                </TabContext>
                </Box>
      </Row>
     
      <Row>
        <div className='about-section'>

          {/* <Row className='desc-1'>
            <h2>I'm known for being...</h2>
            <p>{dogInfo.desc_1}</p>
          </Row>
          <Row className='desc-2'>
            <h2>I'm looking for someone who...</h2>
            <p>{dogInfo.desc_2}</p>
          </Row> */}
          
         
        </div>
      </Row>
    </Col>
      </Row >
    </Container >
  )
}


