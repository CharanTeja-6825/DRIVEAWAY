import api from '../../api/axios'

export const register = (user) => {
    return api.post("/api/user/register", user)
}

export const login = (user) => {
    return api.post("/api/user/login", user)
}

