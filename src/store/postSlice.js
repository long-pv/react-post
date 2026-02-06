import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

/**
 * Async thunk dùng để gọi API lấy danh sách bài viết mới nhất
 * Redux Toolkit sẽ tự tạo 3 action:
 * - pending   → đang gọi API
 * - fulfilled → gọi thành công
 * - rejected  → gọi thất bại
 */
export const fetchLatestPosts = createAsyncThunk("posts/fetchLatestPosts", async (limit = 4, { rejectWithValue }) => {
	try {
		/**
		 * Gọi WordPress REST API
		 * Endpoint:
		 *  /wp-json/wp/v2/posts
		 */
		const response = await axiosClient.get("/wp-json/wp/v2/posts", {
			params: {
				per_page: limit, // số bài viết
				_embed: true, // lấy thêm ảnh, author...
			},
		});

		// axios trả data nằm trong response.data
		return response.data;
	} catch (error) {
		/**
		 * rejectWithValue giúp truyền lỗi
		 * về reducer để xử lý
		 */
		return rejectWithValue(error.response?.data || error.message);
	}
});

/**
 * Tạo slice cho posts
 * → Quản lý state liên quan tới bài viết
 */
const postSlice = createSlice({
	name: "posts",

	/**
	 * State ban đầu
	 */
	initialState: {
		latest: [], // danh sách bài viết mới nhất
		loading: false,
		error: null,
	},

	/**
	 * reducers thường dùng cho action sync
	 * (hiện chưa cần)
	 */
	reducers: {},

	/**
	 * extraReducers dùng để xử lý asyncThunk
	 */
	extraReducers: (builder) => {
		builder
			/**
			 * Khi bắt đầu gọi API
			 */
			.addCase(fetchLatestPosts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})

			/**
			 * Khi gọi API thành công
			 */
			.addCase(fetchLatestPosts.fulfilled, (state, action) => {
				state.loading = false;
				state.latest = action.payload;
			})

			/**
			 * Khi gọi API thất bại
			 */
			.addCase(fetchLatestPosts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default postSlice.reducer;
