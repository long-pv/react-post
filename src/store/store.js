// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import optionsSlice from "./options/optionsSlice";
import postsSlice from "./posts/postsSlice";

const store = configureStore({
	reducer: {
		options: optionsSlice,
		posts: postsSlice,
	},
});

export default store;
