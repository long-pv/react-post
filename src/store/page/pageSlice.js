import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// Async thunk to get page data by ID
export const getPageById = createAsyncThunk("page/getPageById", async (id) => {
	const response = await axiosClient.get(`/wp-json/wp/v2/pages/${id}?_fields=id,acf,yoast_head_json`);
	return response.data;
});

const pageSlice = createSlice({
	name: "page",
	initialState: {
		data: null,
		loading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPageById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getPageById.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(getPageById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default pageSlice.reducer;
