import api from "../../api/axios";

export const getUserByEmail = (email) => {
    return api.get(`/api/customer/${email}`);
}