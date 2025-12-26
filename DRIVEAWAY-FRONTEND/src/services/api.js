import axios from 'axios';

const BASE_URL = 'http://localhost:2006';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Admin APIs
export const adminAPI = {
  getStatistics: () => api.get('/admin/stats'),
  approveDealer: (dealerId) => api.put(`/admin/approve?did=${dealerId}`),
};

// Customer APIs
export const customerAPI = {
  addCustomer: (customer) => api.post('/customer/add', customer),
  getAllCustomers: () => api.get('/customer/all'),
  deleteCustomer: (customerId) => api.delete(`/customer/delete/${customerId}`),
};

// Dealer APIs
export const dealerAPI = {
  addDealer: (dealer) => api.post('/dealer/add', dealer),
  getAllDealers: () => api.get('/dealer/all'),
  deleteDealer: (dealerId) => api.delete(`/dealer/delete/${dealerId}`),
  approveBooking: (bookingId) => api.put(`/dealer/approve?bid=${bookingId}`),
};

// Car APIs
export const carAPI = {
  addCar: (car) => api.post('/car/add', car),
  getAllCars: () => api.get('/car/all'),
  deleteCar: (carId) => api.delete(`/car/delete/${carId}`),
};

// Booking APIs
export const bookingAPI = {
  addBooking: (booking) => api.post('/booking/add', booking),
  getAllBookings: () => api.get('/booking/all'),
  deleteBooking: (bookingId) => api.delete(`/booking/delete/${bookingId}`),
};

export default api;
