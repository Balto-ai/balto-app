import { useState, useEffect } from 'react'
import './DogProfile.css'
import { RiCheckboxCircleFill } from "react-icons/ri"
// import TrainingFeed from '../TrainingFeed/TrainingFeed';
import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { Container, Row, Col, Button, Carousel, Stack } from 'react-bootstrap'
import { Box, Tab, Tabs, Chip } from '@mui/material'

import { TabContext, TabPanel } from '@mui/lab'
import { useAuthContext } from '../../contexts/auth';
import { PublicImagesContextProvider, usePublicImagesContext } from '../../contexts/public-dog-images'
import { DogProfileContextProvider, useDogProfileContext } from '../../contexts/dog-profile';
import { Rating, Typography } from '@mui/material'
import EmptyBone from "../Icon/EmptyBone"
import FilledBone from "../Icon/FilledBone"
import AdoptionModal from "../AdoptionModal/AdoptionModal"
import AdoptionReceiptModal from '../AdoptionReceiptModal/AdoptionReceiptModal';
import ShelterMap from '../ShelterMap/ShelterMap';
import StarButtonRect from '../StarButtonRect/StarButtonRect';
import LoginForm from '../LoginForm/LoginForm';

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
  const { images, setDogId } = usePublicImagesContext()
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  //tab variabls and methods
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOnClick = () => {
    if (user?.email) {
      setModalShow(true)
    } else {
      setShowLoginModal(true)
    }
  }
  
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

  let imgArr = [
    {
      original: dogInfo.dog_image_url,
      thumbnail: dogInfo.dog_image_url
    }
  ]

  if (images.length > 0) {
    const additionalImgArr = images.map((image, index) => {
      return {
        original: image.image_url,
        thumbnail: image.image_url
      }
    })
    // append arr with profile img to arr with more imgs
    imgArr = imgArr.concat(additionalImgArr)
  }

  console.log("imgArr", imgArr)

  return (

    <Container className='dog-profile primary-container'>
      <Row>
        <Col class='col-md-6 '>
          <Row className='dog-profile-image'>
            <Carousel class='carousel-inner'>
              <Carousel.Item>
                <img src={dogInfo.dog_image_url} className="main-image" alt='main dog images' />
              </Carousel.Item>
              {images.length > 0 &&
                (images.map((image, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <img src={image.image_url} className="main-image" alt='more dog images' />
                    </Carousel.Item>
                  )
                }))
              }
            </Carousel>
          </Row>

        </Col>
        <Col className='dog-profile-details' class='col-md-6'>
          <Row>
            <h2 className="dog-name" >{dogInfo.dog_name} &nbsp;{<StarButtonRect dogId={dogInfo.dog_id} dogName={dogInfo.dog_name} />}</h2>
          </Row>
          <Row style={{ paddingBottom: 0 }} >
            <Container className="applied-filters">
              <Chip className="dog-profile-chip" label={dogInfo?.breed} />
              <Chip className="dog-profile-chip" label={getAgeGroup(dogInfo?.dob)} />
              <Chip className="dog-profile-chip" label={dogInfo?.size} />
              <Chip className="dog-profile-chip" label={dogInfo?.sex === 'm' ? 'Male' : 'Female'} />
            </Container>
          </Row>
          <Row style={{ paddingTop: 15, paddingBottom: 15 }}>
            <span><p>{dogInfo.desc_1 !== "" ? `I'm known for being ${dogInfo.desc_1}.` : ""}</p></span>
            <span><p>{dogInfo.desc_2 !== "" ? `I'm looking for someone who ${dogInfo.desc_2}.` : ""}</p></span>
          </Row>
          <Row>
            <section className='action-btns'>
              <Button onClick={handleOnClick} variant="secondary" className='shadow-btn' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                ADOPT ME
              </Button>

              {/* Logic to handle adoption button click and inquiry submission */}
              <AdoptionModal setSubmittedForm={setSubmittedForm} show={modalShow} onHide={() => { setModalShow(false); setReceiptShow(true); }} dogId={dogInfo.dog_id} />
              {showLoginModal && <LoginModal userLoggedIn={userLoggedIn} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} setUserLoggedIn={setUserLoggedIn} show={showLoginModal} onHide={() => { setShowLoginModal(false); setUserLoggedIn(true) }} />}
              { /* Modals for adoption inquiry user story */}
              {submittedForm && <AdoptionReceiptModal show={receiptShow} onHide={() => { setReceiptShow(false) }} dogName={dogInfo.dog_name} shelterName={dogInfo.shelterName} />}

            </section>
          </Row>

          <Row style={{ paddingTop: 20 }} className='dog-profile-tabs'>
            <Box sx={{ width: '100%', height: 'auto' }}>
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
                      <div className="me-auto shelter-map">
                        <ShelterMap lat={dogInfo.latitude} lon={dogInfo.longitude} />
                      </div>
                    </Container>
                  </Row>
                </TabPanel>
              </TabContext>
            </Box>
          </Row>

        </Col>
      </Row >
    </Container >
  )
}


export function LoginModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login to submit an Adoption Inquiry</Modal.Title>
      </Modal.Header>
      {/* modal body is the form to login the user */}
      <Modal.Body>
        <LoginForm showLoginModal={props.showLoginModal} userLoggedIn={props.userLoggedIn} setUserLoggedIn={props.setUserLoggedIn} onHide={props.onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ color: 'white' }} onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}