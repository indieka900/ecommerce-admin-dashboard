import { createTheme } from '@mui/material';

const customColors = {
    success: {
        main: '#10b981',
        light: '#34d399',
        dark: '#059669',
        50: '#ecfdf5',
        100: '#d1fae5',
        500: '#10b981',
        600: '#059669',
        900: '#064e3b',
    },
    warning: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
        50: '#fffbeb',
        100: '#fef3c7',
        500: '#f59e0b',
        600: '#d97706',
        900: '#78350f',
    },
    error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
        50: '#fef2f2',
        100: '#fee2e2',
        500: '#ef4444',
        600: '#dc2626',
        900: '#7f1d1d',
    },
    info: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
        50: '#eff6ff',
        100: '#dbeafe',
        500: '#3b82f6',
        600: '#2563eb',
        900: '#1e3a8a',
    },
    purple: {
        main: '#8b5cf6',
        light: '#a78bfa',
        dark: '#7c3aed',
        50: '#faf5ff',
        100: '#f3e8ff',
        500: '#8b5cf6',
        600: '#7c3aed',
        900: '#581c87',
    },
    cyan: {
        main: '#06b6d4',
        light: '#22d3ee',
        dark: '#0891b2',
        50: '#ecfeff',
        100: '#cffafe',
        500: '#06b6d4',
        600: '#0891b2',
        900: '#164e63',
    },
    pink: {
        main: '#ec4899',
        light: '#f472b6',
        dark: '#db2777',
        50: '#fdf2f8',
        100: '#fce7f3',
        500: '#ec4899',
        600: '#db2777',
        900: '#831843',
    },
};

const typography = {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h1: {
        fontWeight: 800,
        fontSize: '2.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
    },
    h2: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.3,
        letterSpacing: '-0.025em',
    },
    h3: {
        fontWeight: 700,
        fontSize: '1.75rem',
        lineHeight: 1.3,
        letterSpacing: '-0.02em',
    },
    h4: {
        fontWeight: 700,
        fontSize: '1.5rem',
        lineHeight: 1.4,
        letterSpacing: '-0.02em',
    },
    h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
    },
    h6: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
    },
    body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        letterSpacing: '0.00938em',
    },
    body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
        letterSpacing: '0.01071em',
    },
    caption: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        letterSpacing: '0.03333em',
        fontWeight: 500,
    },
    button: {
        fontWeight: 600,
        letterSpacing: '0.02em',
        textTransform: 'none',
    },
};

