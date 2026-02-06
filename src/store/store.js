import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";

/**
 * Tạo Redux Store
 * Store là nơi lưu TOÀN BỘ state của app
 */
const store = configureStore({
	reducer: {
		/**
		 * posts là tên state
		 * → dùng trong useSelector: state.posts
		 */
		posts: postReducer,
	},
});

/**
 * Export default
 * → để file khác import đơn giản hơn
 */
export default store;
