import * as React from "react"
import ApiClient from "../services/ApiClient"

const PublicImagesContext = React.createContext()

export function PublicImagesContextProvider({ children }) {

    const [images, setImages] = React.useState([])
    const [initialized, setInitialized] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [receivedNewImage, setReceivedNewImage] = React.useState(false)


    React.useEffect(() => {
        const fetchImages = async () => {
            const { data, error } = await ApiClient.fetchAllImages()
            if (data) {
                setImages([...data])
                setError(null)
            }
            if (error) setError(error)
        }
        fetchImages()
        setIsLoading(false)
        setInitialized(true)
    }, [receivedNewImage])

    const fetchImagebyId = async (imageId, dogId) => {
        setReceivedNewImage(false)
        const { data, error } = await ApiClient.fetchImagebyId(imageId, dogId)
        if (error) setError(error)
        if (data) {
            setError(false)
            setReceivedNewImage(true)
        }
    }

    return (
        <PublicImagesContext.Provider value={{
            images, setImages,
            initialized, setInitialized,
            isLoading, setIsLoading,
            error, setError,
            receivedNewImage, setReceivedNewImage,
            fetchImagebyId

        }} >
            {children}
        </PublicImagesContext.Provider>
    )
}

export const usePublicImagesContext = () => {
    return React.useContext(PublicImagesContext)
}
