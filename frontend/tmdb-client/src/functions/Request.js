import axios from "axios";

const urlApi = "http://localhost:4500/api/"

const get = async (url, conf = null) => {
    try {
        const result = await axios.get(urlApi+url, conf)
        return result
    } catch (err) {
        return { error: true, message: err.message, data: err.response ? err.response.data : null }
    }
}

const post = async (url, data, conf = null) => {
    try {
        const result = await axios.post(urlApi+url, data, conf)
        return result
    } catch (err) {
        return { error: true, message: err.message, data: err.response ? err.response.data : null }
    }
}

export default { get, post }