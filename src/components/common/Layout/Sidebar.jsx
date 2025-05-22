import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Toolbar
} from '@mui/material';
import {
    Dashboard,
    Inventory,
    Category,
    ShoppingCart,
    People,
    Payment,
    Article,
    Reviews,
    Settings,
    AdminPanelSettings
} from '@mui/icons-material';

const menuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: Dashboard },
    { title: 'Products', path: '/products', icon: Inventory },
    { title: 'Categories', path: '/categories', icon: Category },
    { title: 'Orders', path: '/orders', icon: ShoppingCart },
    { title: 'Customers', path: '/customers', icon: People },
    { title: 'Transactions', path: '/transactions', icon: Payment },
    { title: 'Blog', path: '/blog', icon: Article },
    { title: 'Reviews', path: '/reviews', icon: Reviews },
    { title: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = ({ onItemClick }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleItemClick = (path) => {
        navigate(path);
        if (onItemClick) onItemClick();
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Logo/Brand */}
            <Toolbar sx={{ px: 3 }}>
                <AdminPanelSettings sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                    Admin Panel
                </Typography>
            </Toolbar>

            <Divider />

            {/* Navigation Menu */}
            <List sx={{ flex: 1, px: 1 }}>
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => handleItemClick(item.path)}
                                selected={isActive}
                                sx={{
                                    borderRadius: 2,
                                    mx: 1,
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.main',
                                        color: 'primary.contrastText',
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'primary.contrastText',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <IconComponent />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.title}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 400,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Divider />

            {/* Footer */}
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                    Admin Dashboard v1.0.0
                </Typography>
            </Box>
        </Box>
    );
};

export default Sidebar;