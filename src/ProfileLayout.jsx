import { Outlet, useNavigate } from "react-router-dom"
import SideNavBar from "./components/SideNavBar"
import { useUserContext } from "./context/userContext"
import PageLoader from "./components/ui/PageLoader"
import UserProfileContextProvider from "./components/UserProfileContextProvider"

function ProfileLayout() {
    const { loading, userProfile } = useUserContext()
    const navigate = useNavigate()

    // Only show full-page loader if it's the very first time we're fetching user details
    const isInitialLoading = loading && !userProfile?.username

    if (isInitialLoading) {
        return <PageLoader />
    }
    if (!userProfile?.username) {
        navigate("/login")
    }

    return (
        <div className="flex h-[calc(100vh-65px)] w-full overflow-hidden bg-surface">
            <SideNavBar />
            <main className="flex-1 h-full overflow-y-auto">
                <UserProfileContextProvider>
                    <Outlet />
                </UserProfileContextProvider>
            </main>
        </div>
    )
}

export default ProfileLayout