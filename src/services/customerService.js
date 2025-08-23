import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const customerService = {
    // Fetch all customers with filtering, pagination, and search
    getCustomers: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();

            // Add pagination
            if (params.page) queryParams.append('page', params.page);
            if (params.page_size) queryParams.append('page_size', params.page_size);

            // Add search
            if (params.search) queryParams.append('search', params.search);

            // Add filters
            if (params.status) queryParams.append('status', params.status);
            if (params.tier) queryParams.append('tier', params.tier);
            if (params.is_vip !== undefined) queryParams.append('is_vip', params.is_vip);
            if (params.date_joined_after) queryParams.append('date_joined_after', params.date_joined_after);
            if (params.date_joined_before) queryParams.append('date_joined_before', params.date_joined_before);
            if (params.total_spent_min) queryParams.append('total_spent_min', params.total_spent_min);
            if (params.total_spent_max) queryParams.append('total_spent_max', params.total_spent_max);

            // Add ordering
            if (params.ordering) queryParams.append('ordering', params.ordering);

            const url = `${API_ENDPOINTS.CUSTOMERS}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch customers. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Get single customer by ID with detailed information
    getCustomer: async (customerId) => {
        try {
            if (!customerId) {
                throw new Error('Customer ID is required');
            }
            const response = await api.get(`${API_ENDPOINTS.CUSTOMERS}${customerId}/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch customer details. Please try again later.';
            if (error.response?.status === 404) {
                errorMessage = 'Customer not found.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Create new customer
    createCustomer: async (customerData) => {
        try {
            if (!customerData.email) {
                throw new Error('Email is required');
            }
            const response = await api.post(API_ENDPOINTS.CUSTOMERS, customerData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to create customer. Please check the form and try again.';
            if (error.response?.data?.email) {
                errorMessage = `Email error: ${error.response.data.email[0]}`;
            } else if (error.response?.data?.phone_number) {
                errorMessage = `Phone error: ${error.response.data.phone_number[0]}`;
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Update existing customer
    updateCustomer: async (customerId, customerData) => {
        try {
            if (!customerId) {
                throw new Error('Customer ID is required');
            }
            const response = await api.put(`${API_ENDPOINTS.CUSTOMERS}${customerId}/`, customerData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to update customer. Please check the form and try again.';
            if (error.response?.status === 404) {
                errorMessage = 'Customer not found.';
            } else if (error.response?.data?.email) {
                errorMessage = `Email error: ${error.response.data.email[0]}`;
            } else if (error.response?.data?.phone_number) {
                errorMessage = `Phone error: ${error.response.data.phone_number[0]}`;
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Partially update customer (PATCH)
    partialUpdateCustomer: async (customerId, customerData) => {
        try {
            if (!customerId) {
                throw new Error('Customer ID is required');
            }
            const response = await api.patch(`${API_ENDPOINTS.CUSTOMERS}${customerId}/`, customerData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to update customer. Please try again later.';
            if (error.response?.status === 404) {
                errorMessage = 'Customer not found.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Delete customer
    deleteCustomer: async (customerId) => {
        try {
            if (!customerId) {
                throw new Error('Customer ID is required');
            }
            const response = await api.delete(`${API_ENDPOINTS.CUSTOMERS}${customerId}/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to delete customer. Please try again later.';
            if (error.response?.status === 404) {
                errorMessage = 'Customer not found.';
            } else if (error.response?.status === 403) {
                errorMessage = 'You do not have permission to delete this customer.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Get dashboard statistics
    getCustomerStats: async () => {
        try {
            const response = await api.get(`${API_ENDPOINTS.CUSTOMERS}stats/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch customer statistics. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Get customer's order history
    getCustomerOrders: async (customerId, params = {}) => {
        try {
            if (!customerId) {
                throw new Error('Customer ID is required');
            }

            const queryParams = new URLSearchParams();
            if (params.status) queryParams.append('status', params.status);
            if (params.payment_status) queryParams.append('payment_status', params.payment_status);
            if (params.date_from) queryParams.append('date_from', params.date_from);
            if (params.date_to) queryParams.append('date_to', params.date_to);

            const url = `${API_ENDPOINTS.CUSTOMERS}${customerId}/orders/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch customer orders. Please try again later.';
            if (error.response?.status === 404) {
                errorMessage = 'Customer not found.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Get customer activity log
    getCustomerActivity: async (customerId) => {
        try {
            if (!customerId) {
                throw new Error('Customer ID is required');
            }
            const response = await api.get(`${API_ENDPOINTS.CUSTOMERS}${customerId}/activity_log/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch customer activity. Please try again later.';
            if (error.response?.status === 404) {
                errorMessage = 'Customer not found.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Activate customer
    activateCustomer: async (customerId) => {
        try {
            if (!customerId) {
                throw new Error('Customer ID is required');
            }
            const response = await api.post(`${API_ENDPOINTS.CUSTOMERS}${customerId}/activate/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to activate customer. Please try again later.';
            if (error.response?.status === 404) {
                errorMessage = 'Customer not found.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Deactivate customer
    deactivateCustomer: async (customerId) => {
        try {
            if (!customerId) {
                throw new Error('Customer ID is required');
            }
            const response = await api.post(`${API_ENDPOINTS.CUSTOMERS}${customerId}/deactivate/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to deactivate customer. Please try again later.';
            if (error.response?.status === 404) {
                errorMessage = 'Customer not found.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Bulk actions on multiple customers
    bulkAction: async (action, customerIds) => {
        try {
            if (!action || !customerIds || customerIds.length === 0) {
                throw new Error('Action and customer IDs are required');
            }

            const validActions = ['activate', 'deactivate', 'delete'];
            if (!validActions.includes(action)) {
                throw new Error('Invalid action. Must be one of: activate, deactivate, delete');
            }

            const response = await api.post(`${API_ENDPOINTS.CUSTOMERS}bulk_action/`, {
                action,
                customer_ids: customerIds
            });
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to perform bulk action. Please try again later.';
            if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Export customers to CSV
    exportCustomers: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();

            // Add filters for export
            if (params.status) queryParams.append('status', params.status);
            if (params.tier) queryParams.append('tier', params.tier);
            if (params.search) queryParams.append('search', params.search);
            if (params.date_joined_after) queryParams.append('date_joined_after', params.date_joined_after);
            if (params.date_joined_before) queryParams.append('date_joined_before', params.date_joined_before);

            const url = `${API_ENDPOINTS.CUSTOMERS}export/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

            // Use blob response for file download
            const response = await api.get(url, {
                responseType: 'blob'
            });

            // Create download link
            const blob = new Blob([response.data], { type: 'text/csv' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `customers_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);

            return { success: true, message: 'Customer data exported successfully' };
        } catch (error) {
            let errorMessage = 'Failed to export customers. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Search customers with debouncing support
    searchCustomers: async (searchTerm, params = {}) => {
        try {
            const searchParams = {
                search: searchTerm,
                page_size: params.limit || 20,
                ...params
            };

            return await customerService.getCustomers(searchParams);
        } catch (error) {
            let errorMessage = 'Failed to search customers. Please try again later.';
            if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Get customer metrics for analytics
    getCustomerMetrics: async (customerId, dateRange = {}) => {
        try {
            if (!customerId) {
                throw new Error('Customer ID is required');
            }

            // Get customer details and orders
            const [customer, orders] = await Promise.all([
                customerService.getCustomer(customerId),
                customerService.getCustomerOrders(customerId, dateRange)
            ]);

            // Calculate metrics
            const totalOrders = orders.length;
            const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0);
            const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

            const paidOrders = orders.filter(order => order.payment_status === 'Paid');
            const pendingOrders = orders.filter(order => order.status === 'Pending');
            const cancelledOrders = orders.filter(order => order.status === 'Cancelled');

            return {
                customer,
                metrics: {
                    totalOrders,
                    totalSpent,
                    avgOrderValue,
                    paidOrders: paidOrders.length,
                    pendingOrders: pendingOrders.length,
                    cancelledOrders: cancelledOrders.length,
                    conversionRate: totalOrders > 0 ? (paidOrders.length / totalOrders) * 100 : 0
                },
                orders
            };
        } catch (error) {
            let errorMessage = 'Failed to fetch customer metrics. Please try again later.';
            if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    }
};

export default customerService;