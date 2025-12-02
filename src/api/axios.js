import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1'; // Adjust if needed

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 (optional: refresh token logic)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            // Handle token expiration here if needed (e.g., refresh token or logout)
            // For now, we'll just reject
        }
        return Promise.reject(error);
    }
);

export default api;
