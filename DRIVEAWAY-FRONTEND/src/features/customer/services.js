import api from "../../api/axios";

export const getUserByEmail = (email) => {
    return api.get(`/api/customer/${email}`);
}

export const submitRequest = (application) => {
    return api.post('/api/customer/add', application);
}

export const applicationStatus = (id) => {
    return api.get(`/api/customer/status/${id}`);
}