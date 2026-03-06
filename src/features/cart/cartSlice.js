import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { USER_KEY } from '../../constants/storageKeys';
import { extractUserIdFromToken } from '../../utils/authToken';
import {
    createCartRequest,
    deleteCartRequest,
    fetchAllCartsRequest,
    fetchCartByIdRequest,
    fetchCartsByUserRequest,
    patchCartRequest,
    updateCartRequest,
} from './cartApi';

const CART_STORAGE_KEY = 'shopping_cart';

const loadInitialCart = () => {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

const persistCart = (items) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

const normalizeProducts = (items = []) =>
    items.map((item) => ({
        productId: Number(item.productId || item.id),
        quantity: Number(item.quantity || 1),
    }));

const resolveUserIdFromState = (state) => {
    const storedUserRaw = localStorage.getItem(USER_KEY);
    const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

    return (
        state.auth.user?.id ||
        state.auth.user?.userId ||
        storedUser?.id ||
        storedUser?.userId ||
        extractUserIdFromToken(state.auth.token) ||
        null
    );
};

export const fetchAllCarts = createAsyncThunk('cart/fetchAllCarts', async (params, thunkAPI) => {
    try {
        return await fetchAllCartsRequest(params || {});
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data?.detail || error?.response?.data?.message || 'Không lấy được carts'
        );
    }
});

export const fetchCartById = createAsyncThunk('cart/fetchCartById', async (cartId, thunkAPI) => {
    try {
        return await fetchCartByIdRequest(cartId);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data?.detail || error?.response?.data?.message || 'Không lấy được cart theo id'
        );
    }
});

export const fetchMyCarts = createAsyncThunk('cart/fetchMyCarts', async (userId, thunkAPI) => {
    try {
        return await fetchCartsByUserRequest(userId);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data?.detail || error?.response?.data?.message || 'Không lấy được cart của user'
        );
    }
});

export const fetchOwnCarts = createAsyncThunk('cart/fetchOwnCarts', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    const resolvedUserId = resolveUserIdFromState(state);

    if (!token || !resolvedUserId) {
        return thunkAPI.rejectWithValue('Bạn cần đăng nhập để xem cart của mình');
    }

    try {
        return await fetchCartsByUserRequest(resolvedUserId);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data?.detail || error?.response?.data?.message || 'Không lấy được cart của user'
        );
    }
});

export const syncCart = createAsyncThunk('cart/syncCart', async (options, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    const items = state.cart.items;
    const forceCreate = Boolean(options?.forceCreate);
    const resolvedUserId = resolveUserIdFromState(state);

    if (!token || !resolvedUserId) {
        return thunkAPI.rejectWithValue('Cần đăng nhập để đồng bộ cart lên server');
    }

    try {
        const existingCarts = await fetchCartsByUserRequest(resolvedUserId);
        const payload = {
            userId: resolvedUserId,
            date: new Date().toISOString(),
            products: normalizeProducts(items),
        };

        if (!forceCreate && existingCarts.length > 0 && existingCarts[0].id) {
            return await updateCartRequest(existingCarts[0].id, payload);
        }

        return await createCartRequest(payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data?.detail || error?.response?.data?.message || 'Sync cart thất bại'
        );
    }
});

export const patchServerCart = createAsyncThunk('cart/patchServerCart', async ({ cartId, payload }, thunkAPI) => {
    try {
        return await patchCartRequest(cartId, payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data?.detail || error?.response?.data?.message || 'Patch cart thất bại'
        );
    }
});

export const deleteServerCart = createAsyncThunk('cart/deleteServerCart', async (cartId, thunkAPI) => {
    try {
        await deleteCartRequest(cartId);
        return cartId;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data?.detail || error?.response?.data?.message || 'Xóa cart thất bại'
        );
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadInitialCart(),
        serverCarts: [],
        selectedServerCart: null,
        status: 'idle',
        error: null,
        syncStatus: 'idle',
        syncMessage: null,
    },
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const existing = state.items.find((item) => item.id === product.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({
                    id: product.id,
                    title: product.title || product.name || `Product #${product.id}`,
                    price: Number(product.price || product.cost || 0),
                    image: product.image || product.thumbnail || null,
                    quantity: 1,
                });
            }

            persistCart(state.items);
        },
        removeFromCart(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload);
            persistCart(state.items);
        },
        updateCartQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find((cartItem) => cartItem.id === id);
            if (!item) return;
            item.quantity = Math.max(1, quantity);
            persistCart(state.items);
        },
        clearCart(state) {
            state.items = [];
            persistCart(state.items);
        },
        clearSyncMessage(state) {
            state.syncMessage = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCarts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllCarts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.serverCarts = action.payload;
            })
            .addCase(fetchAllCarts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchCartById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCartById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedServerCart = action.payload;
            })
            .addCase(fetchCartById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchMyCarts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMyCarts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.serverCarts = action.payload;
            })
            .addCase(fetchMyCarts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchOwnCarts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchOwnCarts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.serverCarts = action.payload;
            })
            .addCase(fetchOwnCarts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(syncCart.pending, (state) => {
                state.syncStatus = 'loading';
                state.syncMessage = null;
                state.error = null;
            })
            .addCase(syncCart.fulfilled, (state, action) => {
                state.syncStatus = 'succeeded';
                state.syncMessage = 'Đồng bộ giỏ hàng thành công';
                state.serverCarts = [
                    action.payload,
                    ...state.serverCarts.filter((cart) => cart.id !== action.payload?.id),
                ];
            })
            .addCase(syncCart.rejected, (state, action) => {
                state.syncStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(patchServerCart.pending, (state) => {
                state.syncStatus = 'loading';
                state.error = null;
            })
            .addCase(patchServerCart.fulfilled, (state, action) => {
                state.syncStatus = 'succeeded';
                state.syncMessage = 'Patch cart thành công';
                const patched = action.payload;
                if (!patched?.id) return;
                const idx = state.serverCarts.findIndex((item) => item.id === patched.id);
                if (idx !== -1) {
                    state.serverCarts[idx] = patched;
                }
            })
            .addCase(patchServerCart.rejected, (state, action) => {
                state.syncStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteServerCart.pending, (state) => {
                state.syncStatus = 'loading';
                state.error = null;
            })
            .addCase(deleteServerCart.fulfilled, (state, action) => {
                state.syncStatus = 'succeeded';
                state.syncMessage = 'Xóa cart server thành công';
                state.serverCarts = state.serverCarts.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteServerCart.rejected, (state, action) => {
                state.syncStatus = 'failed';
                state.error = action.payload;
            });
    },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart, clearSyncMessage } =
    cartSlice.actions;

export default cartSlice.reducer;
