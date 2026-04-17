import api from "../util/axiosConfig"
import logging from "../util/logHandler"

const getFeed = async (setLoading) => {
    setLoading(true)

    try {
        const response = await api.get("/")

        return response
    } catch (ex) {
        logging.errorHandler(ex.message ? ex.message : "Network error")

        return ex
    } finally {
        setLoading(false)
    }
}

const loginUser = async (loginRequestData, setLoading, navigate, setUserProfile) => {
    try {
        const response = await api.post("/auth/login", loginRequestData)

        await getUserDetails(setLoading, setUserProfile)
        navigate("/")
    } catch (ex) {
        logging.errorHandler(ex ? ex.response : "Network error")
    } finally {
        setLoading(false)
    }
}

const registerUser = async (registerRequestData, setLoading, navigate) => {
    setLoading(true)

    try {
        const response = await api.post("/auth/register", registerRequestData)

        navigate("/")
    } catch (ex) {
        logging.errorHandler(ex ? ex.response : "Network error")
    } finally {
        setLoading(false)
    }
}

const getUserDetails = async (setLoading, setUserProfile) => {
    setLoading(true)

    try {
        const response = await api.get("/profile")

        setUserProfile(response?.data ? response.data : {})
    } catch (ex) {
        logging.errorHandler(ex ? ex.response : "Network error")
    } finally {
        setLoading(false)
    }
}

const getUserProfile = async (username, setLoading) => {
    setLoading(true)

    try {
        const response = await api.get(`/profile/${username}`)

        return response?.data ? response.data : {}
    } catch (ex) {
        logging.errorHandler(ex.message ? ex.message : "Network error")

        return ex
    } finally {
        setLoading(false)
    }
}

const getUserQuestion = async (username, setLoading) => {
    setLoading(true)

    try {
        const response = await api.get(`/profile/${username}/questions`)

        return response?.data ? response.data : []
    } catch (ex) {
        logging.errorHandler(ex.message ? ex.message : "Network error")

        return ex
    } finally {
        setLoading(false)
    }
}

const getUserAnswer = async (username, setLoading) => {
    setLoading(true)

    try {
        const response = await api.get(`/profile/${username}/answers`)

        return response?.data ? response.data : []
    } catch (ex) {
        logging.errorHandler(ex.message ? ex.message : "Network error")

        return ex
    } finally {
        setLoading(false)
    }
}

const getUserComment = async (username, setLoading) => {
    setLoading(true)

    try {
        const response = await api.get(`/profile/${username}/comments`)

        return response?.data ? response.data : []
    } catch (ex) {
        logging.errorHandler(ex.message ? ex.message : "Network error")

        return ex
    } finally {
        setLoading(false)
    }
}

const terminateSession = async (setLoading, setUserProfile) => {
    setLoading(true)

    try {
        const response = await api.post("/auth/logout")

        setUserProfile({})
    } catch (ex) {
        logging.errorHandler(ex.message ? ex.message : "Network error")

        return ex
    } finally {
        setLoading(false)
    }
}

const getQuestionDetails = async (postId, setLoading) => {
    setLoading(true)

    try {
        const response = await api.get(`/post/${postId}`)

        return response?.data ? response.data : {}
    } catch (ex) {
        logging.errorHandler(ex.message ? ex.message : "Network error")

        return ex
    } finally {
        setLoading(false)
    }
}

const postAnswer = async (postId, body, setLoading) => {
    setLoading(true)

    try {
        const response = await api.post(
            `/post/${postId}/answer`,
            { body }
        )

        return response?.data ? response.data : ""
    } catch (ex) {
        logging.errorHandler(ex.message ? ex.message : "Network error")

        return ex
    } finally {
        setLoading(false)
    }
}

const getAllTags = async (setLoading) => {
    setLoading(true)

    try {
        const response = await api.get(
            "/tag"
        )

        return response?.data ? response.data : []
    } catch (ex) {
        logging.errorHandler(ex.message ? ex.message : "Network error")

        return ex
    } finally {
        setLoading(false)
    }
}

const createNewTag = async (tagData, setLoading) => {
    setLoading(true)

    try {
        const response = await api.post(
            "/tag",
            tagData
        )

        return response?.data ? response.data : ""
    } catch (ex) {
        logging.errorHandler(ex?.response?.data?.message || ex.message || "Network error")

        return ex
    } finally {
        setLoading(false)
    }
}

const postQuestion = async (questionDetails, setLoading) => {
    setLoading(true)

    try {
        const response = await api.post(
            "/post/ask",
            questionDetails
        )

        return response?.data ? response.data : ""
    } catch (ex) {
        logging.errorHandler(ex?.response?.data?.message || ex.message || "Network error")

        return ex
    } finally {
        setLoading(false)
    }
}

const postComment = async (commentDetails, setLoading) => {
    setLoading(true)

    try {
        const response = await api.post(
            "/comment",
            commentDetails
        )

        return response?.data ? response.data : ""
    } catch (ex) {
        logging.errorHandler(ex?.response?.data?.message || ex.message || "Network error")

        return ex
    } finally {
        setLoading(false)
    }
}

const checkHealthPing = async () => {
    return await api.get("/health")
}

const checkHealthSendCookie = async () => {
    return await api.post("/health/cors")
}

const checkHealthCors = async () => {
    return await api.get("/health/cors")
}

const apiCall = {
    getFeed,
    loginUser,
    registerUser,
    getUserDetails,
    getUserProfile,
    getUserAnswer,
    getUserComment,
    getUserQuestion,
    terminateSession,
    getQuestionDetails,
    postAnswer,
    getAllTags,
    createNewTag,
    postQuestion,
    postComment,
    checkHealthPing,
    checkHealthSendCookie,
    checkHealthCors
}

export default apiCall