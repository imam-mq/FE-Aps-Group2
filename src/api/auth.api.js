import axiosClient from "./axiosClient";

export const authApi = {
    login: async (username, password) => {
        const res = await axiosClient.post("/auth/login", { username, password });
        return res.data;
    },
    
    register: async (data) => {
        const res = await axiosClient.post("/auth/register", data);
        return res.data;
    },

    forgotPassword: async (email) => {
        const res = await axiosClient.post("/auth/forgot-password", { email });
        return res.data;
    },

    resetPassword: async (token, password) => {
        const res = await axiosClient.post("/auth/reset-password", { token, password });
        return res.data;
    },
};