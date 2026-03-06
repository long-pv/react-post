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
