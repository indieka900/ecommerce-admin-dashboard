import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import toast from 'react-hot-toast';

export const authService = {
    // Enhanced login with role checking
    login: async (credentials) => {
        try {
            const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
            const { access, refresh, user } = response.data;

            // Validate required fields
            if (!access || !refresh || !user) {
                throw new Error('Invalid response from server');
            }

            // Check if user has Administrator role
            if (user.role !== 'Administrator') {
                throw new Error('Access denied. Administrator privileges required.');
            }

            // Store tokens and user data
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('user', JSON.stringify(user));

            console.log('User data:', user, 'access:', access, 'refresh:', refresh);
            

            // Log successful login
            console.log('Login successful:', {
                userId: user.id,
                email: user.email,
                role: user.role,
                loginTime: new Date().toISOString()
            });

            return { success: true, user };
        } catch (error) {
            // Enhanced error handling
            let errorMessage = 'Login failed. Please try again.';

            if (error.response?.status === 401) {
                errorMessage = 'Invalid email or password.';
            } else if (error.response?.status === 403) {
                errorMessage = 'Access denied. Administrator privileges required.';
            } else if (error.response?.status === 429) {
                errorMessage = 'Too many login attempts. Please try again later.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    },

    // Enhanced logout with cleanup
    logout: async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const user = authService.getCurrentUser();

            // Log logout attempt
            console.log('Logout initiated:', {
                userId: user?.id,
                email: user?.email,
                logoutTime: new Date().toISOString()
            });

            if (refreshToken) {
                await api.post('/auth/logout/', { refresh: refreshToken });
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Continue with local cleanup even if server request fails
        } finally {
            // Clear all stored data
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            localStorage.removeItem('theme_preference');

            // Clear any cached data
            sessionStorage.clear();

            // Redirect to login
            window.location.href = '/login';
        }
    },

    // Get current user with validation
    getCurrentUser: () => {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return null;

            const user = JSON.parse(userStr);

            // Validate user object
            if (!user.id || !user.email || !user.role) {
                console.warn('Invalid user data found, clearing storage');
                authService.clearUserData();
                return null;
            }

            return user;
        } catch (error) {
            console.error('Error parsing user data:', error);
            authService.clearUserData();
            return null;
        }
    },

    // Enhanced authentication check
    isAuthenticated: () => {
        const token = localStorage.getItem('access_token');
        console.log('Token:', token);
        
        const user = authService.getCurrentUser();

        // Check if token exists and user is Administrator
        return !!(token && user && user.role === 'Administrator');
    },

    // Check if user has specific role
    hasRole: (requiredRole) => {
        const user = authService.getCurrentUser();
        return user?.role === requiredRole;
    },

    // Clear user data utility
    clearUserData: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    },

    // Enhanced token refresh
    refreshToken: async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await api.post('/auth/token/refresh/', {
                refresh: refreshToken
            });

            const { access } = response.data;

            if (!access) {
                throw new Error('Invalid refresh response');
            }

            localStorage.setItem('access_token', access);
            return access;
        } catch (error) {
            console.error('Token refresh failed:', error);
            authService.clearUserData();
            throw new Error('Session expired. Please login again.');
        }
    },

    // Validate session
    validateSession: async () => {
        try {
            const response = await api.get('/auth/validate/');
            return response.data;
        } catch (error) {
            console.error('Session validation failed:', error);
            authService.clearUserData();
            return false;
        }
    },

    // Update user profile
    updateProfile: async (userData) => {
        try {
            const response = await api.put('/auth/profile/', userData);
            const updatedUser = response.data;

            // Update stored user data
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return updatedUser;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Profile update failed';
            throw new Error(errorMessage);
        }
    },

    // Change password
    changePassword: async (passwordData) => {
        try {
            await api.post(API_ENDPOINTS.CHANGE_PASSWORD, passwordData);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Password change failed';
            throw new Error(errorMessage);
        }
    },

    // Reset password
    resetPassword: async (email) => {
        try {
            await api.post(API_ENDPOINTS.RESET_PASSWORD, { email });
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Password reset failed';
            throw new Error(errorMessage);
        }
    }
};