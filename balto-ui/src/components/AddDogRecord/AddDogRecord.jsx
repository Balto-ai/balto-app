import React from 'react'
import { useNavigate } from "react-router-dom"
import ApiClient from '../../services/ApiClient'
import BreedSearchbar from '../BreedSearchbar/BreedSearchbar'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Rating from '@mui/material/Rating'
import { IoPaw, IoPawOutline } from 'react-icons/io5'
import { BsX } from "react-icons/bs"
import "./AddDogRecord.css"

export default function AddDogRecord() {

  // TODO LIST: not part of MVP, but should be addressed in the next sprint
  //  - add validation for the breed dropdown (error if no breed is selected)
  //  - MAYBE change breed dropdown so that it updates the form directly rather than a separate state var
  //  - explicitly indicate which areas are required (red asterisk)
  //  - implement a FilterSearchbar component for color instead of regular text input
  //  - make sure users can only input dates that are not in the future
  //  - make sure that the shelterEntrance date is THE SAME AS or AFTER dob date
  //  - add guiding comments, maybe those ? icons where the user can hover over it to see more info

  const navigate = useNavigate()
  const [error, setError] = React.useState(null)
  const [isValidated, setIsValidated] = React.useState(false)

  // options that will show up as form options, not used for anything else
  const sexOptions = ["Male", "Female"]
  const sizeOptions = ["Small", "Medium", "Large"]

  const goodWithOptions = { // keys used for providing the form attribute to be updated, values used as labels
    dogFriendly: "Suitable for households with other dogs",
    catFriendly: "Suitable for households with cats",
    noviceFriendly:"Suitable for beginner owners",
    kidFriendly: "Good with children",
    strangerFriendly: "Good with strangers"
  }
  const ratings = { // keys used for providing the form attribute to be updated, values used as labels
    playfulness: "Playfulness",
    energyLevel: "Energy Level",
    exerciseNeeds: "Exercise Needs"
  }

  // state variable for the selected breed, needed for use with the BreedSearchbar component
  // NOTE: may want to simply create an entirely new component for setting breed, but this works
  const [selectedBreed, setSelectedBreed] = React.useState([])

  // form that will be sent to API endpoint
  const [form, setForm] = React.useState({
    name: "", dob: "", size:"", breed:"", sex: "", color: "",
    desc1: "", desc2: "", dateEntered: "", imageUrl:"",
    noviceFriendly:false, kidFriendly:false, dogFriendly:false, catFriendly:false, strangerFriendly:false,
    playfulness:0, energyLevel:0, exerciseNeeds:0
  })

  const handleOnInputChange = (evt) => {
    // update form state var with input value
    setForm((existingForm) => ({ ...existingForm, [evt.target.name]: evt.target.value }))
  }

  const handleOnCheck = (evt) => {
    // update form state var with true/false depending on if the target is checked
    if (evt.target.checked) {
      setForm((existingForm) => ({ ...existingForm, [evt.target.name]: true }))
    } else {
      setForm((existingForm) => ({ ...existingForm, [evt.target.name]: false }))
    }
  }

  // NOTE: we may want to make ratings optional. mandatory at the moment
  const handleOnRatingChange = (evt) => {
    // nearly identical to handleOnInputChange, only difference being that it sents value as an integer (vs. string)
    setForm((existingForm) => ({ ...existingForm, [evt.target.name]: parseInt(evt.target.value) }))
  }


  const handleOnFormSubmit = async (evt) => {
    setError(null)
    evt.preventDefault()
    setIsValidated(true)
    const addDogRecordForm = evt.currentTarget
    if (addDogRecordForm.checkValidity() === false) {
      evt.stopPropagation()
    } else {
      // update form to include the selected breed
      setForm((existingForm) => ({ ...existingForm, breed:selectedBreed[0] }))
      await ApiClient.createDogRecord(form)
      navigate("/admin-dashboard")
    }
  }

  return (
    <div className="add-record-form primary-container">
      <div className="add-record-card">
        <h1 className="mb-3">Add a New Dog</h1>
        <Form className="form" noValidate validated={isValidated} onSubmit={handleOnFormSubmit}>

          {error ? <Alert className="form-item" variant='danger'><BsX height="32px" /> {error}</Alert> : null}
          
          <Form.Group className="form-group-container mb-5">
            
            <Form.Group className="form-item mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleOnInputChange}
                  required 
                  className="form-input" />
            </Form.Group>

            <Row>

              <Form.Group as={Col} className="mb-3">
                  <Form.Label>Breed</Form.Label>
                  <Form.Text>{selectedBreed}</Form.Text>
                  <BreedSearchbar
                    isMulti={false}
                    selectedBreeds={selectedBreed}
                    setSelectedBreeds={setSelectedBreed}
                    placeholder={"Type to search breed options"}
                    required
                    />
                </Form.Group>

                <Form.Group as={Col} className="form-item mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    name="color"
                    type="text"
                    value={form.color}
                    onChange={handleOnInputChange}
                    required 
                    className="form-input" />
              </Form.Group>
            
            </Row> 

            <Row>
              {/* date of birth picker */}
              <Form.Group as={Col} className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleOnInputChange}
                  required
                  className="form-input" />
              </Form.Group>

              {/* date entered picker */}
              <Form.Group as={Col} className="mb-3" >
                <Form.Label>Shelter Entrance Date</Form.Label>
                <Form.Control
                  name="dateEntered"
                  type="date"
                  value={form.dateEntered}
                  onChange={handleOnInputChange}
                  required
                  className="form-input" />
              </Form.Group>
            </Row>

            <Row>
            {/* choose sex */}
            <Form.Group as={Col} className="mb-3" >
              <Form.Label>Sex</Form.Label>
              {sexOptions.map((option, idx) => (
                <Form.Check
                  key={idx}
                  label={option}
                  name="sex"
                  value={option.toLowerCase()[0]}
                  onChange={handleOnInputChange}
                  type="radio"
                  required />
              ))}
            </Form.Group>
            
            {/* choose size */}
            <Form.Group as={Col} className="mb-3" >
              <Form.Label>Size</Form.Label>
              {sizeOptions.map((option, idx) => (
                <Form.Check
                  key={idx}
                  label={option}
                  name="size"
                  value={option.toLowerCase()}
                  onChange={handleOnInputChange}
                  type="radio"
                  required />
              ))}
            </Form.Group>
            </Row>
  

            {/* nonfunctional image upload at the moment, pushed to future sprint */}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" />
            </Form.Group>

            {/* image URL input */}
            <Form.Group className="form-item mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                name="imageUrl"
                type="text"
                value={form.imageUrl}
                onChange={handleOnInputChange}
                required
                className="form-input" />
            </Form.Group>
          </Form.Group>
  
          
          <h2>Additional Information</h2>
          <p>Let potential adopters know more about this dog</p>
          
          <Form.Group className="form-group-container mb-5">

            {/* good with checkboxes */}
            <Form.Group className="mb-3" >
              <Form.Label>Adopter Compatibility</Form.Label>
              {Object.keys(goodWithOptions).map((option, idx) => (
                <Form.Check
                  key={idx}
                  label={goodWithOptions[option]}
                  name={option}
                  onChange={handleOnCheck}
                  type="checkbox" />
              ))}
            </Form.Group>
                
            {/* ratings for playfulness,energyLevel, and exerciseNeeds */}
            <Form.Group className="mb-3">
              {Object.keys(ratings).map((category, idx) => (
                <Form.Group key={idx}>
                  <Form.Label>{ratings[category]}</Form.Label>
                  <Rating
                    name={category}
                    defaultValue={0}
                    value={form[category]}
                    onChange={handleOnRatingChange}
                    icon={<IoPaw fontSize="inherit" />}
                    emptyIcon={<IoPawOutline fontSize="inherit" />}
                    getLabelText={(value) => `Rating ${value}`}
                    required />
                </Form.Group>
              ))}
            </Form.Group>
            
            {/* I'm known for being... */}
            <Form.Group className="mb-3">
              <Form.Label>I'm known for being...</Form.Label>
              <Form.Control
                as="textarea"
                name="desc1"
                value={form.desc1}
                onChange={handleOnInputChange} />
            </Form.Group>

            {/* I'm looking for someone who */}
            <Form.Group className="mb-3">
              <Form.Label>I'm looking for someone who...</Form.Label>
              <Form.Control
                as="textarea"
                name="desc2"
                value={form.desc2}
                onChange={handleOnInputChange} />
            </Form.Group>
          
          </Form.Group>
        
          <Button type="submit" className="mb-2 form-item">Add</Button>

        </Form>
      </div>
    </div>
  )
}