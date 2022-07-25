import React from 'react'
import Select from 'react-select'
import ApiClient from '../../services/ApiClient'
import FilterSearchbar from '../FilterSearchbar/FilterSearchbar'
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
  
  // return a FilterSearchBar component, which is a react-select Select element
  return (
    <FilterSearchbar 
      optionsArr={dogBreeds}
      selectedOptions={selectedBreeds}
      setSelectedOptions={setSelectedBreeds}
      placeholder="Search by breed"
    />
  )
}