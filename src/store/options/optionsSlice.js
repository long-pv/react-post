import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const getOptions = createAsyncThunk("options/getOptions", async () => {
	const response = await axiosClient.get("/wp-json/options/all");
	return response.data;
});

const optionsSlice = createSlice({
	name: "options",
	initialState: {
		data: null,
		loading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOptions.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getOptions.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(getOptions.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default optionsSlice.reducer;
