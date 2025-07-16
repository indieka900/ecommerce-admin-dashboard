import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const orderService = {
    // Fetch all orders with enhanced error handling
    getOrders: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.ORDERS);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch orders. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Fetch single order details
    getOrderDetails: async (orderId) => {
        try {
            const response = await api.get(`${API_ENDPOINTS.ORDERS}${orderId}/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch order details. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Update order status
    updateOrderStatus: async (orderId, status) => {
        try {
            const response = await api.post(`${API_ENDPOINTS.ORDERS}${orderId}/update_status/`, { status });
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to update order status. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Update payment status
    updatePaymentStatus: async (orderId, paymentStatus) => {
        try {
            const response = await api.post(`${API_ENDPOINTS.ORDERS}${orderId}/update_payment_status/`, {
                payment_status: paymentStatus
            });
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to update payment status. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Add tracking number
    addTracking: async (orderId, trackingNumber) => {
        try {
            const response = await api.post(`${API_ENDPOINTS.ORDERS}${orderId}/add_tracking/`, {
                tracking_number: trackingNumber
            });
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to add tracking number. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Bulk update order status
    bulkUpdateStatus: async (orderIds, status) => {
        try {
            const params = new URLSearchParams();
            orderIds.forEach(id => params.append('ids[]', id));
            params.append('status', status);

            const response = await api.get(`${API_ENDPOINTS.ORDERS}bulk_update_status/?${params}`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to bulk update orders. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Search orders
    searchOrders: async (query) => {
        try {
            const response = await api.get(`${API_ENDPOINTS.ORDERS}search/`, {
                params: { q: query }
            });
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to search orders. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Export orders to CSV
    exportOrdersToCSV: async (filters = {}) => {
        try {
            const response = await api.get(`${API_ENDPOINTS.ORDERS}/export_csv/`, {
                params: filters,
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to export orders to CSV. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Export orders to Excel
    exportOrdersToExcel: async (filters = {}) => {
        try {
            const response = await api.get(`${API_ENDPOINTS.ORDERS}/export_excel/`, {
                params: filters,
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to export orders to Excel. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Get order analytics
    getOrderAnalytics: async (days = 30) => {
        try {
            const response = await api.get(API_ENDPOINTS.ORDER_STATS, {
                params: { days }
            });
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch order analytics. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Get dashboard statistics
    getDashboardStats: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.DASHBOARD_STATS);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch dashboard statistics. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Get revenue analytics
    getRevenueAnalytics: async (period = 'monthly', year = new Date().getFullYear(), month = null) => {
        try {
            const params = { period, year };
            if (month && period === 'daily') {
                params.month = month;
            }

            const response = await api.get(API_ENDPOINTS.REVENUE_ANALYTICS, { params });
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch revenue analytics. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Get customer analytics
    getCustomerAnalytics: async () => {
        try {
            const response = await api.get(`${API_ENDPOINTS.ANALYTICS}/customers/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch customer analytics. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Create a new order (if needed)
    createOrder: async (orderData) => {
        try {
            const response = await api.post(API_ENDPOINTS.ORDERS, orderData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to create order. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Update an existing order
    updateOrder: async (orderId, orderData) => {
        try {
            const response = await api.patch(`${API_ENDPOINTS.ORDERS}${orderId}/`, orderData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to update order. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    deleteOrder: async (orderId) => {
        try {
            const response = await api.delete(`${API_ENDPOINTS.ORDERS}${orderId}/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to delete order. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    }
};