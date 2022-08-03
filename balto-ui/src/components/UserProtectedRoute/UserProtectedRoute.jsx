import * as React from "react"
import { useAuthContext } from "../../contexts/auth"
import AccessForbidden from "../AccessForbidden/AccessForbidden"

export default function UserProtectedRoute( {element} ) {
  const { initialized, user } = useAuthContext()

  // if no user and application is not currently loading
  if (initialized && user?.email) {
  return (
    element
  )} else {
    return (
      <AccessForbidden />
    )
  }
}