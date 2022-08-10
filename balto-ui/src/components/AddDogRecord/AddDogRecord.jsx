import React from 'react'
import { useNavigate } from "react-router-dom"
import ApiClient from '../../services/ApiClient'
import { useDogRecordsContext } from '../../contexts/dog-records'
import BreedSearchbar from '../BreedSearchbar/BreedSearchbar'
import Select from 'react-select'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Rating from '@mui/material/Rating'
import { IoPaw, IoPawOutline } from 'react-icons/io5'
import EmptyBone from "../Icon/EmptyBone"
import FilledBone from "../Icon/FilledBone"
import { BsX } from "react-icons/bs"
import "./AddDogRecord.css"
import Toast from 'react-bootstrap/Toast';
import DogIcon from './icon/paw (1).png'
import UploadImageBtn from '../UploadImageBtn/UploadImageBtn'
import ProgressList from '../UploadSingleImage/ProgressList'

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
  const { addDogRecord } = useDogRecordsContext()
  const [imageUpload, setImageUpload] = React.useState([])
  const [error, setError] = React.useState(null)
  const [isValidated, setIsValidated] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [show, setShow] = React.useState(false);
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
    desc1: "", desc2: "", dateEntered: "", imageName:"", imageUrl:"",
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
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  // NOTE: we may want to make ratings optional. mandatory at the moment
  const handleOnRatingChange = (evt) => {
    // nearly identical to handleOnInputChange, only difference being that it sents value as an integer (vs. string)
    setForm((existingForm) => ({ ...existingForm, [evt.target.name]: parseInt(evt.target.value) }))
  }

  const handleOnImageFileChange = (evt) => {
    if (evt.target.files[0]){
      setImageUpload(evt.target.files[0])
    }
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
      await addDogRecord(form)
      navigate("/admin-dashboard")
    }
  }
  React.useEffect(()=>{
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
        setShow(true)
      });
    }
  }, [isLoading])
  return (
    <div className="add-record-form primary-container">

      <div className="add-record-card">
        <h1 className="add-dog-title" id='add-dog-title'>Add a New Dog</h1>
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

              {/* breed selector */}
              <Form.Group as={Col} className="mb-3">
                  <Form.Label>Breed</Form.Label>
                  <Form.Text>{selectedBreed}</Form.Text>
                    {/* BreedDropdown component is at the bottom of this file */}
                    <BreedDropdown
                      form={form}
                      setForm={setForm} />
                </Form.Group>

                {/* color input */}
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
            <div className='save-btn-area'>
              <UploadImageBtn isLoading={isLoading} show={show} setImageUpload={setImageUpload} />
            </div>
            {imageUpload && <ProgressList setLoading={setLoading} setShow={setShow} form={form} imageUpload={imageUpload} setImageUpload={setImageUpload} setForm={setForm} />}
            {form.imageUrl !== '' && 
            <div className='image-preview-container'>
             <img height={300} className='dogImage' src={form.imageUrl} alt='preview'></img>
             <ShowToast setShow={setShow} show={show}/>
            </div>}
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
                    icon={<FilledBone fontSize="inherit" />}
                    emptyIcon={<EmptyBone fontSize="inherit" />}
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
        
          <Button style={{color:'white'}} type="submit" className="mb-2 form-item">Add</Button>

        </Form>
        
      </div>
    </div>
  )
}

export function BreedDropdown({ form={}, setForm=()=>{} }) {
  
  // the body of this function minus the handleOnSelection function is nearly the identical to the BreedSearchBar component
  const [dogBreeds, setDogBreeds] = React.useState([])
  const [error, setError] = React.useState(null)

  // useEffect to get JSON object of dog breed names
  React.useEffect(() => {
    const fetchDogBreeds = async () => {
        const { data, error } = await ApiClient.fetchDogBreeds()
        if (data?.dogBreedNames) {
          // get the usable array of dog breeds - ["Poodle", "Labrador", ...]
          setDogBreeds(data.dogBreedNames)
          setError(null)
        }
        if (error) setError(error)
    }
    fetchDogBreeds()
    }, [])

  // this is to create an array of options that can be used with the react-select Select element
  const dogBreedOptions = dogBreeds.map((breed) => {
    return { value:breed, label:breed }
  })

  const handleOnSelection = (evt) => {
    setForm((existingForm) => ({ ...existingForm, breed: evt.value }))
  }

  return (
    <Select
      options={dogBreedOptions}
      value={dogBreedOptions.filter((selection) => (form.breed === selection.value))}
      onChange={handleOnSelection}
      placeholder="Type to search breeds..."
    />
  )
    
}
export function ShowToast({setShow, show}) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
    >
        <Toast  onClose={() => setShow(false)} show={show} delay={2000} autohide className='update-toast' >
          <Toast.Header>
            <img
              src={DogIcon}
              className="dog-icon-toast"
              alt="dog paw"
            />
            <strong className="me-auto">Balto</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>Image saved!</Toast.Body>
        </Toast>
    </div>
  );
}
