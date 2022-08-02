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

export default function DogRecordDetail() {

  const { dogId } = useParams()
  const { dogRecord } = useDogRecordDetailContext()

  const [modalShow, setModalShow] = React.useState(false) // modal to confirm if the user wants to delete the record

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
  })

  return (
    <Container fluid className="dog-record-detail">
      
      <Row>
        
        <Col className="basic-info secondary-container">
          <div className="main-top-header">

            <img src={dogRecord.image_url} className="dog-image" alt={`Image of ${dogRecord.name}`}></img>
              
            <h1>{dogRecord.name}</h1>
            <Row>
              <Col>
                <p>Breed: {dogRecord.breed}</p>
                <p>Sex: {dogRecord.sex}</p>
                <p>Size: {dogRecord.size}</p>
              </Col>
              <Col>
                <p>Color: {dogRecord.color}</p>
                <p>Date of birth: {(new Date(dogRecord.dob)).toLocaleDateString()}</p>
                <p>Date entered: {(new Date(dogRecord.date_entered)).toLocaleDateString()}</p>
              </Col> 
            </Row>

          </div>
        </Col>


        <Col className="adopter-compatibility secondary-container">

          <Row fluid className="dog-record-detail">
            <Col className="good-withs">
              {Object.keys(goodWithCategories).map(category => {
                  return (
                    <div className="good-with">
                      <span className="checkbox-line">
                        {goodWithCategories[category] ? <BsCheckCircleFill color='#908AF8' fontSize="150%" /> : <BsCheckCircle color='#ffffff' fontSize="150%" />}
                        {goodWithCategories[category] ? <Typography component="legend" noWrap={true}>&nbsp; {category}</Typography> : <Typography component="legend" noWrap={true} color="var(--faded-text-grey)">&nbsp; {category}</Typography>}
                      </span>
                    </div>
                    )})}
            </Col>

            <Col className="ratings">
              {Object.keys(ratingCategories).map((category => {
                return (
                <div className="rating">
                  <p className="rating-label">{category}</p>
                  <Rating
                    value={ratingCategories[category]}
                    icon={<IoPaw className="filled-rating-icon" />}
                    emptyIcon={<IoPaw className="empty-rating-icon" />}
                    getLabelText={(value) => `Rating ${value}`}
                    readOnly />
                </div> )
              }))}
            </Col>
          </Row>

        </Col>
      </Row>
      
      <Row>
        <Col className="adopter-compatibility secondary-container">
          <h5>I'm known for being...</h5>
          <p>{dogRecord.desc_1}</p>
          <h5>I'm looking for someone who...</h5>
          <p>{dogRecord.desc_2}</p>
        </Col>
      </Row>

    

      <div className="bottom-buttons">
        {/* This one just links to the dog page that you can get to from the search page */}
        <Link className="btn" variant="outline-secondary" to={`/dog/${dogRecord.id}`}>View Public Profile</Link>

        {/* edit button, redirects to the edit page */}
        <Link className="btn" variant="outline-secondary" to={`/admin-dashboard/dog-record/id/${dogId}/edit`}>Edit</Link>

        {/* edit button, redirects to the edit page */}
        <Button variant="outline-danger" onClick={()=>{setModalShow(true)}}>Delete</Button>
        <DeleteDogRecordModal dogId={dogId} show={modalShow} onHide={() => setModalShow(false)} />
     </div>
    </Container>
  )
}

export function DeleteDogRecordModal(props) {

  const { deleteDogRecord } = useDogRecordsContext()
  const navigate = useNavigate()

  const handleOnDelete = async () => {
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