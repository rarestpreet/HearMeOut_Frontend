import { useEffect, useState } from "react"
import { userContext } from "../context/userContext"
import apiCall from "../services/apiCall"

function UserContextProvider({ children }) {
    const [userProfile, setUserProfile] = useState({
        userId: "",
        username: "",
        isAccountActive: false
    })
    const [loading, setLoading] = useState(false)

    const contextValue = {
        loading, setLoading,
        userProfile, setUserProfile
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            await apiCall.getUserDetails(setLoading, setUserProfile)
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