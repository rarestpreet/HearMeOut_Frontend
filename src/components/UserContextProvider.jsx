import { useEffect, useState } from "react"
import { userContext } from "../context/userContext"
import apiCall from "../services/apiCall"

function UserContextProvider({ children }) {
    const [userProfile, setUserProfile] = useState({
        userId: 0,
        username: "",
        accountVerified: false,
        role: "",
    })
    const [loading, setLoading] = useState(true)

    const contextValue = {
        loading, setLoading,
        userProfile, setUserProfile
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await apiCall.getUserDetails(setLoading, setUserProfile)
        }

        fetchUserDetails()
    }, [])

    return (
        <userContext.Provider value={contextValue}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider