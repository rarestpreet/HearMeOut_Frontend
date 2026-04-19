const errorHandler = (message) => {
    console.error("[Error]: ", message)
}

const infoHandler = (message) => {
    console.error("[Info]: ", message)
}

const logging = {
    errorHandler,
    infoHandler
}

export default logging