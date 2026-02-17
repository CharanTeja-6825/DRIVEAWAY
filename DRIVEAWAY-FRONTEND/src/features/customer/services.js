import api from "../../api/axios";

export const getUserByEmail = (email) => {
  return api.get(`/api/customer/${email}`);
};

export const submitRequest = (application) => {
  return api.post("/api/customer/add", application);
};

export const applicationStatus = (id) => {
  return api.get(`/api/customer/status/${id}`);
};

export const getCars = () => {
  return api.get("/api/customer/get/cars");
};

export const createBooking = (payload) => {
  return api.post("/api/customer/add/booking", payload);
};

export const getCustomerBookings = (id) => {
  return api.get(`/api/customer/bookings?customerId=${id}`);
};

export const cancelBooking = (id) => {
  return api.post(`/api/customer/cancel/booking?bookingId=${id}`);
};

export const createOrder = (order) => {
  return api.post("/api/customer/create/order", order);
};

export const updateCustomerProfile = (payload) => {
  // TODO: Replace placeholder path with the actual update endpoint.
  return api.post("/api/customer/profile", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const verfiyOrder = (orderId, paymentId, signature) => {
  return api.post("/api/customer/verify", {
    orderId: orderId,
    paymentId: paymentId,
    signature: signature,
  });
};
