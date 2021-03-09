export default {
    error: (error) => error?.response?.data
                        ?.split('\n')?.[0]
                        ?.replace("System.Exception: ", "")
                        || "Unexpected error"
}