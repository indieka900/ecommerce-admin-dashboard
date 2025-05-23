import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    sessionValid: false
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                sessionValid: true,
                loading: false,
                error: null
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                sessionValid: false,
                loading: false,
                error: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                sessionValid: false,
                loading: false,
                error: null
            };
        case 'SESSION_EXPIRED':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                sessionValid: false,
                loading: false,
                error: 'Session expired'
            };
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });

                // Check if user is logged in and has valid session
                if (authService.isAuthenticated()) {
                    const user = authService.getCurrentUser();
                    if (user?.role === 'Administrator') {
                        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
                    } else {
                        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid user role' });
                        authService.clearUserData();
                    }
                } else {
                    dispatch({ type: 'SET_LOADING', payload: false });
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                dispatch({ type: 'LOGIN_FAILURE', payload: 'Authentication check failed' });
            }
        };

        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            dispatch({ type: 'CLEAR_ERROR' });

            const result = await authService.login(credentials);

            dispatch({ type: 'LOGIN_SUCCESS', payload: result.user });

            return result;
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error('Logout error:', error);
            // Force logout even if server request fails
            dispatch({ type: 'LOGOUT' });
        }
    };

    const updateProfile = async (userData) => {
        try {
            const updatedUser = await authService.updateProfile(userData);
            dispatch({ type: 'UPDATE_USER', payload: updatedUser });
            toast.success('Profile updated successfully!');
            return updatedUser;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    };

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    const value = {
        ...state,
        login,
        logout,
        updateProfile,
        clearError,
        hasRole: authService.hasRole
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};