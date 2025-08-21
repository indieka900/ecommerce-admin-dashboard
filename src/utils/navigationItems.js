import {
    Dashboard,
    Inventory,
    People,
    ShoppingCart,
    Analytics,
    Settings,
    Add,
    Category,
    Business,
    Store,
    Article,
    Receipt,
    TrendingUp,
    Assignment
} from '@mui/icons-material';

export const navigationItems = [
    {
        title: 'Dashboard',
        icon: Dashboard,
        path: '/dashboard',
        color: '#6366f1'
    },
    {
        title: 'Products',
        icon: Inventory,
        color: '#f59e0b',
        children: [
            {
                title: 'Product List',
                icon: Inventory,
                path: '/products',
                color: '#f59e0b'
            },
            {
                title: 'Categories',
                icon: Category,
                path: '/categories',
                color: '#3b82f6'
            },
            {
                title: 'Brands',
                icon: Business,
                path: '/brands',
                color: '#8b5cf6'
            }
        ]
    },
    {
        title: 'Orders',
        icon: ShoppingCart,
        color: '#ef4444',
        badge: 12,
        children: [
            {
                title: 'All Orders',
                icon: Receipt,
                path: '/orders',
                color: '#ef4444'
            },
            // {
            //     title: 'Pending Orders',
            //     icon: Assignment,
            //     path: '/orders?status=Pending',
            //     color: '#f59e0b',
            //     badge: 8 
            // },
            {
                title: 'Order Analytics',
                icon: TrendingUp,
                path: '/orders/analytics',
                color: '#10b981'
            }
        ]
    },
    {
        title: 'Customers',
        icon: People,
        path: '/customers',
        color: '#06b6d4'
    },
    {
        title: 'Analytics',
        icon: Analytics,
        color: '#84cc16',
        children: [
            {
                title: 'Overview',
                icon: Dashboard,
                path: '/analytics',
                color: '#84cc16'
            },
            {
                title: 'Sales Analytics',
                icon: TrendingUp,
                path: '/analytics/sales',
                color: '#10b981'
            },
            {
                title: 'Customer Analytics',
                icon: People,
                path: '/analytics/customers',
                color: '#06b6d4'
            }
        ]
    },
    {
        title: 'Blogs',
        icon: Article,
        color: '#8b5cf6',
        children: [
            {
                title: 'Blog List',
                icon: Article,
                path: '/blog',
                color: '#8b5cf6'
            },
            {
                title: 'Blog Categories',
                icon: Category,
                path: '/blog/categories',
                color: '#3b82f6'
            }
        ]
    },
    {
        title: 'Settings',
        icon: Settings,
        path: '/settings',
        color: '#6b7280'
    }
];