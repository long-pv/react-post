// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add interceptor để tự thêm ?ver=timestamp vào tất cả request
// axiosClient.interceptors.request.use((config) => {
// 	if (!config.params) {
// 		config.params = {};
// 	}
// 	config.params.ver = Date.now();
// 	return config;
// });

export default axiosClient;
