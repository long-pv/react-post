// src/store/postList/postListSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const getPaginatedPosts = createAsyncThunk("postList/getPaginatedPosts", async (page = 1) => {
	const response = await axiosClient.get("/wp-json/wp/v2/posts", {
		params: {
			per_page: 12,
			page,
			_embed: true,
		},
	});

	return {
		data: response.data,
		totalPages: parseInt(response.headers["x-wp-totalpages"] || 1),
	};
});

const postListSlice = createSlice({
	name: "postList",
	initialState: {
		data: [],
		loading: false,
		error: null,
		totalPages: 1,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getPaginatedPosts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getPaginatedPosts.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload.data;
				state.totalPages = action.payload.totalPages;
			})
			.addCase(getPaginatedPosts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default postListSlice.reducer;
