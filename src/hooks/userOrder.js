// src/hooks/useOrderApi.js
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { orderService } from '../services/orderService';

// Hook for fetching orders list with filters
export const useOrders = (initialFilters = {}) => {
    const [allOrders, setAllOrders] = useState([]); // raw full data
    const [orders, setOrders] = useState([]);       // paginated data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initialFilters);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0
    });

    const applyPagination = (data, page, pageSize) => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return data.slice(start, end);
    };

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const orderList = await orderService.getOrders();
            const processedOrders = Array.isArray(orderList) ? orderList : [];

            // Optionally apply filters here if needed before pagination
            setAllOrders(processedOrders);

            const total = processedOrders.length;
            const totalPages = Math.ceil(total / pagination.pageSize);
            const paginated = applyPagination(processedOrders, pagination.page, pagination.pageSize);

            setPagination((prev) => ({
                ...prev,
                total,
                totalPages
            }));

            setOrders(paginated);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.pageSize]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        // Apply frontend pagination whenever pagination state or full data changes
        const paginated = applyPagination(allOrders, pagination.page, pagination.pageSize);
        setOrders(paginated);
    }, [allOrders, pagination.page, pagination.pageSize]);

    const updateFilters = (newFilters) => {
        setFilters(newFilters);
        setPagination(prev => ({ ...prev, page: 1 }));
        // If filtering logic needed, filter `allOrders` then paginate again
    };

    const changePage = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    return {
        orders,
        loading,
        error,
        filters,
        pagination,
        updateFilters,
        changePage,
        setPagination,
        refetch: fetchOrders
    };
};

// Hook for fetching single order details
export const useOrderDetails = (orderId) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrderDetails = useCallback(async () => {
        if (!orderId) return;

        setLoading(true);
        setError(null);
        try {
            const orderData = await orderService.getOrderDetails(orderId);
            setOrder(orderData);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }, [orderId]);

    useEffect(() => {
        fetchOrderDetails();
    }, [fetchOrderDetails]);

    return { order, loading, error, refetch: fetchOrderDetails };
};

// Hook for order actions (update status, payment status, etc.)
export const useOrderActions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateOrderStatus = async (orderId, status) => {
        setLoading(true);
        setError(null);
        try {
            const result = await orderService.updateOrderStatus(orderId, status);
            toast.success('Order status updated successfully');
            return result;
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updatePaymentStatus = async (orderId, paymentStatus) => {
        setLoading(true);
        setError(null);
        try {
            const result = await orderService.updatePaymentStatus(orderId, paymentStatus);
            toast.success('Payment status updated successfully');
            return result;
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const addTracking = async (orderId, trackingNumber) => {
        setLoading(true);
        setError(null);
        try {
            const result = await orderService.addTracking(orderId, trackingNumber);
            toast.success('Tracking number added successfully');
            return result;
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const bulkUpdateStatus = async (orderIds, status) => {
        setLoading(true);
        setError(null);
        try {
            const result = await orderService.bulkUpdateStatus(orderIds, status);
            toast.success(`${result.updated_count} orders updated successfully`);
            return result;
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (orderData) => {
        setLoading(true);
        setError(null);
        try {
            const result = await orderService.createOrder(orderData);
            toast.success('Order created successfully');
            return result;
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateOrder = async (orderId, orderData) => {
        setLoading(true);
        setError(null);
        try {
            const result = await orderService.updateOrder(orderId, orderData);
            toast.success('Order updated successfully');
            return result;
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteOrder = async (orderId) => {
        setLoading(true);
        setError(null);
        try {
            const result = await orderService.deleteOrder(orderId);
            toast.success('Order deleted successfully');
            return result;
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        updateOrderStatus,
        updatePaymentStatus,
        addTracking,
        bulkUpdateStatus,
        createOrder,
        updateOrder,
        deleteOrder
    };
};

// Hook for order analytics
export const useOrderAnalytics = (days = 30) => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAnalytics = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const analyticsData = await orderService.getOrderAnalytics(days);
            setAnalytics(analyticsData);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }, [days]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    return { analytics, loading, error, refetch: fetchAnalytics };
};

// Hook for dashboard statistics
export const useDashboardStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const statsData = await orderService.getDashboardStats();
            setStats(statsData);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return { stats, loading, error, refetch: fetchStats };
};

// Hook for revenue analytics
export const useRevenueAnalytics = (period = 'monthly', year = new Date().getFullYear(), month = null) => {
    const [revenue, setRevenue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRevenue = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const revenueData = await orderService.getRevenueAnalytics(period, year, month);
            setRevenue(revenueData);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }, [period, year, month]);

    useEffect(() => {
        fetchRevenue();
    }, [fetchRevenue]);

    return { revenue, loading, error, refetch: fetchRevenue };
};

// Hook for customer analytics
export const useCustomerAnalytics = () => {
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCustomerAnalytics = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const customerAnalytics = await orderService.getCustomerAnalytics();
            setCustomerData(customerAnalytics);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCustomerAnalytics();
    }, [fetchCustomerAnalytics]);

    return { customerData, loading, error, refetch: fetchCustomerAnalytics };
};

// Hook for searching orders
export const useOrderSearch = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchOrders = async (query) => {
        if (!query) {
            setResults([]);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const searchResults = await orderService.searchOrders(query);
            setResults(searchResults.results || []);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { results, loading, error, searchOrders };
};

// Hook for exporting orders
export const useOrderExport = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const exportToCSV = async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const blob = await orderService.exportOrdersToCSV(filters);

            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('Orders exported successfully');
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const exportToExcel = async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const blob = await orderService.exportOrdersToExcel(filters);

            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('Orders exported successfully');
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, exportToCSV, exportToExcel };
};