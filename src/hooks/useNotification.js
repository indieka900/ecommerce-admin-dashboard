import { useState } from 'react';

export const useNotification = () => {
    const [snackbar, setSnackbar] = useState({ 
        open: false, 
        message: '', 
        severity: 'success' 
    });

    const showNotification = (message, severity = 'success') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const hideNotification = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return {
        snackbar,
        showNotification,
        hideNotification
    };
};