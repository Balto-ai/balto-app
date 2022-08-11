import * as React from "react"
import Toast from "react-bootstrap/Toast"

const ComponentContext = React.createContext()

export function ComponentContextProvider({ children }) {

    const [showToast, setShowToast] = React.useState(false)
    const [toastHeader, setToastHeader] = React.useState("Balto")
    const [toastBody, setToastBody] = React.useState("")
    
    function createNewToast(header, body) {
        setToastHeader(header)
        setToastBody(body)
        setShowToast(true)
    }
    
    return (
        <ComponentContext.Provider value={{
            showToast, setShowToast,
            toastHeader, setToastHeader,
            toastBody, setToastBody,
            createNewToast
        }} >
            {children}
        </ComponentContext.Provider>
    )
}

export const useComponentContext = () => {
    return React.useContext(ComponentContext)
}
