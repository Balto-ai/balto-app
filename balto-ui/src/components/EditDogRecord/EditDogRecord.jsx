import React from 'react'
import { useNavigate, useParams } from "react-router-dom"
import ApiClient from '../../services/ApiClient'
import { useDogRecordDetailContext } from '../../contexts/dog-record-detail'
import Select from 'react-select'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Rating from '@mui/material/Rating'
import { IoPaw, IoPawOutline } from 'react-icons/io5'
import { BsX } from "react-icons/bs"
import "./EditDogRecord.css"
import Toast from 'react-bootstrap/Toast';
import DogIcon from './icon/paw (1).png'
import UploadImageBtn from '../UploadImageBtn/UploadImageBtn'
import ProgressList from '../EditSingleImage/ProgressList'




export default function EditDogRecord() {

  // TODO: refer to TODO LIST in AddDogRecord.jsx
  //  - breed and ratings show correctly on initial load, but disappears after refreshing ??

  const navigate = useNavigate()
  const { dogId } = useParams()
  const [isLoading, setLoading] = React.useState(false)
  const [show, setShow] = React.useState(false);
  const [imageUpload, setImageUpload] = React.useState(null)
  const { dogRecord, editDogRecord, error, setError, initialized } = useDogRecordDetailContext()
  const [form, setForm] = React.useState({}) // form that will be sent to API endpoint to update the dog record
  const [isValidated, setIsValidated] = React.useState(false)

  // options that will show up as form options, not used for anything else
  const sexOptions = ["Male", "Female"]
  const sizeOptions = ["Small", "Medium", "Large"]

  const goodWithOptions = { // keys used for providing the form attribute to be updated, values used as labels
    dog_friendly: "Suitable for households with other dogs",
    cat_friendly: "Suitable for households with cats",
    novice_friendly:"Suitable for beginner owners",
    kid_friendly: "Good with children",
    stranger_friendly: "Good with strangers"
  }
  const ratings = { // keys used for providing the form attribute to be updated, values used as labels
    playfulness: "Playfulness",
    energy_level: "Energy Level",
    exercise_needs: "Exercise Needs"
  }
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  const handleOnInputChange = (evt) => {
    // if the value is different from the original dogRecord value, add the key and value to the form object
    if (dogRecord[evt.target.name] !== evt.target.value) {
      setForm((existingForm) => ({ ...existingForm, [evt.target.name]: evt.target.value }))
      // else, remove the kay/value pair from the form object. This is done to reduce the request body size as much as possible
    } else {
      let tempForm = {...form}
      delete tempForm[evt.target.name]
      setForm(tempForm)
    }
  }

  const handleOnDateChange = (evt) => {
    // similar to handleOnInputChange, just formats the date correctly
    if (dogRecord[evt.target.name].substring(0,10) !== evt.target.value) {
      setForm((existingForm) => ({ ...existingForm, [evt.target.name]: evt.target.value }))
    } else {
      let tempForm = {...form}
      delete tempForm[evt.target.name]
      setForm(tempForm)
    }
  }

  const handleOnCheck = (evt) => {
    // update form state var with true/false depending on if the target is checked
    if (evt.target.checked !== dogRecord[evt.target.name]) {
      
      setForm((existingForm) => ({ ...existingForm, [evt.target.name]: evt.target.checked }))
    } else {
      let tempForm = {...form}
      delete tempForm[evt.target.name]
      setForm(tempForm)
    }
  }

  const handleOnRatingChange = (evt) => {
    // nearly identical to handleOnInputChange, only difference being that it sents value as an integer (vs. string)

    let targetValue = parseInt(evt.target.value)
    if (dogRecord[evt.target.name] !== targetValue) {
      setForm((existingForm) => ({ ...existingForm, [evt.target.name]: targetValue }))
    } else {
      let tempForm = {...form}
      delete tempForm[evt.target.name]
      setForm(tempForm)
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
      await editDogRecord(dogId, form)
      navigate("/admin-dashboard/dog-record/id/"+dogId)
    }
  }

  React.useEffect(()=>{
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
        setShow(true);
      });
    }
  }, [isLoading])

  if (initialized) {
  return (
    <div className="add-record-form primary-container">
      <div className="add-record-card">
        <h1 className="mb-3">Edit Dog</h1>
        <Form className="form" noValidate validated={isValidated} onSubmit={handleOnFormSubmit}>

          {error ? <Alert className="form-item" variant='danger'><BsX height="32px" /> {error}</Alert> : null}
          
          <Form.Group className="form-group-container mb-5">
            
            <Form.Group className="form-item mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                defaultValue={dogRecord?.name}
                onChange={handleOnInputChange}
                required 
                className="form-input" />
            </Form.Group>

            <Row>

              {/* breed selector */}
              <Form.Group as={Col} className="mb-3">
                  <Form.Label>Breed</Form.Label>
                    <BreedDropdown
                      initialBreed={dogRecord?.breed}
                      form={form}
                      setForm={setForm} />
                </Form.Group>

                {/* color input */}
                <Form.Group as={Col} className="form-item mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    name="color"
                    type="text"
                    defaultValue={dogRecord?.color}
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
                  defaultValue={dogRecord?.dob?.substring(0,10)}
                  onChange={handleOnDateChange}
                  required
                  className="form-input" />
              </Form.Group>

              {/* date entered picker */}
              <Form.Group as={Col} className="mb-3" >
                <Form.Label>Shelter Entrance Date</Form.Label>
                <Form.Control
                  name="date_entered"
                  type="date"
                  defaultValue={dogRecord?.date_entered?.substring(0,10)}
                  onChange={handleOnDateChange}
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
                  checked={option[0].toLowerCase() === (form?.sex || dogRecord?.sex)}
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
                  checked={option.toLowerCase() === (form?.size || dogRecord?.size)}
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
              <UploadImageBtn isLoading={isLoading} setImageUpload={setImageUpload} />
            </div>
            {imageUpload && <ProgressList setLoading={setLoading} form={form} imageUpload={imageUpload} setImageUpload={setImageUpload} setForm={setForm} />}
            {!form?.image_url ? 
                        <div className='image-preview-container'>
                          {!isLoading ? 
                          <div className='image-preview-container'>
                              <img className='dogImage' src={dogRecord.image_url} alt='preview'></img>
                            </div>
                            :
                            <div className='image-preview-container'>
                              <img className='dogImage' src={dogRecord.image_url} alt='preview'></img>
                            </div>
                          }
                        </div>
                    :
                      <div className='image-preview-container'>
                        <img className='dogImage' src={form.image_url} alt='preview'></img>
                      </div>
                    }
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
                  defaultChecked={dogRecord[option]}
                  onClick={handleOnCheck}
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
                    value={form[category] || dogRecord[category]}
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
                name="desc_1"
                defaultValue={dogRecord?.desc_1}
                rows={5}
                onChange={handleOnInputChange} />
            </Form.Group>

            {/* I'm looking for someone who */}
            <Form.Group className="mb-3">
              <Form.Label>I'm looking for someone who...</Form.Label>
              <Form.Control
                as="textarea"
                name="desc_2"
                defaultValue={dogRecord?.desc_2}
                rows={5}
                onChange={handleOnInputChange} />
            </Form.Group>
          
          </Form.Group>
        
          <Button style={{color:'white'}} type="submit" className="mb-2 form-item">Save</Button>

        </Form>
      </div>
      {show && <ShowToast show={show} setShow={setShow} />}
    </div>
  )
  }
}

