import React from 'react'
import ApiClient from '../../services/ApiClient'
import FilterSearchbar from '../FilterSearchbar/FilterSearchbar'
import './ShelterSearchbar.css'

export default function ShelterSearchbar({selectedShelters=[], setSelectedShelters=()=>{}}) {

  const [shelters, setShelters] = React.useState([])
  const [error, setError] = React.useState(null)

  // useEffect to get JSON object of shelter names
  React.useEffect(() => {
    const fetchShelters = async () => {
        const { data, error } = await ApiClient.fetchDogBreeds()
        if (data?.dogBreedNames) {
          // get the usable array of shelters - ["Shelter 1", "Shelter 2", ...]
          setShelters(data.dogBreedNames)
          setError(null)
        }
        if (error) setError(error)
    }
    fetchShelters()
    }, [])
  
  // return a FilterSearchBar component, which is a react-select Select element
  return (
    <FilterSearchbar 
      optionsArr={shelters}
      selectedOptions={selectedShelters}
      setSelectedOptions={setSelectedShelters}
      placeholder="Search by shelter"
    />
  )
}