import React, { createContext } from "react";
import { useEffect } from "react";
import ApiClient from "../services/ApiClient"
import { useAuthContext } from "./auth";

const dogProfileContext = createContext()

export function dogProfileContextProvider({ children }) {
    const [dogInfo, setDogInfo] = useState({})
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const { user } = useAuthContext()
    const { dogId } = useParams()

    // useEffect(() => {
    //     const getDog = async () => {
    //         setIsLoading(true)
    //         const { data, error } = await ApiClient.fetchDogById(dogId)
    //         if (data?.dog) {
    //             setDogInfo(data.dog[0])
    //         }
    //         if (error) {
    //             setError(error)
    //             console.log("error: ", error)
    //         }
    //         setIsLoading(false)
    //     }
    //     getDog()
    // }, [])







}