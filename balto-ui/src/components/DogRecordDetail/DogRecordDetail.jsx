import React from 'react'
import { useParams } from "react-router-dom"
import ApiClient from "../../services/ApiClient"
import "./DogRecordDetail.css"

export default function DogRecordDetail() {

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [dogRecord, setDogRecord] = React.useState({})

  const { dogId } = useParams()

  // TODO: redirect to anauthorized page if the user isn't a shelter admin user
  // TODO: handle what happens on the frontend when a user doesn't have access to the record

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
    getDogRecord();
  }, []);

  // gets the data, only showing a string of the dog record object at this point
  // TODO: finish up what gets returned: training feed, modal to update training, ability to edit record
  return (
    <div>{JSON.stringify(dogRecord)}</div>
  )
}