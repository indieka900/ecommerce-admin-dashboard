import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectectedRoute';
import AdminLayout from './components/common/Layout/AdminLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import AddAdmin from './pages/AddAdmin';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Brands from './pages/Brands';
// import Customers from './pages/Customers';
// import Transactions from './pages/Transactions';
import Blog from './pages/Blog';
import BlogCategories from './pages/BlogCategories';
import OrdersList from './pages/Orders';
import OrdersDashboard from './pages/OrderDashboard';
import OrderDetails from './pages/OrderDetail';
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
        path: '/forgot-password',
        element: <ForgotPassword />
    },
    {
        path: '/reset-password/:uid/:token',
        element: <ResetPassword />
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />
            },
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'change-password',
                element: <ChangePassword />
            },
            {
                path: 'add-admin',
                element: (
                    <ProtectedRoute is_super_admin={true}>
                        <AddAdmin />
                    </ProtectedRoute>
                )
            },
            {
                path: 'products',
                element: <Products />
            },
            {
                path: 'categories',
                element: <Categories />
            },
            {
                path: 'brands',
                element: <Brands />
            },
            {
                path: 'orders',
                children: [
                    {
                        index: true,
                        element: <OrdersList />
                    },
                    {
                        path: ':orderId',
                        element: <OrderDetails />
                    },
                    {
                        path: 'analytics',
                        element: <OrdersDashboard />
                    }
                ]
            },
            // {
            //     path: 'customers',
            //     element: <Customers />
            // },
            // {
            //     path: 'transactions',
            //     element: <Transactions />
            // },
            {
                path: 'blog',
                element: <Blog />
            },
            {
                path: 'blog/categories',
                element: <BlogCategories />
            },
            // {
            //     path: 'reviews',
            //     element: <Reviews />
            // },
            // {
            //     path: 'settings',
            //     element: (
            //         <ProtectedRoute requiredRole="admin">
            //             <Settings />
            //         </ProtectedRoute>
            //     )
            // }
        ]
    },
    // {
    //     path: '/unauthorized',
    //     element: <Unauthorized />
    // },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;
