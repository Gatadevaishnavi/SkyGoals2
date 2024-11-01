import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/",
})

// Add a request interceptor
 axiosInstance.interceptors.request.use((config) => {
    // Add token to headers if available
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    // Handle request errors
    return Promise.reject(error);
});