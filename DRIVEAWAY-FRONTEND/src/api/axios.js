import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:2006/'
})

export default api