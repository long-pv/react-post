// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import optionsSlice from "./options/optionsSlice";
import postsSlice from "./posts/postsSlice";
import postListSlice from "./posts/postListSlice";
import searchSlice from "./search/searchSlice";

const store = configureStore({
	reducer: {
		options: optionsSlice,
		posts: postsSlice,
		postList: postListSlice,
		search: searchSlice,
	},
});

export default store;
