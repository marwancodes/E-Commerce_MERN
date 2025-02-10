import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/auth/AuthContext"


const ProtectedRoute = () => { // we use it like route middleware to protect routes

    const { isAuthenticated } = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/login" replace={true}/>
    }

  return (
    <Outlet />
  )
}

export default ProtectedRoute