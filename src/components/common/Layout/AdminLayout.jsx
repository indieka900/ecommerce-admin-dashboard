import { useState } from 'react';
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
    useMediaQuery
} from '@mui/material';

//const DRAWER_WIDTH = 300; // Width of the sidebar

const AdminLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mode, setMode] = useState('light');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const EXPANDED_SIDEBAR_WIDTH = 280;
    const COLLAPSED_SIDEBAR_WIDTH = 80;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const toggleTheme = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const handleSidebarToggle = (isCollapsed) => {
        setSidebarCollapsed(isCollapsed);
    };

    const sidebarWidth = sidebarCollapsed ? COLLAPSED_SIDEBAR_WIDTH : EXPANDED_SIDEBAR_WIDTH;

    const drawer = (
        <Sidebar
            onItemClick={() => isMobile && setMobileOpen(false)}
            onToggleCollapse={handleSidebarToggle}
        />
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={(theme) => ({
                    width: { md: `calc(100% - ${sidebarWidth}px)` },
                    ml: { md: `${sidebarWidth}px` },
                    zIndex: theme.zIndex.drawer + 1,
                })}
            >
                <Header onMenuClick={handleDrawerToggle} toggleTheme={toggleTheme} mode={mode} />
            </AppBar>

            {/* Sidebar */}
            <Box
                component="nav"
                sx={{ width: { md: sidebarWidth }, flexShrink: { md: 0 } }}
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
                                width: EXPANDED_SIDEBAR_WIDTH,

                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                )}

                {/* Desktop drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: sidebarWidth,
                            borderRadius: 0,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { md: `calc(100% - ${sidebarWidth}px)` },
                    // background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                    minHeight: '100vh',
                }}
            >
                <Toolbar /> {/* Spacer for AppBar */}
                <Container maxWidth="xl" sx={{ py: 4 }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default AdminLayout;