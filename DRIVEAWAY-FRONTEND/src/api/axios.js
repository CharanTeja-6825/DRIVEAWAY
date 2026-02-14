import axios from "axios";
import logout from '../shared/hooks/useLogout'

const api = axios.create({
  baseURL: "http://localhost:2006/",
  withCredentials: true
});


// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token.toString()}`;
//     }
//     return config;
//   },
//   (error) => {
//     if(error.response?.status === 403){
//       logout();
//       window.location.href="/login";
//     }
//     Promise.reject(error)
//   }
// );

export default api;
