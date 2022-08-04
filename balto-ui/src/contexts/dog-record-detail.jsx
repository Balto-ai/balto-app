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

    const { dogId } = useParams()
    const { user } = useAuthContext()

    React.useEffect(() => {
        const fetchDogRecord = async () => {
            const { data, error } = await ApiClient.fetchDogRecordById(dogId)
            if (data?.dogRecord) {
                setDogRecord({...data.dogRecord})
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
    }, [user])

    const editDogRecord = async (dogId, updateForm) => {
        const { data, error } = await ApiClient.updateDogRecord(dogId, updateForm)
        if (error) setError(error)
        if (data?.updatedDogRecord) {
            setError(null)
            setDogRecord(data.updatedDogRecord)
        }
    }

    return (
        <DogRecordDetailContext.Provider value={{
            dogRecord, setDogRecord,
            initialized, setInitialized,
            isLoading, setIsLoading,
            error, setError,
            editDogRecord
        }} >
            {children}
        </DogRecordDetailContext.Provider>
    )
}

export const useDogRecordDetailContext = () => {
    return React.useContext(DogRecordDetailContext)
}
