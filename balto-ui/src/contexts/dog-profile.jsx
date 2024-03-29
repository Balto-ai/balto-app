import { React, createContext, useContext, useEffect, useState } from "react";
import ApiClient from "../services/ApiClient"
import { useParams } from 'react-router-dom';


const DogProfileContext = createContext()

export function DogProfileContextProvider({ children }) {

    const [dogInfo, setDogInfo] = useState({})
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [milestones, setMilestones] = useState({})
    const { dogId } = useParams()

    useEffect(() => {
        const getDog = async () => {
            setIsLoading(true)
            const { data, error } = await ApiClient.fetchDogById(dogId)
            if (data?.dog) {
                setDogInfo(data.dog[0])
            }
            if (error) {
                setError(error)
            }
            setIsLoading(false)
        }

        const getMilestones = async () => {
            setIsLoading(true)
            const { data, error } = await ApiClient.fetchMilestones(dogId)
            if (data) {
                setMilestones(data)
            }
            if (error) {
                setError(error)
            }
            setIsLoading(false)
        }

        getDog()
        getMilestones()

    }, [])

    function getAgeGroup(dob) {
        const birthDate = new Date(dob)
        const currentDate = new Date()
        let ageTime = currentDate - birthDate
        let ageDays = Math.floor(ageTime / (1000 * 3600 * 24))
        // following this source for age groupings:
        // https://www.frontiersin.org/articles/10.3389/fvets.2021.643085/full#:~:text=An%20option%20here%20would%20be,11%20years%20as%20Late%2DSenior.
        if (ageDays <= 180) {
            return "Puppy"
        } else if (ageDays > 180 && ageDays <= 365) {
            return "Junior"
        } else if (ageDays > 365 && ageDays <= 730) {
            return "Young Adult"
        } else if (ageDays > 730 && ageDays <= 2555) {
            return "Mature Adult"
        } else if (ageDays > 2555 && ageDays <= 4380) {
            return "Senior"
        } else {
            return "Seasoned"
        }
    }

    return (
        <DogProfileContext.Provider value={{
            dogInfo, setDogInfo,
            milestones, setMilestones,
            initialized, setInitialized,
            isLoading, setIsLoading,
            error, setError,
            dogId,
            getAgeGroup
        }} >
            {children}
        </DogProfileContext.Provider>
    )
}


export const useDogProfileContext = () => {
    return useContext(DogProfileContext)
}



