// routes.js
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate
} from 'react-router-dom';
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
import CustomerPage from './pages/Customers';
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

const routes = createRoutesFromElements(
    <>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

        <Route
            path="/"
            element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
            errorElement={<ErrorPage />}
        >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="add-admin" element={
                <ProtectedRoute is_super_admin={true}><AddAdmin /></ProtectedRoute>
            } />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="brands" element={<Brands />} />
            <Route path="customers" element={<CustomerPage />} />
            <Route path="orders">
                <Route index element={<OrdersList />} />
                <Route path=":orderId" element={<OrderDetails />} />
                <Route path="analytics" element={<OrdersDashboard />} />
            </Route>
            <Route path="blog" element={<Blog />} />
            <Route path="blog/categories" element={<BlogCategories />} />
        </Route>

        <Route path="*" element={<NotFound />} />
    </>
);

const router = createBrowserRouter(routes, {
    basename: '/admin',
});

export default router;
