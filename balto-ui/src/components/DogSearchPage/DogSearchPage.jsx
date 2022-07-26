import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import BreedSearchbar from '../BreedSearchbar/BreedSearchbar'
import ShelterSearchbar from '../ShelterSearchbar/ShelterSearchbar'

export default function DogSearchPage() {

  // options that will show up on the filters, not used for anything else
  const sizeOptions = ["Small", "Medium", "Large"]
  const genderOptions = ["Male", "Female"]
  const goodWithOptions = ["Kids", "Strangers", "Other pets"]
  const distanceOptions = ["5 miles", "10 miles", "15 miles"]

  const [selectedBreeds, setSelectedBreeds] = React.useState([])
  const [selectedShelters,  setSelectedShelters] = React.useState([])

  return (
    <div className="filter-sidebar">
      <Accordion alwaysOpen>

        {/* breed filter (dropdown search) */}
        <Accordion.Item eventKey="breed">
          <Accordion.Header>Breed</Accordion.Header>
          <Accordion.Body>
            <BreedSearchbar selectedBreeds={selectedBreeds} setSelectedBreeds={setSelectedBreeds} />
          </Accordion.Body>
        </Accordion.Item>

        {/* size filter (checkboxes) */}
        <Accordion.Item eventKey="size">
          <Accordion.Header>Size</Accordion.Header>
          <Accordion.Body>
            <Form>
              {sizeOptions.map((option) => (
                <div key={option} className="mb-3">
                  <Form.Check type='checkbox' id={option} label={option} />
                </div>
              ))}
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        {/* gender filter (checkboxes) */}
        <Accordion.Item eventKey="gender">
          <Accordion.Header>Gender</Accordion.Header>
          <Accordion.Body>
            <Form>
              {genderOptions.map((option) => (
                <div key={option} className="mb-3">
                  <Form.Check type='checkbox' id={option} label={option} />
                </div>
              ))}
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        {/* good with filter (checkboxes) */}
        <Accordion.Item eventKey="good-with">
          <Accordion.Header>Good With</Accordion.Header>
          <Accordion.Body>
            <Form>
              {goodWithOptions.map((option) => (
                <div key={option} className="mb-3">
                  <Form.Check type='checkbox' id={option} label={option} />
                </div>
              ))}
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        {/* distance filter (radio buttons) */}
        <Accordion.Item eventKey="distance">
          <Accordion.Header>Distance</Accordion.Header>
          <Accordion.Body>
            <Form>
            <Form.Select aria-label="distance-select">
              <option value={null}>Anywhere</option>
              <option value={5}>Within 5 miles</option>
              <option value={10}>Within 10 miles</option>
              <option value={3}>Within 15 miles</option>
            </Form.Select>
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        {/* shelter filter (dropdown search) */}
        <Accordion.Item eventKey="shelter">
          <Accordion.Header>Shelter</Accordion.Header>
          <Accordion.Body>
            <ShelterSearchbar selectedShelters={selectedShelters} setSelectedShelters={setSelectedShelters} />
          </Accordion.Body>
        </Accordion.Item>


      </Accordion>
    </div>
  )
}
