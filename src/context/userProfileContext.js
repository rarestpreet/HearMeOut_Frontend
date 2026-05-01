import { createContext, useContext } from "react";

export const userProfileContext = createContext({
    userProfile: {
        userId: 0,
        username: "",
        email: "",
        reputation: 0,
        createdAt: "",
        operable: false,
        isAccountVerified: false,
        isAccountTerminated: false
    },
    onProfileEdit: () => { },
    onProfileDelete: () => { }
})

export const useUserProfileContext = () => useContext(userProfileContext)