import React from 'react'
import Select from 'react-select'
import ApiClient from '../../services/ApiClient'
import './BreedSearchbar.css'

export default function BreedSearchbar() {

  const [dogBreeds, setDogBreeds] = React.useState([])
  const [selectedBreeds, setSelectedBreeds] = React.useState([])
  const [error, setError] = React.useState(null)

  // useEffect to get JSON object of dog breed names
  React.useEffect(() => {
    const fetchDogBreeds = async () => {
        const { data, error } = await ApiClient.fetchDogBreeds()
        if (data?.dogBreeds) {
          // turn the JSON object into a usable array of dog breeds - ["Poodle", "Labrador", ...]
          setDogBreeds(Object.values({ ...data.dogBreeds }))
          setError(null)
        }
        if (error) setError(error)
    }
    fetchDogBreeds()
    }, [])

  // supplies options that will be shown in the returned Select element
  const dogBreedOptions = dogBreeds.map((dogBreed) => 
    {return {value:dogBreed, label:dogBreed}}
  )

  // updates selectedBreeds state var
  const handleSelectionChange = (evt) => {
    setSelectedBreeds( evt.map(breed => breed.value) )
  }
  
  return (
    <Select
      options={dogBreedOptions}
      placeholder="Search by breed"
      value={dogBreedOptions.filter((breedSelector) => selectedBreeds.includes(breedSelector.value))}
      onChange={handleSelectionChange}
      // isMulti allows multiple dog breeds to be selected
      isMulti
     />
  )
}