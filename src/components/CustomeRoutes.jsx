import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../context/userContext"

export function AdminOnly() {
    const { userProfile } = useUserContext()

    if (userProfile.roles.includes("ADMIN")) {
        return <Outlet />
    }

    return <Navigate to="/" replace />
}