export default {

    error: (error) => {
        
        if (error?.response?.status == 401) return "Unauthorized user"
        return error?.response?.data
                        ?.split('\n')?.[0]
                        ?.replace("System.Exception: ", "")
                        || "Unexpected error"
    },

    data: (response) => {
        if (response?.data) {
            return { data : response.data, errorMsg : null }
        } else {
            return { data: null, errorMsg: "Error parsing server response" }
        }
    },

    dateParam: (date) => date.substring(1, date.length - 1)
}