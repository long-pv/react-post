import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// Gọi API tìm kiếm
export const searchPosts = createAsyncThunk("search/searchPosts", async (keyword) => {
	const response = await axiosClient.get("/wp-json/wp/v2/posts", {
		params: {
			search: keyword,
			per_page: 12,
			_embed: true,
		},
	});
	return response.data;
});

const searchSlice = createSlice({
	name: "search",
	initialState: {
		data: [],
		loading: false,
		error: null,
	},
	reducers: {
		clearSearchResults: (state) => {
			state.data = [];
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchPosts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(searchPosts.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loading = false;
			})
			.addCase(searchPosts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
