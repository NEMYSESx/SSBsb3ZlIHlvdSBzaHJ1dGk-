import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:4000/api/v1" : "/api/v1",
    withCredentials: true,
});

// Add request/response interceptors for debugging
axiosInstance.interceptors.request.use(config => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, config);
    return config;
}, error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
    console.log('API Response:', response);
    return response;
}, error => {
    console.error('API Response Error:', error.response || error);
    return Promise.reject(error);
});