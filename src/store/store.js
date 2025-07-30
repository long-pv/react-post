// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import optionsSlice from "./options/optionsSlice";

const store = configureStore({
	reducer: {
		options: optionsSlice,
	},
});

export default store;
