import React from 'react'
import Select from 'react-select'
import TrieSearch from 'trie-search'
import ApiClient from '../../services/ApiClient'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import './BreedSearchbar.css'

const dogBreedsJsonData = require('../../data/breed_info.json')

export default function BreedSearchbar() {

  // const [dogBreeds, setDogBreeds] = React.useState({})
  // const [breedQuery, setBreedQuery] = React.useState()
  // const [selectedBreeds, setSelectedBreeds] = React.useState([])
  // const [error, setError] = React.useState(null)

  const dogBreeds = Object.keys(dogBreedsJsonData.dog_breeds)

  const dogBreedOptions = dogBreeds.map((dogBreed) => 
    {return {value:dogBreed, label:dogBreed}}
  )
  
  return (
    <Select options={dogBreedOptions} />
  )
  
  // return (
  //   <Dropdown>
  //     <Dropdown.Toggle
  //       as="input"
  //       placeholder="Search for a breed..."
  //         onChange={(evt)=>setBreedQuery(evt.target.value)}
  //     />

  //     <Dropdown.Menu>        
  //       {dogBreeds.map((breed) => {
  //           return <Dropdown.Item key={breed}>{breed}</Dropdown.Item>
  //         })
  //       }
  //     </Dropdown.Menu>
  //   </Dropdown>

  // )
}

  // React.useEffect(() => {
  //   const fetchDogBreeds = async () => {
  //       const { data, error } = await ApiClient.fetchDogBreeds()
  //       if (data?.message) {
  //         setDogBreeds({ ...data.message })
  //         setError(null)
  //       }
  //       if (error) setError(error)
  //   }
  //   fetchDogBreeds()
  //   }, [])