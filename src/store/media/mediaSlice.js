import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// Async thunk to get image data by ID, only id + source_url
export const getImageById = createAsyncThunk("media/getImageById", async (id) => {
	const response = await axiosClient.get(`/wp-json/wp/v2/media/${id}?_fields=id,source_url`);
	return response.data; // { id, source_url }
});

const mediaSlice = createSlice({
	name: "media",
	initialState: {
		data: {}, // { [id]: source_url }
		loading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getImageById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getImageById.fulfilled, (state, action) => {
				state.loading = false;
				const { id, source_url } = action.payload;
				state.data[id] = source_url;
			})
			.addCase(getImageById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default mediaSlice.reducer;
