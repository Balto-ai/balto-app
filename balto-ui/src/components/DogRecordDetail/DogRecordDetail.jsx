import React from 'react'
import { Link, useParams } from "react-router-dom"
import ApiClient from "../../services/ApiClient"
import { useAuthContext } from '../../contexts/auth'
import { Rating, Typography } from '@mui/material'
import EmptyBone from "../Icon/EmptyBone"
import FilledBone from "../Icon/FilledBone"
import "./DogRecordDetail.css"

export default function DogRecordDetail() {

  const { dogId } = useParams()
  const { user } = useAuthContext()

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [dogRecord, setDogRecord] = React.useState({})

  const ratings = { // keys used for providing the form attribute to be updated, values used as labels
    playfulness: "Playfulness",
    energyLevel: "Energy Level",
    exerciseNeeds: "Exercise Needs"
  }

  // useEffect to get the row in the dog table
  React.useEffect(() => {
    const getDogRecord = async () => {
      setIsLoading(true)
        const { data, error } = await ApiClient.fetchDogRecordById(dogId)
        if (data?.dogRecord) {
          setDogRecord(data.dogRecord)
        }
        if (error) setError(error)
      setIsLoading(false)
    }
    if (user?.email && user?.shelterId) {
      getDogRecord()
    }
  }, [])

  // gets the data, only showing a string of the dog record object at this point
  // TODO: finish up what gets returned: training feed, modal to update training, ability to edit record
  return (
    <div className="dog-record-detail primary-container">
      <div className="main-top-header">
        <img src={dogRecord.image_url} className="dog-image" alt={`Image of ${dogRecord.name}`}></img>
        <div className="main-top-header-info">
          <h1>{dogRecord.name}</h1>
          <p>Breed: {dogRecord.breed}</p>
          <p>Sex: {dogRecord.sex}</p>
        </div>
      </div>

      {Object.keys(ratings).map((category, idx) => (
        <div className="rating" key={idx}>
          <p key={idx}>{ratings[category]}</p>
          <Rating
            name={category}
            defaultValue={dogRecord[category]}
            icon={<FilledBone fontSize="inherit" />}
            emptyIcon={<EmptyBone fontSize="inherit" />}
            getLabelText={(value) => `Rating ${value}`}
            readOnly />
        </div>
      ))}

      <p>DOB: {(new Date(dogRecord.dob)).toLocaleDateString()}</p>
      <p>Date Entered: {(new Date(dogRecord.date_entered)).toLocaleDateString()}</p>
      <p>Breed: {dogRecord.breed}</p>

    
      {/* This goes to a dedicated preview route; could be good if we want an "Exit Preview" button */}
      {/* <Button variant="primary" href={`${dogRecord.id}/preview`}>View Public Profile</Button> */}

      {/* This one just links to the dog page that you can get to from the search page */}
      <Link className="btn" to={`/dog/${dogRecord.id}`}>View Public Profile</Link>

      <div>{JSON.stringify(dogRecord)}</div>
    </div>
  )
}