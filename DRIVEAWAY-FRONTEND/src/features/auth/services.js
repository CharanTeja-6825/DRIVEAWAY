import api from "../../api/axios";

const AUTH_BASE = "/api/user"; // Update if your backend exposes different auth routes

export const register = (user) => api.post(`${AUTH_BASE}/register`, user);

export const login = (user) => api.post(`${AUTH_BASE}/login`, user);

export const logout = () => api.post(`${AUTH_BASE}/logout`);

