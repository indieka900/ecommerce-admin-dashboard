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

    //Create Category
    addCategory: async (data) => {
        try {
            const response = await api.post(API_ENDPOINTS.PRODUCT_CATEGORIES, data);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to create Category. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    //Update category
    updateCategory: async (id, data) => {
        try {
            const response = await api.patch(`${API_ENDPOINTS.PRODUCT_CATEGORIES}${id}/`, data);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to category. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    //delete category
    deleteCategory: async (id) => {
        try {
            const response = await api.delete(`${API_ENDPOINTS.PRODUCT_CATEGORIES}${id}/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to delete category. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    //get parent categories
    getParentCategories: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.PARENT_CATEGORIES);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch parent categories. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    //add Parent category
    addParentCategory: async (data) => {
        try {
            const response = await api.post(API_ENDPOINTS.PARENT_CATEGORIES, data);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to create Parent Category. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    //update parent category
    updateParentCategory: async (id, data) => {
        try {
            const response = await api.patch(`${API_ENDPOINTS.PARENT_CATEGORIES}${id}/`, data);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to update category. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    //delete parent category
    deleteParentCategory: async (id) => {
        try {
            const response = await api.delete(`${API_ENDPOINTS.PARENT_CATEGORIES}${id}/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to delete category. Please try again later.';
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

    addBrand: async (data) => {
        try {
            const response = await api.post(API_ENDPOINTS.PRODUCT_BRANDS, data);
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

    //update brand
    updateBrand: async (id, data) => {
        try {
            const response = await api.patch(`${API_ENDPOINTS.PRODUCT_BRANDS}${id}/`, data);
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

    //delete Brand
    deleteBrand: async (id) => {
        try {
            const response = await api.delete(`${API_ENDPOINTS.PRODUCT_BRANDS}${id}/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to delete brand. Please try again later.';
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
                headers: { 'Content-Type': 'multipart/form-data' }
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

    // Upload images to the a product
    bulkImageUpload: async (data) => {
        try {
            const response = await api.post(API_ENDPOINTS.BULK_IMAGEUPLOAD, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            },);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to add images. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    //get all product images
    getProductImages: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.PRODUCT_IMAGES);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to get images. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    //delete product images
    deleteProductImage: async (id) => {
        try {
            const response = await api.delete(`${API_ENDPOINTS.PRODUCT_IMAGES}${id}/`);
            return response.data
        } catch (error) {
            let errorMessage = 'Failed to delete image. Please try again later.';
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

    // fetch product variants as per product id
    getProductVariants: async (productID) => {
        try {
            const response = await api.get(`${API_ENDPOINTS.PRODUCT_VARIANTS}product-variants/`, {
                params: { product: productID },
            });
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch product variants. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    //update product variants
    updateProductVariant: async (id, data) => {
        try {
            const response = await api.patch(`${API_ENDPOINTS.PRODUCT_VARIANTS}${id}/`, data);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to update product variants. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // add product variants
    addProductVariant: async (data) => {
        try {
            const response = await api.post(API_ENDPOINTS.PRODUCT_VARIANTS, data);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to add product variants. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    //delete product variants
    deleteProductVariant: async (id) => {
        try {
            const response = await api.delete(`${API_ENDPOINTS.PRODUCT_VARIANTS}${id}/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to delete product variants. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);

        }
    }
};