import api from '../../api/axios';

export const addCar = (payload) => {
    return api.post("/api/dealer/add/car", payload);
}

export const getCarsByDealer = (id) => {
    return api.get(`/api/dealer/cars/${id}`);
}