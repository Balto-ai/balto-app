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
    
        function getAgeGroup(dob) {
            const birthDate = new Date(dob)
            const currentDate = new Date()
            let ageTime = currentDate - birthDate
            let ageDays = Math.floor(ageTime / (1000 * 3600 * 24))
            // following this source for age groupings:
            // https://www.frontiersin.org/articles/10.3389/fvets.2021.643085/full#:~:text=An%20option%20here%20would%20be,11%20years%20as%20Late%2DSenior.
            if (ageDays <= 180) {
                return "Puppy"
            } else if (ageDays > 180 && ageDays <=365) {
                return "Junior"
            } else if (ageDays > 365 && ageDays <= 730) {
                return "Young Adult"
            } else if (ageDays > 730 && ageDays <= 2555) {
                return "Mature Adult"
            } else if (ageDays > 2555 && ageDays <= 4380) {
                return "Senior"
            } else {
                return "Geriatric"
            }
        }
    
    return (
    <DogRecordsContext.Provider value={ {
                                    dogRecords, setDogRecords,
                                    initialized, setInitialized,
                                    isLoading, setIsLoading,
                                    error, setError,
                                    getAgeGroup
                                   } } >
        {children}
    </DogRecordsContext.Provider>
    )
}

export const useDogRecordsContext = () => {
    return React.useContext(DogRecordsContext)
}
