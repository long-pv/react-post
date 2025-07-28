// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import optionsSlice from "./options/optionsSlice";
import postsSlice from "./posts/postsSlice";
import postListSlice from "./posts/postListSlice";

const store = configureStore({
	reducer: {
		options: optionsSlice,
		posts: postsSlice,
		postList: postListSlice,
	},
});

export default store;