const darkComponentOverrides = {
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#1e293b',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#475569',
                    // borderRadius: '4px',
                    '&:hover': {
                        backgroundColor: '#64748b',
                    },
                },
            },
        },
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
                borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '4px 0 24px rgba(0, 0, 0, 0.25)',
            },
        },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
            },
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 16,
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(30, 41, 59, 0.8)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                },
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 16,
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(30, 41, 59, 0.8)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                padding: '10px 24px',
                fontSize: '0.875rem',
                fontWeight: 600,
                boxShadow: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                },
            },
            contained: {
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                '&:hover': {
                    background: 'linear-gradient(135deg, #5b56f0 0%, #7c3aed 100%)',
                },
            },
            outlined: {
                borderColor: 'rgba(99, 102, 241, 0.3)',
                color: '#6366f1',
                '&:hover': {
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                },
            },
        },
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                margin: '4px 12px',
                padding: '12px 16px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    transform: 'translateX(6px)',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
                },
                '&.Mui-selected': {
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    borderLeft: '4px solid #6366f1',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        borderRadius: '0 2px 2px 0',
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    },
                },
            },
        },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.12)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#6366f1',
                        boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
                    },
                },
            },
        },
    },
    MuiChip: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                fontWeight: 500,
                fontSize: '0.8125rem',
            },
            filled: {
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                color: '#818cf8',
                border: '1px solid rgba(99, 102, 241, 0.2)',
            },
        },
    },
    MuiTableContainer: {
        styleOverrides: {
            root: {
                borderRadius: 16,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(30, 41, 59, 0.6)',
            },
        },
    },
    MuiTableHead: {
        styleOverrides: {
            root: {
                background: 'rgba(99, 102, 241, 0.1)',
                '& .MuiTableCell-head': {
                    fontWeight: 600,
                    color: '#f8fafc',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
    },
    MuiAvatar: {
        styleOverrides: {
            root: {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
            },
        },
    },
    MuiLinearProgress: {
        styleOverrides: {
            root: {
                borderRadius: 4,
                height: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            bar: {
                borderRadius: 4,
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            },
        },
    },
};

const lightComponentOverrides = {
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f5f9',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#cbd5e1',
                    borderRadius: '4px',
                    '&:hover': {
                        backgroundColor: '#94a3b8',
                    },
                },
            },
        },
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                backgroundColor: '#ffffff',
                borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '4px 0 24px rgba(0, 0, 0, 0.06)',
            },
        },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
                color: '#111827',
            },
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 16,
                border: '1px solid rgba(0, 0, 0, 0.06)',
                background: '#ffffff',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                },
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 16,
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                padding: '10px 24px',
                fontSize: '0.875rem',
                fontWeight: 600,
                boxShadow: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.2)',
                },
            },
            contained: {
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                '&:hover': {
                    background: 'linear-gradient(135deg, #5b56f0 0%, #7c3aed 100%)',
                },
            },
        },
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                margin: '4px 12px',
                padding: '12px 16px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    transform: 'translateX(6px)',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)',
                },
                '&.Mui-selected': {
                    backgroundColor: 'rgba(99, 102, 241, 0.12)',
                    borderLeft: '4px solid #6366f1',
                    '&:hover': {
                        backgroundColor: 'rgba(99, 102, 241, 0.16)',
                    },
                },
            },
        },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    borderRadius: 12,
                    background: 'rgba(0, 0, 0, 0.02)',
                    '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#6366f1',
                        boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
                    },
                },
            },
        },
    },
};

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6366f1',
            light: '#818cf8',
            dark: '#4f46e5',
        },
        secondary: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
        },
        background: {
            default: '#0f172a',
            paper: '#1e293b',
        },
        text: {
            primary: '#f8fafc',
            secondary: '#cbd5e1',
        },
        success: customColors.success,
        warning: customColors.warning,
        error: customColors.error,
        info: customColors.info,
        // Add custom colors
        purple: customColors.purple,
        cyan: customColors.cyan,
        pink: customColors.pink,
    },
    typography,
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
        '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
        '0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)',
        '0 20px 40px rgba(0, 0, 0, 0.2)',
        ...Array(19).fill('0 20px 40px rgba(0, 0, 0, 0.2)'),
    ],
    components: darkComponentOverrides,
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6366f1',
            light: '#818cf8',
            dark: '#4f46e5',
        },
        secondary: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#111827',
            secondary: '#6b7280',
        },
        success: customColors.success,
        warning: customColors.warning,
        error: customColors.error,
        info: customColors.info,
        // Add custom colors
        purple: customColors.purple,
        cyan: customColors.cyan,
        pink: customColors.pink,
    },
    typography,
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.16)',
        '0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        '0 10px 20px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.08)',
        '0 15px 25px rgba(0, 0, 0, 0.12), 0 5px 10px rgba(0, 0, 0, 0.04)',
        '0 20px 40px rgba(0, 0, 0, 0.15)',
        ...Array(19).fill('0 20px 40px rgba(0, 0, 0, 0.15)'),
    ],
    components: lightComponentOverrides,
});

export const getGradientBackground = (theme, colors) => {
    return `linear-gradient(135deg, ${colors.map(color => 
        theme.palette[color]?.main || color
    ).join(', ')})`;
};

export const getGlassmorphismStyles = (theme, opacity = 0.1) => ({
    background: theme.palette.mode === 'dark' 
        ? `rgba(30, 41, 59, ${opacity})` 
        : `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.08)' 
        : 'rgba(0, 0, 0, 0.06)'}`,
});

export const getHoverTransition = (translateY = -2) => ({
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: `translateY(${translateY}px)`,
    },
});

export const themes = {
    dark: darkTheme,
    light: lightTheme,
};

export const customPalette = customColors;

export default themes;