import React from 'react'
import { useParams } from "react-router-dom"
import ApiClient from "../../services/ApiClient"
import "./DogRecordDetail.css"

export default function DogRecordDetail() {

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [dogRecord, setDogRecord] = React.useState({})

  const { dogId } = useParams()

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

  return (
    <div>{JSON.stringify(dogRecord)}</div>
  )
}