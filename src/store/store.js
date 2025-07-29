// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import optionsSlice from "./options/optionsSlice";
// import postsSlice from "./posts/postsSlice";
// import postListSlice from "./posts/postListSlice";
// import searchSlice from "./search/searchSlice";
import pageSlice from "./page/pageSlice";

const store = configureStore({
	reducer: {
		options: optionsSlice,
		// posts: postsSlice,
		// postList: postListSlice,
		// search: searchSlice,
		page: pageSlice,
	},
});

export default store;
