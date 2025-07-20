import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Set the base URL for all requests
});

// This "interceptor" runs before every request is sent
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
