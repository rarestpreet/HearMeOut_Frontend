import { createContext, useContext } from "react"

// move loading and global state to diff contenxt
export const userContext = createContext({
    userProfile: {
        userId: "",
        username: "",
        isAccountVerified: false
    },
    setUserProfile: () => { },
    loading: false,
    setLoading: () => { }
})

export const useUserContext = () => useContext(userContext)