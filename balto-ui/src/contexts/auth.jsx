import * as React from "react"
import ApiClient from "../services/ApiClient"

const AuthContext = React.createContext()

export function AuthContextProvider( {children} ) {
    const [user, setUser] = React.useState({})
    const [initialized, setInitialized] = React.useState(false)
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [isAuthed, setIsAuthed] = React.useState(false)

    React.useEffect(() => {
        const fetchUser = async () => {
          const { data, error } = await ApiClient.fetchUserFromToken()
          if (data?.user) {
            setUser(data.user)
            setError(null)
          }
          if (error) setError(error)
        }

        const token = localStorage.getItem("balto_token")
        if (token) {
            ApiClient.setToken(token)
            setIsProcessing(true)
            setError(null)
            fetchUser()
        }
        setIsProcessing(false)
        setInitialized(true)
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
    <AuthContext.Provider value={ { user, setUser,
                                    initialized, setInitialized,
                                    isProcessing, setIsProcessing,
                                    error, setError,
                                    validateEmail,
                                    loginUser,
                                    signupUser,
                                    logoutUser,
                                   } } >
        {children}
    </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return React.useContext(AuthContext)
}
