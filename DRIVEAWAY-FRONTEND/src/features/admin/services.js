import api from "../../api/axios";

export const getAllUsers = () => {
    return api.get("/api/admin/all");
}