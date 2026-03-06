import axiosClient from '../../api/axiosClient';
import { apiConfig } from '../../config/apiConfig';

const normalizeList = (payload) => {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (Array.isArray(payload?.data)) {
        return payload.data;
    }

    if (Array.isArray(payload?.items)) {
        return payload.items;
    }

    return [];
};

export const fetchDashboardData = async () => {
    const responses = await Promise.allSettled(
        apiConfig.dashboardEndpoints.map(async (endpoint) => {
            const response = await axiosClient.get(endpoint.path);
            return {
                key: endpoint.key,
                label: endpoint.label,
                items: normalizeList(response.data),
            };
        })
    );

    return responses.map((result, index) => {
        const endpoint = apiConfig.dashboardEndpoints[index];

        if (result.status === 'fulfilled') {
            return {
                key: endpoint.key,
                label: endpoint.label,
                items: result.value.items,
                error: null,
            };
        }

        return {
            key: endpoint.key,
            label: endpoint.label,
            items: [],
            error: result.reason?.response?.data?.message || result.reason?.message || 'Không lấy được dữ liệu',
        };
    });
};
