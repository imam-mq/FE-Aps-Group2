import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        
        const isLoginRequest = error.config?.url?.includes("/auth/login");

        if (error.response?.status === 401 && !isLoginRequest) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
        }
        const message = error.response?.data?.error || error.message || "Request Gagal";
        return Promise.reject(new Error(message));
    }
);

export default axiosClient;