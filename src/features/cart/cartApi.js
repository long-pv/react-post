import axiosClient from '../../api/axiosClient';
import { apiConfig } from '../../config/apiConfig';

const normalizeArray = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.items)) return payload.items;
    if (Array.isArray(payload?.carts)) return payload.carts;
    return [];
};

const normalizeObject = (payload) => payload?.data || payload;

export const fetchAllCartsRequest = async (params = {}) => {
    const response = await axiosClient.get(apiConfig.carts.listPath, { params });
    return normalizeArray(response.data);
};

export const fetchCartByIdRequest = async (cartId) => {
    const response = await axiosClient.get(`${apiConfig.carts.listPath}/${cartId}`);
    return normalizeObject(response.data);
};

export const fetchCartsByUserRequest = async (userId) => {
    const path = apiConfig.carts.byUserPath.replace('{userId}', userId);
    const response = await axiosClient.get(path);
    return normalizeArray(response.data);
};

export const createCartRequest = async (payload) => {
    const response = await axiosClient.post(apiConfig.carts.listPath, payload);
    return normalizeObject(response.data);
};

export const updateCartRequest = async (cartId, payload) => {
    const response = await axiosClient.put(`${apiConfig.carts.listPath}/${cartId}`, payload);
    return normalizeObject(response.data);
};

export const patchCartRequest = async (cartId, payload) => {
    const response = await axiosClient.patch(`${apiConfig.carts.listPath}/${cartId}`, payload);
    return normalizeObject(response.data);
};

export const deleteCartRequest = async (cartId) => {
    const response = await axiosClient.delete(`${apiConfig.carts.listPath}/${cartId}`);
    return normalizeObject(response.data);
};
