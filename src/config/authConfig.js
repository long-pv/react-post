export const authConfig = {
    loginPath: import.meta.env.VITE_AUTH_LOGIN_PATH || '/auth/login',
    registerPath: import.meta.env.VITE_AUTH_REGISTER_PATH || '/auth/register',
    logoutPath: import.meta.env.VITE_AUTH_LOGOUT_PATH || '/auth/logout',
};
