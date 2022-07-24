import React from 'react'
import TrieSearch from 'trie-search'
import ApiClient from '../../services/ApiClient'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import './BreedSearchbar.css'

export default function BreedSearchbar() {

  const [dogBreeds, setDogBreeds] = React.useState({})
  const [breedQuery, setBreedQuery] = React.useState()
  const [selectedBreeds, setSelectedBreeds] = React.useState([])
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const fetchDogBreeds = async () => {
        const { data, error } = await ApiClient.fetchDogBreeds()
        if (data?.message) {
          setDogBreeds({ ...data.message })
          setError(null)
        }
        if (error) setError(error)
    }
    fetchDogBreeds()
    }, [])

  const trie = new TrieSearch()
  trie.addFromObject(dogBreeds)

  return (
    <Dropdown>
      <Dropdown.Toggle
        as="input"
        placeholder="Search for a breed..."
          onChange={(evt)=>setBreedQuery(evt.target.value)}
      />

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>

        {/* {Object.entries(dogBreeds).map((breedEntry, idx) => {
            const [breedCategory, breedTypes] = breedEntry
            return <Dropdown.Item key={idx+breedCategory+breedTypes}>{breedCategory +"/"+ breedTypes}</Dropdown.Item>
          })
        } */}

        {Object.entries(dogBreeds).map((breedEntry, idx) => {
            const [breedCategory, breedTypes] = breedEntry
            if (breedTypes.length === 0) {
              return <Dropdown.Item key={idx+breedCategory}>{breedCategory}</Dropdown.Item>
            } else { 
              breedTypes.map(breedType => {
                return <Dropdown.Item key={idx+breedCategory+breedType}>{breedType}</Dropdown.Item>
            })
            }
        })}


      </Dropdown.Menu>
    </Dropdown>

  )
  return (
    <Form className="d-flex hello">
    <Form.Control
      type="search"
      placeholder="Search breeds"
      className="me-2"
      aria-label="Search"
    />
  </Form>

  )

  return (
    <div class="form-group">
        <input list="jobroles" name="role" />
        <datalist id="jobroles">
            <option value="PHP" />
            <option value=".NET" />
            <option value="PYTHON" />
            <option value="C" />
            <option value="ABAP" />
        </datalist>
    </div>
  )
}


export function TESTSEARCH () {
  return (
    <Form className="d-flex hello">
    <Form.Control
      type="search"
      placeholder="Search breeds"
      className="me-2"
      aria-label="Search"
    />
  </Form>
  )
}