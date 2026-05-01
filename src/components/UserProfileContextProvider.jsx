import { useEffect, useState } from "react"
import { userProfileContext } from "../context/userProfileContext"
import apiCall from "../services/apiCall"
import { useUserContext } from "../context/userContext"

function UserProfileContextProvider({ children }) {
    const [userProfile, setUserProfile] = useState({
        userId: 0,
        username: "",
        email: "",
        reputation: 0,
        createdAt: "",
        operable: false,
        isAccountVerified: false,
        isAccountTerminated: false
    })
    const [loading, setLoading] = useState(true)

    const contextValue = {
        loading, setLoading,
        userProfile, setUserProfile
    }

    const { userProfile: loggedInUser } = useUserContext()

    useEffect(() => {
        if (!loggedInUser?.username) { return }
        const fetchUserDetails = async () => {
            await apiCall.getUserProfile(loggedInUser?.username, setLoading, setUserProfile)
        }
        fetchUserDetails()
    }, [loggedInUser])

    return (
        <userProfileContext.Provider value={contextValue}>
            {children}
        </userProfileContext.Provider>
    )
}

export default UserProfileContextProvider