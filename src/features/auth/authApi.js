import axiosClient from '../../api/axiosClient';
import { authConfig } from '../../config/authConfig';

export const loginRequest = async (payload) => {
    const response = await axiosClient.post(authConfig.loginPath, payload);
    return response.data;
};

export const registerRequest = async (payload) => {
    const response = await axiosClient.post(authConfig.registerPath, payload);
    return response.data;
};

export const logoutRequest = async () => {
    const response = await axiosClient.post(authConfig.logoutPath);
    return response.data;
};
