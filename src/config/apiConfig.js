export const apiConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://sandbox.mockerito.com',
    auth: {
        loginPath: import.meta.env.VITE_AUTH_LOGIN_PATH || '/api/auth/login',
        registerPath: import.meta.env.VITE_AUTH_REGISTER_PATH || '/api/users',
        logoutPath: import.meta.env.VITE_AUTH_LOGOUT_PATH || '/api/auth/logout',
    },
    products: {
        listPath: import.meta.env.VITE_PRODUCTS_PATH || '/ecommerce/api/products',
        categoriesPath:
            import.meta.env.VITE_PRODUCT_CATEGORIES_PATH || '/ecommerce/api/products/categories',
        byCategoryPath:
            import.meta.env.VITE_PRODUCTS_BY_CATEGORY_PATH || '/ecommerce/api/products/category/{category}',
    },
    carts: {
        listPath: import.meta.env.VITE_CARTS_PATH || '/ecommerce/api/carts',
        byUserPath: import.meta.env.VITE_CARTS_BY_USER_PATH || '/ecommerce/api/carts/user/{userId}',
    },
};
