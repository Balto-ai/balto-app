import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDogRecordsContext } from '../../contexts/dog-records'
import { useDogRecordDetailContext } from '../../contexts/dog-record-detail'
import { Rating} from '@mui/material'
import { IoPaw } from 'react-icons/io5'
import { BsCheckCircleFill, BsCheckCircle } from 'react-icons/bs'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Typography from '@mui/material/Typography'
import "./DogRecordDetail.css"
import { storage } from '../../firebase/firebase'
import { ref, deleteObject } from 'firebase/storage'
import { useImageContext } from '../../contexts/images'
import {ImagesContextProvider} from '../../contexts/images'
import Image from 'react-bootstrap/Image'
import Box from '@mui/material/Box';

export default function DogRecordDetailContainer(){
  return(
    <ImagesContextProvider>
      <DogRecordDetail/>
    </ImagesContextProvider>
  )
}

export function DogRecordDetail() {

  const { dogId } = useParams()
  const { dogRecord, initialized } = useDogRecordDetailContext()
  const {setDogId} = useImageContext()

  const [modalShow, setModalShow] = React.useState(false) // modal to confirm if the user wants to delete the record
 
  // used to set the ratings; due to how rating inputs work this is needed to show the ratings on the page
  const [playfulness, setPlayfulness] = React.useState(0)
  const [energyLevel, setEnergyLevel] = React.useState(0)
  const [exerciseNeeds, setExerciseNeeds] = React.useState(0)
  const ratingCategories = {"Playfulness": playfulness, "Energy Level": energyLevel, "Exercise Needs": exerciseNeeds}

  const goodWithCategories = {
    "Other Dogs": dogRecord.dog_friendly,
    "Cats": dogRecord.cat_friendly,
    "Beginners": dogRecord.novice_friendly,
    "Kids": dogRecord.kid_friendly,
    "Strangers": dogRecord.stranger_friendly}

  // set the dog attributes to state variables for ratings
  React.useEffect(() => {
    setPlayfulness(dogRecord.playfulness)
    setEnergyLevel(dogRecord.energy_level)
    setExerciseNeeds(dogRecord.exercise_needs)
    setDogId(dogId);
  })

  

  return (
    <Container fluid className="dog-record-detail">  
        {/* basic info like name, breed, sex, etc. */}
          <div className="main-top-header">
            <Row  xs='auto' md="auto" lg='auto' className="basic-info secondary-container">
              <Col >
                <Image src={dogRecord.image_url} className="dog-image" alt={`Image of ${dogRecord.name}`}></Image>
              </Col>
              <Col >
                <h1 className='dog-name-title'>{dogRecord.name}</h1>
              </Col>
            </Row>
                

          </div>
      

    </Container>
  )
}

export function DeleteDogRecordModal(props) {

  const { deleteDogRecord } = useDogRecordsContext()
  const {imageName} = props;
  const navigate = useNavigate()

  const handleOnDelete = async () => {
    const oldImageRef = ref(storage, `dogProfileImages/${imageName}`);
    // Delete the file
    deleteObject(oldImageRef).then(() => {
      // File deleted successfully
      // setImageDeleted(true)
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.error(error)
    });
    await deleteDogRecord(props.dogId)
    navigate('/admin-dashboard')

  }

  return (
    <Modal
      {...props}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      {/* modal body is the form to login the user */}
      <Modal.Body>
          <p>Are you sure you want to delete this dog record? This cannot be undone.</p>
          <Button variant="outline-danger" onClick={handleOnDelete}>Yes, Delete</Button>
          <Button variant="outline-light" onClick={props.onHide}>Cancel</Button>
      </Modal.Body>
    </Modal>
  )
}