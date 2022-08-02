import * as React from "react"
import { useParams } from "react-router-dom"
import ApiClient from "../services/ApiClient"
import { useAuthContext } from "./auth"

const DogRecordDetailContext = React.createContext()

export function DogRecordDetailContextProvider({ children }) {

    const [dogRecord, setDogRecord] = React.useState([])
    const [initialized, setInitialized] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const [updatedDogRecord, setUpdatedDogRecord] = React.useState(false)

    const { dogId } = useParams()
    const { user } = useAuthContext()

    React.useEffect(() => {
        const fetchDogRecord = async () => {
            const { data, error } = await ApiClient.fetchDogRecordById(dogId)
            if (data?.dogRecord) {
                setDogRecord([...data.dogRecord][0])
                setError(null)
            }
            if (error) setError(error)
        }

        if (user?.email && user?.shelterId) {
            setIsLoading(true)
            setError(null)
            fetchDogRecord()
        }
        setIsLoading(false)
        setInitialized(true)
    }, [user, updatedDogRecord])

    const editDogRecord = async (dogId, updateForm) => {
        const { data, error } = await ApiClient.updateDogRecord(dogId, updateForm)
        if (error) setError(error)
        if (data) {
            setError(null)
            setUpdatedDogRecord(true)
        }
    }

    return (
        <DogRecordDetailContext.Provider value={{
            dogRecord, setDogRecord,
            initialized, setInitialized,
            isLoading, setIsLoading,
            error, setError,
            updatedDogRecord, setUpdatedDogRecord,
            editDogRecord
        }} >
            {children}
        </DogRecordDetailContext.Provider>
    )
}

export const useDogRecordDetailContext = () => {
    return React.useContext(DogRecordDetailContext)
}
