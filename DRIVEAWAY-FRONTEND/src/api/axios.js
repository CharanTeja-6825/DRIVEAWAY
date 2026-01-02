import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:2006/'
})

// api.interceptors.request.use((config) => {
//     token = localStorage.getItem("token");
//     if(token){
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// },
//     (error) => Promise.reject(error)
// );

export default api