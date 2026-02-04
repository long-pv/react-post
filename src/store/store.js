// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import optionsReducer from "./options/optionsSlice";

/**
 * Redux store của toàn bộ ứng dụng
 */
const store = configureStore({
	reducer: {
		options: optionsReducer,
	},

	/**
	 * Redux Toolkit đã bao gồm sẵn:
	 * - redux-thunk
	 * - devtools (ở môi trường dev)
	 */
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
