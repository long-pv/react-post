// src/api/axiosClient.js
import axios from "axios";

/**
 * Axios instance dùng chung cho toàn bộ app
 * Giúp tập trung config HTTP ở một nơi
 */
const axiosClient = axios.create({
	// Base URL của WP REST API
	baseURL: import.meta.env.VITE_API_BASE_URL,

	// Header mặc định cho request JSON
	headers: {
		"Content-Type": "application/json",
	},

	// Tránh request treo quá lâu
	timeout: 10000,
});

/**
 * Interceptor trước khi gửi request
 * - Dùng để thêm token / params chung nếu cần
 */
axiosClient.interceptors.request.use(
	(config) => {
		config.params = config.params || {};

		// Ví dụ thêm auth token sau này
		// const token = localStorage.getItem('token');
		// if (token) {
		//   config.headers.Authorization = `Bearer ${token}`;
		// }

		return config;
	},
	(error) => Promise.reject(error),
);

/**
 * Interceptor xử lý response
 * - Có thể bắt lỗi tập trung
 */
axiosClient.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error),
);

export default axiosClient;
