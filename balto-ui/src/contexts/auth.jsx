import * as React from "react"
import ApiClient from "../services/ApiClient"
import axios from 'axios'

const AuthContext = React.createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = React.useState({})
    const [initialized, setInitialized] = React.useState(false)
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [isAuthed, setIsAuthed] = React.useState(false)
    const [userLocation, setUserLocation] = React.useState({})
    const [askForLocation, setAskForLocation] = React.useState(false)

    // on load, fetch user location data for sorting by location and map view
    React.useEffect(() => {
        // get user location coord
        if (askForLocation) {
            navigator.geolocation.getCurrentPosition(locationFound, locationError);
        }
    }, [askForLocation])

    // console.log("location: ", userLocation)


    function locationFound(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        setUserLocation({ "latitude": latitude, "longitude": longitude })
    }

    function locationError(error) {
        const code = error.code;
        const message = error.message;
        // console.log(code, message)
        if (code == 1) {
            getLocation()
        }
    }

    // backup location fetching option using browser IP address
    const getLocation = async () => {
        const { data, error } = await axios.get('https://geolocation-db.com/json/')
        setUserLocation(data)
        alert("Using IP address to approximate location.")
    }

    React.useEffect(() => {

        setInitialized(false)
        setIsProcessing(true)
        
        const fetchUser = async () => {
            const { data, error } = await ApiClient.fetchUserFromToken()
            if (data?.user) {
                setUser(data.user)
                setInitialized(true)
                setIsProcessing(false)
                setError(null)
            }
            if (error) setError(error)
        }

        const token = localStorage.getItem("balto_token")
        if (token) {
            ApiClient.setToken(token)
            setError(null)
            fetchUser()
        } else {
            setInitialized(true)
            setIsProcessing(false)
        }

    }, [isAuthed])



    const validateEmail = (email) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(String(email).toLowerCase())
    }

    const loginUser = async (credentials) => {
        const { data, error } = await ApiClient.login(credentials)
        if (error) setError(error)
        if (data?.user) {
            ApiClient.setToken(data.token)
            setIsAuthed(true)
        }
    }

    const signupUser = async (credentials) => {
        const { data, error } = await ApiClient.signup(credentials)
        if (error) setError(error)
        if (data?.user) {
            ApiClient.setToken(data.token)
            setIsAuthed(true)
        }
    }
    const fetchUserFromToken = async () => {
        const { data, error } = await ApiClient.fetchUserFromToken()
        if (error) setError(error)
        if (data?.user) {
            ApiClient.setToken(data.token)
            setIsAuthed(true)
        }
    }

    const logoutUser = async () => {
        setUser({})
        setError(null)
        // await ApiClient.logout()
        ApiClient.setToken(null)
        localStorage.removeItem(ApiClient.tokenName)
    }

    return (
        <AuthContext.Provider value={{
            user, setUser,
            userLocation, setUserLocation,
            askForLocation, setAskForLocation,
            initialized, setInitialized,
            isProcessing, setIsProcessing,
            error, setError,
            validateEmail,
            loginUser,
            signupUser,
            logoutUser,
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return React.useContext(AuthContext)
}
