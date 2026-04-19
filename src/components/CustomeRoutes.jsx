import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../context/userContext"

export function AdminOnly() {
    const { userProfile } = useUserContext()

    if (userProfile?.role === "ADMIN") {
        return <Outlet />
    }

    return <Navigate to="/" replace />
}