import * as React from "react"
import ApiClient from "../services/ApiClient"
import { useAuthContext } from "./auth"

const AdoptionInquiriesContext = React.createContext()

export function AdoptionInquiriesContextProvider({ children }) {

    const [allAdoptionInquiries, setAllAdoptionInquiries] = React.useState([])
    const [initialized, setInitialized] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    
    const { user } = useAuthContext()

    React.useEffect(() => {
        const fetchAllAdoptionInquiries = async () => {
            const { data, error } = await ApiClient.fetchAllInquiries()
            if (data?.allAdoptionInquiries) {
                setAllAdoptionInquiries([...data.allAdoptionInquiries])
                setError(null)
            }
            if (error) setError(error)
        }

        if (user?.email && user?.shelterId) {
            setIsLoading(true)
            setError(null)
            fetchAllAdoptionInquiries()
        }
        setIsLoading(false)
        setInitialized(true)
    }, [user])


    return (
        <AdoptionInquiriesContext.Provider value={{
            allAdoptionInquiries, setAllAdoptionInquiries,
            initialized, setInitialized,
            isLoading, setIsLoading,
            error, setError
        }} >
            {children}
        </AdoptionInquiriesContext.Provider>
    )
}

export const useAdoptionInquiriesContext = () => {
    return React.useContext(AdoptionInquiriesContext)
}
