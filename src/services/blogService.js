import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const blogService = {
    // Fetch all blogs with enhanced error handling
    getBlogs: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.BLOGS);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch blogs. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Create a new blog post
    createBlog: async (blogData) => {
        try {
            const response = await api.post(`${API_ENDPOINTS.BLOGS}/`, blogData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            },);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to create blog post. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Update an existing blog post
    updateBlog: async (id, blogData) => {
        try {
            const response = await api.put(`${API_ENDPOINTS.BLOGS}/${id}/`, blogData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to update blog post. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    // Delete a blog post
    deleteBlog: async (id) => {
        try {
            const response = await api.delete(`${API_ENDPOINTS.BLOGS}/${id}/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to delete blog post. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },
    // Fetch blog categories
    getBlogCategories: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.BLOG_CATEGORIES);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch blog categories. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },
    //fetch all comments
    getComments: async () => {
        try {
            const response = await api.get(`${API_ENDPOINTS.COMMENTS}/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch comments. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },
    deleteComment: async (id) => {
        try {
            const response = await api.delete(`${API_ENDPOINTS.COMMENTS}/${id}/`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to delete comment. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    }
};