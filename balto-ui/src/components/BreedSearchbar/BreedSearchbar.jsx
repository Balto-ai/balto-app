import React from 'react'
import Select from 'react-select'
import ApiClient from '../../services/ApiClient'
import './BreedSearchbar.css'

export default function BreedSearchbar() {

  const [dogBreeds, setDogBreeds] = React.useState([])
  // const [selectedBreeds, setSelectedBreeds] = React.useState([])
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const fetchDogBreeds = async () => {
        const { data, error } = await ApiClient.fetchDogBreeds()
        if (data?.dogBreeds) {
          setDogBreeds(Object.values({ ...data.dogBreeds }))
          setError(null)
        }
        if (error) setError(error)
    }
    fetchDogBreeds()
    }, [])


  const dogBreedOptions = dogBreeds.map((dogBreed) => 
    {return {value:dogBreed, label:dogBreed}}
  )
  
  return (
    <Select options={dogBreedOptions} />
  )
}