import api from '../../api/axios';

export const addCar = (payload) => {
    return api.post("/api/dealer/add/car", payload);
}