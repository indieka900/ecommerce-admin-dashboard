import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const productService = {
    // Fetch all products with enhanced error handling
    getProducts: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.PRODUCTS);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch products. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Fetch all product categories
    getProductCategories: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.PRODUCT_CATEGORIES);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch product categories. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Fetch all product brands
    getProductBrands: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.PRODUCT_BRANDS);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch product brands. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Create a new product
    createProduct: async (productData) => {
        try {
            const response = await api.post(API_ENDPOINTS.PRODUCTS, productData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            },);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to create product. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Update an existing product
    updateProduct: async (id, productData) => {
        try {
            const response = await api.patch(`${API_ENDPOINTS.PRODUCTS}${id}/`, productData, {
                headers : {'Content-Type': 'multipart/form-data'}
            });
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to update product. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Delete a product
    deleteProduct: async (id) => {
        try {
            const response = await api.delete(`${API_ENDPOINTS.PRODUCTS}${id}/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to delete product. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },
};