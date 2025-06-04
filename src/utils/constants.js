export const API_ENDPOINTS = {
    // Auth endpoints
    LOGIN: '/accounts/user/login/',
    LOGOUT: '/auth/logout/',
    REFRESH_TOKEN: '/token/refresh/',
    PROFILE: '/accounts/user/profile/',
    CHANGE_PASSWORD: '/accounts/user/change-password/',
    FORGOT_PASSWORD: '/accounts/user/password-reset/',
    RESET_PASSWORD: '/accounts/user/password-reset-confirm/',

    // Product endpoints
    PRODUCTS: '/products/',
    PRODUCT_CATEGORIES: '/categories/',

    // Blog endpoints
    BLOGS: '/blogs/blogs',
    COMMENTS: '/blogs/comments',
    BLOG_CATEGORIES: '/blogs/blogs/categories',

    // Order endpoints
    ORDERS: '/orders/',
    ORDER_STATS: '/orders/stats/',

    // Customer endpoints
    CUSTOMERS: '/customers/',
    CUSTOMER_STATS: '/customers/stats/',

    // Transaction endpoints
    TRANSACTIONS: '/transactions/',


    // Review endpoints
    REVIEWS: '/reviews/',

    // Settings endpoints
    SETTINGS: '/settings/',
    SLIDERS: '/sliders/',
};

export const USER_ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    MANAGER: 'manager',
    EDITOR: 'editor'
};

export const ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded'
};

export const PAYMENT_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded'
};
