import api from '../../api/axios';

export const addCar = (payload) => {
    return api.post("/api/dealer/add/car", payload);
}

export const getCarsByDealer = (id) => {
    return api.get(`/api/dealer/cars/${id}`);
}

export const getBookings = (dealerId) => {
    return api.get(`/api/dealer/get/bookings?dealerId=${dealerId}`);
}

export const validateBooking = (bookingId, approval) => {
    return api.put(`/api/dealer/approve/booking/${bookingId}?approval=${approval}`);
}