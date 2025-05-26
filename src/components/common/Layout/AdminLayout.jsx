import React, { useState, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Container,
    useTheme,
    useMediaQuery,
    ThemeProvider,
    CssBaseline
} from '@mui/material';
import { themes } from '../../../context/ThemeContext';

const DRAWER_WIDTH = 300;


const AdminLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [mode, setMode] = useState('light');

    const toggleTheme = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const theme = useMemo(() => themes[mode], [mode]);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={(theme) => ({
                        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
                        ml: { md: `${DRAWER_WIDTH}px` },
                        zIndex: theme.zIndex.drawer + 1,
                    })}
                >
                    <Header onMenuClick={handleDrawerToggle} toggleTheme={toggleTheme} mode={mode} /> 
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