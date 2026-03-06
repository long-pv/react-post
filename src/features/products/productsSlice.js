import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductsRequest } from './productsApi';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
    try {
        const data = await fetchProductsRequest();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || error?.message || 'Không lấy được sản phẩm');
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default productsSlice.reducer;
