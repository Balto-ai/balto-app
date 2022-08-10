import React from 'react'
import ApiClient from "../services/ApiClient"
import { useAuthContext } from "./auth"
import { useState } from "react"
import { useContext } from 'react'

const StarredContext = React.createContext()

export function StarredContextProvider({ children }) {

    const [starredList, setStarredList] = useState([])
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const { user, setAskForLocation } = useAuthContext()

    React.useEffect(() => {
        const fetchedStarredList = async () => {
            const { data, error } = await ApiClient.fetchStarredDogs()
            if (data?.starredDogs) {
                setStarredList([...data.starredDogs])
                setError(null)
            }
            if (error) setError(error)
        }

        if (user?.email) {
            setIsLoading(true)
            setError(null)
            fetchedStarredList()
        }
        setIsLoading(false)
        setInitialized(true)
        setAskForLocation(true)
    }, [user])

    return (
        <StarredContext.Provider value={{
            starredList, setStarredList,
            initialized, setInitialized,
            isLoading, setIsLoading,
            error, setError,
        }} >
            {children}
        </StarredContext.Provider>
    )
}

export const useStarredContext = () => {
    return useContext(StarredContext)
}
