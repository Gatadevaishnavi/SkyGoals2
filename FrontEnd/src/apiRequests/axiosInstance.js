import axios from "axios";
const backEndUrl = "https://skygoalbackend-0lb3.onrender.com/api";
export const axiosInstance = axios.create({
  baseURL: backEndUrl,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token to headers if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
