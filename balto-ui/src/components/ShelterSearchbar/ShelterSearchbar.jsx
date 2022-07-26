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
        const { data, error } = await ApiClient.fetchShelters()
        if (data?.shelters) {
          // get the usable array of shelters [ { id:, name } ]
          setShelters(data.shelters)
          console.log(shelters)
          setError(null)
        }
        if (error) setError(error)
    }
    fetchShelters()
    }, [])

  // this is to create an array of options that can be used with the react-select Select element
  const shelterOptions = shelters.map((shelter) => {
    return { value:shelter.id, label:shelter.name }
  })
  
  // return a FilterSearchBar component, which is a react-select Select element
  return (
    <FilterSearchbar
      optionsArr={shelterOptions}
      selectedOptions={selectedShelters}
      setSelectedOptions={setSelectedShelters}
      placeholder="Search by shelter"
    />
  )
}