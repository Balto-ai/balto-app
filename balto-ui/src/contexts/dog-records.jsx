import * as React from "react"
import ApiClient from "../services/ApiClient"
import { useAuthContext } from "./auth"

const DogRecordsContext = React.createContext()

export function DogRecordsContextProvider( {children} ) {

    const [dogRecords, setDogRecords] = React.useState([])
    const [initialized, setInitialized] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const { user } = useAuthContext()

    React.useEffect(() => {
        const fetchDogRecords = async () => {
            const { data, error } = await ApiClient.fetchDogRecords()
            if (data?.dogRecords) {
              setDogRecords([ ...data.dogRecords ])
              setError(null)
            }
            if (error) setError(error)
        }

        if (user?.email) {
            setIsLoading(true)
            setError(null)
            fetchDogRecords()
        }
        setIsLoading(false)
        setInitialized(true)
        }, [user])
    
    return (
    <DogRecordsContext.Provider value={ {
                                    dogRecords, setDogRecords,
                                    initialized, setInitialized,
                                    isLoading, setIsLoading,
                                    error, setError
                                   } } >
        {children}
    </DogRecordsContext.Provider>
    )
}

export const useDogRecordsContext = () => {
    return React.useContext(DogRecordsContext)
}
