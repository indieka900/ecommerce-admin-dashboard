import { createContext, useContext, useState } from 'react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loadingStates, setLoadingStates] = useState({});

    const setLoading = (key, isLoading, message = '') => {
        setLoadingStates(prev => ({
            ...prev,
            [key]: isLoading ? { isLoading: true, message } : undefined
        }));
    };

    const isLoading = (key) => {
        return loadingStates[key]?.isLoading || false;
    };

    const getLoadingMessage = (key) => {
        return loadingStates[key]?.message || '';
    };

    // Show global loading overlay if any loading state is active
    const hasAnyLoading = Object.values(loadingStates).some(state => state?.isLoading);
    const globalMessage = Object.values(loadingStates).find(state => state?.isLoading)?.message;

    return (
        <LoadingContext.Provider value={{ setLoading, isLoading, getLoadingMessage }}>
            {children}
            {hasAnyLoading && (
                <LoadingSpinner 
                    fullScreen 
                    size={60} 
                    message={globalMessage} 
                />
            )}
        </LoadingContext.Provider>
    );
};

export const useGlobalLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useGlobalLoading must be used within a LoadingProvider');
    }
    return context;
};