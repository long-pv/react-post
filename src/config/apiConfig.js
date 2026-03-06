export const apiConfig = {
    dashboardEndpoints: [
        {
            key: 'posts',
            label: 'Bài viết',
            path: import.meta.env.VITE_DASHBOARD_POSTS_PATH || '/posts',
        },
        {
            key: 'users',
            label: 'Người dùng',
            path: import.meta.env.VITE_DASHBOARD_USERS_PATH || '/users',
        },
    ],
};
