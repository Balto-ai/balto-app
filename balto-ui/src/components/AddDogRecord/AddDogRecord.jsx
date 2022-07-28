import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import ApiClient from '../../services/ApiClient'
import BreedSearchbar from '../BreedSearchbar/BreedSearchbar'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { BsX } from "react-icons/bs"
import "./AddDogRecord.css"

export default function AddDogRecord() {

  const navigate = useNavigate()

  const [form, setForm] = React.useState( { email: "",
                                            password: ""
                                          })
  const [error, setError] = React.useState(null)
  const [isValidated, setIsValidated] = React.useState(false)

  const handleOnInputChange = (evt) => {
    // update form state var with input value
    setForm((existingForm) => ({ ...existingForm, [evt.target.name]: evt.target.value }))
  }

  const handleOnFormSubmit = async (evt) => {
    evt.preventDefault()
    setIsValidated(true)
    const addDogRecordForm = evt.currentTarget
    if (addDogRecordForm.checkValidity() === false) {
      evt.stopPropagation()
    } else {
      await ApiClient.createDogRecord(form)
      navigate("/admin-dashboard")
    }
  }

  return (
    <div className="add-record-form">
      <div className="add-record-card">
        <h2 className="mb-3">Add New Dog</h2>
        <Form className="form" noValidate validated={isValidated} onSubmit={handleOnFormSubmit}>
          {error ? <Alert className="form-item" variant='danger'><BsX height="32px" /> {error}</Alert> : null}
          <Form.Group controlId="validationCustom01" className="form-item">
            <FloatingLabel controlId="floatingNameInput" label="Name" className="mb-3">
              <Form.Control
                name="name"
                type="text"
                onChange={handleOnInputChange}
                required
                placeholder="Name" 
                className="form-input" />
            <Form.Control.Feedback type="invalid">Please enter a name</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <BreedSearchbar isMulti={false}/>
          </Form.Group>
        
          <Button type="submit" className="mb-2 form-item">Add</Button>
        </Form>

      </div>
    </div>
  )
}