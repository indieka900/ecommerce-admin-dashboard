import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize user state on mount
    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        setIsLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const result = await authService.login(credentials);
            setUser(result.user);
            return result;
        } catch (error) {
            setUser(null);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    // Update user data immediately
    const updateUser = (updatedData) => {
        if (!user) return;
        
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        
        // Also update in localStorage/storage if your authService stores it there
        if (authService.updateStoredUser) {
            authService.updateStoredUser(updatedUser);
        }
    };

    // Update user profile with API call and immediate UI update
    const updateUserProfile = async (profileData) => {
        if (!user) throw new Error('No user logged in');
        
        try {
            // Optimistically update UI first for immediate feedback
            const optimisticUpdate = { ...user, ...profileData };
            setUser(optimisticUpdate);
            
            const response = await authService.updateProfile(profileData);
            
            if (response.user) {
                setUser(response.user);
            }
            
            return response;
        } catch (error) {
            // Revert optimistic update on error
            const currentUser = authService.getCurrentUser();
            setUser(currentUser);
            throw error;
        }
    };

    const value = {
        user,
        login,
        logout,
        updateUser,
        updateUserProfile,
        isAuthenticated: !!user,
        isLoading
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