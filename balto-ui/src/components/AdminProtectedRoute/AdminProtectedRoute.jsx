import * as React from "react"
import { useAuthContext } from "../../contexts/auth"
import Loading from "../Loading/Loading"
import AccessForbidden from "../AccessForbidden/AccessForbidden"

export default function AdminProtectedRoute( {element} ) {
  const { initialized, isProcessing, user } = useAuthContext()

  // if no user and application is not currently loading
  if (!initialized || isProcessing) {
    return (
      <Loading />
    )
    } else if (initialized && user?.email && user?.shelterId) {
    return (
      element
  )} else {
    return (
      <AccessForbidden />
    )
  }
}