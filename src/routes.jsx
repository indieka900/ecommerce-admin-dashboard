import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectectedRoute';
import AdminLayout from './components/common/Layout/AdminLayout';

// Pages
import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Products from './pages/Products';
// import Categories from './pages/Categories';
// import Orders from './pages/Orders';
// import Customers from './pages/Customers';
// import Transactions from './pages/Transactions';
// import Blog from './pages/Blog';
// // import Reviews from './pages/Reviews';
// import Settings from './pages/Settings';

// Error pages
// import NotFound from './pages/NotFound';
// import Unauthorized from './pages/Unauthorized';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        // children: [
        //     {
        //         index: true,
        //         element: <Navigate to="/dashboard" replace />
        //     },
        //     {
        //         path: 'dashboard',
        //         element: <Dashboard />
        //     },
        //     {
        //         path: 'products',
        //         element: <Products />
        //     },
        //     {
        //         path: 'categories',
        //         element: <Categories />
        //     },
        //     {
        //         path: 'orders',
        //         element: <Orders />
        //     },
        //     {
        //         path: 'customers',
        //         element: <Customers />
        //     },
        //     {
        //         path: 'transactions',
        //         element: <Transactions />
        //     },
        //     {
        //         path: 'blog',
        //         element: <Blog />
        //     },
        //     {
        //         path: 'reviews',
        //         element: <Reviews />
        //     },
        //     {
        //         path: 'settings',
        //         element: (
        //             <ProtectedRoute requiredRole="admin">
        //                 <Settings />
        //             </ProtectedRoute>
        //         )
        //     }
        // ]
    },
    // {
    //     path: '/unauthorized',
    //     element: <Unauthorized />
    // },
    // {
    //     path: '*',
    //     element: <NotFound />
    // }
]);

export default router;
