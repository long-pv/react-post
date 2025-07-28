import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// 3 bài viết mới nhất (footer)
export const getLatestPosts = createAsyncThunk("posts/getLatestPosts", async () => {
	const response = await axiosClient.get("/wp-json/wp/v2/posts?per_page=3&_fields=id,title");
	return response.data;
});

// 10 bài viết mới nhất (trang chủ)
export const getLatestHomePosts = createAsyncThunk("posts/getLatestHomePosts", async () => {
	const response = await axiosClient.get("/wp-json/wp/v2/posts", {
		params: {
			per_page: 10,
			_embed: true,
		},
	});
	return response.data;
});

// post content details
export const getPostById = createAsyncThunk("posts/getPostById", async (id) => {
	const response = await axiosClient.get(`/wp-json/wp/v2/posts/${id}?_embed=true`);
	return response.data;
});

const postsSlice = createSlice({
	name: "posts",
	initialState: {
		// 3 bài viết mới nhất (footer)
		data: [],
		loading: false,
		error: null,
		// 10 bài viết mới nhất (trang chủ)
		dataHome: [],
		loadingHome: false,
		errorHome: null,
		// post content details
		dataPostDetails: [],
		loadingPostDetails: false,
		errorPostDetails: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		// 3 bài viết mới nhất (footer)
		builder
			.addCase(getLatestPosts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getLatestPosts.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loading = false;
			})
			.addCase(getLatestPosts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});

		// 10 bài viết mới nhất (trang chủ)
		builder
			.addCase(getLatestHomePosts.pending, (state) => {
				state.loadingHome = true;
				state.errorHome = null;
			})
			.addCase(getLatestHomePosts.fulfilled, (state, action) => {
				state.dataHome = action.payload;
				state.loadingHome = false;
			})
			.addCase(getLatestHomePosts.rejected, (state, action) => {
				state.loadingHome = false;
				state.errorHome = action.error.message;
			});

		// post content details
		builder
			.addCase(getPostById.pending, (state) => {
				state.loadingPostDetails = true;
				state.errorPostDetails = null;
			})
			.addCase(getPostById.fulfilled, (state, action) => {
				state.dataPostDetails = action.payload;
				state.loadingPostDetails = false;
			})
			.addCase(getPostById.rejected, (state, action) => {
				state.loadingPostDetails = false;
				state.errorPostDetails = action.error.message;
			});
	},
});

export default postsSlice.reducer;
