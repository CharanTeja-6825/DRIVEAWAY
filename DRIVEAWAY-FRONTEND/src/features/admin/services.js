import api from "../../api/axios";

export const getAllUsers = () => {
    return api.get("/api/admin/all");
}

export const getAllApplications = () => {
    return api.get("/api/admin/applications");
}

export const approveDealer = (id) => {
    return api.post(`/api/admin/approve/${id}`);
}