import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    Container,
    useTheme,
    useMediaQuery,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Avatar,
    Paper,
    ThemeProvider,
    createTheme,
    CssBaseline,
    Chip
} from '@mui/material';
import {
    Dashboard,
    Inventory,
    People,
    ShoppingCart,
    Analytics,
    Settings,
    Add,
    Category,
    Business,
    ExpandLess,
    ExpandMore,
    Store
} from '@mui/icons-material';

const DRAWER_WIDTH = 300;

// Create modern dark theme
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
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    margin: '4px 12px',
                    '&:hover': {
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        transform: 'translateX(4px)',
                        transition: 'all 0.3s ease',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(99, 102, 241, 0.2)',
                        borderLeft: '4px solid #6366f1',
                        '&:hover': {
                            backgroundColor: 'rgba(99, 102, 241, 0.3)',
                        },
                    },
                },
            },
        },
    },
});





const AdminLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                {/* App Bar */}
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
                        ml: { md: `${DRAWER_WIDTH}px` },
                        zIndex: theme.zIndex.drawer + 1,
                    }}
                >
                    <Header onMenuClick={handleDrawerToggle} />
                </AppBar>

                {/* Sidebar */}
                <Box
                    component="nav"
                    sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
                >
                    {/* Mobile drawer */}
                    {isMobile && (
                        <Drawer
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{ keepMounted: true }}
                            sx={{
                                '& .MuiDrawer-paper': {
                                    boxSizing: 'border-box',
                                    width: DRAWER_WIDTH,
                                },
                            }}
                        >
                            <Sidebar onItemClick={() => setMobileOpen(false)} />
                        </Drawer>
                    )}

                    {/* Desktop drawer */}
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: DRAWER_WIDTH,
                            },
                        }}
                        open
                    >
                        <Sidebar />
                    </Drawer>
                </Box>

                {/* Main content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                        minHeight: '100vh',
                    }}
                >
                    <Toolbar /> {/* Spacer for AppBar */}
                    <Container maxWidth="xl" sx={{ py: 4 }}>
                        <Outlet />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default AdminLayout;