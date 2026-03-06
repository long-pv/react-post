import axiosClient from '../../api/axiosClient';
import { apiConfig } from '../../config/apiConfig';

const normalizeProductsPayload = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.items)) return payload.items;
    if (Array.isArray(payload?.products)) return payload.products;
    return [];
};

export const fetchProductsRequest = async () => {
    const response = await axiosClient.get(apiConfig.products.listPath);
    return normalizeProductsPayload(response.data);
};

export const createProductRequest = async (payload) => {
    const response = await axiosClient.post(apiConfig.products.listPath, payload);
    return response.data;
};

export const updateProductRequest = async (productId, payload) => {
    const response = await axiosClient.put(`${apiConfig.products.listPath}/${productId}`, payload);
    return response.data;
};

export const deleteProductRequest = async (productId) => {
    const response = await axiosClient.delete(`${apiConfig.products.listPath}/${productId}`);
    return response.data;
};
