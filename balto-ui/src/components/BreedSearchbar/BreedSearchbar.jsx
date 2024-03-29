import React from 'react'
import ApiClient from '../../services/ApiClient'
import FilterSearchbar from '../FilterSearchbar/FilterSearchbar'
import './BreedSearchbar.css'

export default function BreedSearchbar({ isMulti=true, selectedBreeds=[], setSelectedBreeds=()=>{}, placeholder="Search by breed" }) {

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
  
  // return a FilterSearchBar component, which is a react-select Select element
  return (
    <FilterSearchbar
      isMulti={isMulti}
      optionsArr={dogBreedOptions}
      selectedOptions={selectedBreeds}
      setSelectedOptions={setSelectedBreeds}
      placeholder={placeholder}
    />
  )
}