export function BreedDropdown({ initialBreed, form={}, setForm=()=>{} }) {
  
  // the body of this function minus the handleOnSelection function is nearly the identical to the BreedSearchBar component
  const [dogBreeds, setDogBreeds] = React.useState([])

  // useEffect to get JSON object of dog breed names
  React.useEffect(() => {
    const fetchDogBreeds = async () => {
        const { data, error } = await ApiClient.fetchDogBreeds()
        if (data?.dogBreedNames) {
          // get the usable array of dog breeds - ["Poodle", "Labrador", ...]
          setDogBreeds(data.dogBreedNames)
        }
    }
    fetchDogBreeds()
    }, [])

  // this is to create an array of options that can be used with the react-select Select element
  const dogBreedOptions = dogBreeds.map((breed) => {
    return { value:breed, label:breed }
  })

  const handleOnSelection = (evt) => {
    if (evt.value !== initialBreed) {
      setForm((existingForm) => ({ ...existingForm, breed: evt.value }))
    } else {
      let tempForm = {...form}
      delete tempForm.breed
      setForm(tempForm)
    }
  }

  return (
    <Select
      options={dogBreedOptions}
      defaultValue={ { value:initialBreed, label:initialBreed } }
      onChange={handleOnSelection}
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
          <Toast.Body>Image updated!</Toast.Body>
        </Toast>
    </div>
  );
}
