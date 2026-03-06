export const apiConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://sandbox.mockerito.com/',
    auth: {
        loginPath: import.meta.env.VITE_AUTH_LOGIN_PATH || '/auth/login',
        registerPath: import.meta.env.VITE_AUTH_REGISTER_PATH || '/auth/register',
        logoutPath: import.meta.env.VITE_AUTH_LOGOUT_PATH || '/auth/logout',
    },
    products: {
        listPath: import.meta.env.VITE_PRODUCTS_PATH || '/products',
    },
    cart: {
        syncPath: import.meta.env.VITE_CART_SYNC_PATH || '/cart',
    },
};
