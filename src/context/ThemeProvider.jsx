import { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import themes from './ThemeContext';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('dark');

    const toggleTheme = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const theme = useMemo(() => themes[mode], [mode]);

    const value = {
        mode,
        toggleTheme,
        theme
    };

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};