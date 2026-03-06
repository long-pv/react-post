import axios from 'axios';
import { ACCESS_TOKEN_KEY } from '../constants/storageKeys';
import { apiConfig } from '../config/apiConfig';

const axiosClient = axios.create({
    baseURL: apiConfig.baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
