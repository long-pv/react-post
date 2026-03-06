import { createSlice } from '@reduxjs/toolkit';

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

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadInitialCart(),
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
    },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
