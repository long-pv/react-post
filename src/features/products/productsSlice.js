import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    createProductRequest,
    deleteProductRequest,
    fetchProductsRequest,
    updateProductRequest,
} from './productsApi';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
    try {
        const data = await fetchProductsRequest();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || error?.message || 'Không lấy được sản phẩm');
    }
});

export const createProduct = createAsyncThunk('products/createProduct', async (payload, thunkAPI) => {
    try {
        return await createProductRequest(payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Thêm sản phẩm thất bại');
    }
});

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ productId, payload }, thunkAPI) => {
        try {
            return await updateProductRequest(productId, payload);
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Cập nhật sản phẩm thất bại');
        }
    }
);

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId, thunkAPI) => {
    try {
        await deleteProductRequest(productId);
        return productId;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Xóa sản phẩm thất bại');
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        mutationStatus: 'idle',
        mutationError: null,
    },
    reducers: {
        clearProductMutationError(state) {
            state.mutationError = null;
        },
    },
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
            })
            .addCase(createProduct.pending, (state) => {
                state.mutationStatus = 'loading';
                state.mutationError = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.mutationStatus = 'succeeded';
                const newItem = action.payload?.id ? action.payload : action.payload?.data;
                if (newItem?.id) {
                    state.items.unshift(newItem);
                }
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.mutationStatus = 'failed';
                state.mutationError = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.mutationStatus = 'loading';
                state.mutationError = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.mutationStatus = 'succeeded';
                const updated = action.payload?.id ? action.payload : action.payload?.data;
                if (!updated?.id) return;
                const index = state.items.findIndex((item) => item.id === updated.id);
                if (index !== -1) {
                    state.items[index] = updated;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.mutationStatus = 'failed';
                state.mutationError = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.mutationStatus = 'loading';
                state.mutationError = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.mutationStatus = 'succeeded';
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.mutationStatus = 'failed';
                state.mutationError = action.payload;
            });
    },
});

export const { clearProductMutationError } = productsSlice.actions;

export default productsSlice.reducer;
