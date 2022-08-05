import * as React from "react"
import ApiClient from "../services/ApiClient"
import { useAuthContext } from "./auth"
const ImagesContext = React.createContext()


export function ImagesContextProvider({ children }) {
    // const {currentDog} = useDogRecordDetailContext()
    const [images, setImages] = React.useState([])
    const [initialized, setInitialized] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [dogId, setDogId] = React.useState(null)
    const [receivedNewImage, setReceivedNewImage] = React.useState(false)
    const { user } = useAuthContext()

    console.log(dogId)
    React.useEffect(() => {
        const fetchImages = async () => {
            const { data, error } = await ApiClient.fetchAllImages(dogId)
            if (data) {
                console.log(data?.images)
                setImages(data?.images)
                setError(null)
            }
            if (error) setError(error)
        }

        if (user?.email && user?.shelterId) {
            setIsLoading(true)
            setError(null)
            if (dogId){
                fetchImages()
            }
        }
        setIsLoading(false)
        setInitialized(true)
    }, [user, receivedNewImage, dogId])

    const createImage = async (imageInformation) => {
        setReceivedNewImage(false)
        const { data, error } = await ApiClient.createImage(imageInformation)
        if (error) setError(error)
        if (data) {
            setError(false)
            setReceivedNewImage(true)
        }
    }
    
    const fetchImagebyId = async (imageId, dogId) => {
        setReceivedNewImage(false)
        const { data, error } = await ApiClient.fetchImagebyId(imageId, dogId)
        if (error) setError(error)
        if (data) {
            setError(false)
            setReceivedNewImage(true)
        }
    }
    const deleteImage = async (imageId, dogId) => {
        setReceivedNewImage(false)
        const { data, error } = await ApiClient.deleteImage(imageId, dogId)
        if (error) setError(error)
        if (data) {
            setError(false)
            setReceivedNewImage(true)
        }
    }

    return (
        <ImagesContext.Provider value={{
            images, setImages,
            initialized, setInitialized,
            isLoading, setIsLoading,
            error, setError,
            receivedNewImage, setReceivedNewImage,
            createImage,
            deleteImage,
            fetchImagebyId,
            dogId,
            setDogId

        }} >
            {children}
        </ImagesContext.Provider>
    )
}

export const useImageContext = () => {
    return React.useContext(ImagesContext)
}
