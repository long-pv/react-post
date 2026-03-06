import axiosClient from '../../api/axiosClient';
import { apiConfig } from '../../config/apiConfig';

const normalizeArray = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.items)) return payload.items;
    if (Array.isArray(payload?.carts)) return payload.carts;
    return [];
};

export const fetchAllCartsRequest = async () => {
    const response = await axiosClient.get(apiConfig.carts.listPath);
    return normalizeArray(response.data);
};

export const fetchCartsByUserRequest = async (userId) => {
    const path = apiConfig.carts.byUserPath.replace('{userId}', userId);
    const response = await axiosClient.get(path);
    return normalizeArray(response.data);
};

export const createCartRequest = async (payload) => {
    const response = await axiosClient.post(apiConfig.carts.listPath, payload);
    return response.data;
};

export const updateCartRequest = async (cartId, payload) => {
    const response = await axiosClient.put(`${apiConfig.carts.listPath}/${cartId}`, payload);
    return response.data;
};
