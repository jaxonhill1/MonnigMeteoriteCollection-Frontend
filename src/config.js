export const apiBaseUrl = 'http://localhost:8080/api/v1';

import axios from 'axios';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
