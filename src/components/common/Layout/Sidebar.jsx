import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Avatar,
    Paper,
    Chip
} from '@mui/material';
import {
    ExpandLess,
    ExpandMore,
    Store
} from '@mui/icons-material';

const navigationItems = [
    {
        title: 'Dashboard',
        icon: Dashboard,
        path: '/admin/dashboard',
        color: '#6366f1'
    },
    {
        title: 'Products',
        icon: Inventory,
        color: '#f59e0b',
        children: [
            {
                title: 'Product List',
                icon: Inventory,
                path: '/admin/products',
                color: '#f59e0b'
            },
            {
                title: 'Add Product',
                icon: Add,
                path: '/admin/products/add',
                color: '#10b981'
            },
            {
                title: 'Categories',
                icon: Category,
                path: '/admin/products/categories',
                color: '#3b82f6'
            },
            {
                title: 'Brands',
                icon: Business,
                path: '/admin/products/brands',
                color: '#8b5cf6'
            }
        ]
    },
    {
        title: 'Orders',
        icon: ShoppingCart,
        path: '/admin/orders',
        color: '#ef4444',
        badge: 12
    },
    {
        title: 'Customers',
        icon: People,
        path: '/admin/customers',
        color: '#06b6d4'
    },
    {
        title: 'Analytics',
        icon: Analytics,
        path: '/admin/analytics',
        color: '#84cc16'
    },
    {
        title: 'Settings',
        icon: Settings,
        path: '/admin/settings',
        color: '#6b7280'
    }
];

const Sidebar = ({ onItemClick }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [expandedItems, setExpandedItems] = useState(['Products']);

    const handleToggle = (title) => {
        setExpandedItems(prev => 
            prev.includes(title) 
                ? prev.filter(item => item !== title)
                : [...prev, title]
        );
    };

    const handleNavigation = (path) => {
        if (path) {
            navigate(path);
            onItemClick?.();
        }
    };

    const renderNavItem = (item, depth = 0) => {
        const isSelected = location.pathname === item.path;
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.includes(item.title);

        return (
            <React.Fragment key={item.title}>
                <ListItem disablePadding sx={{ pl: depth * 2 }}>
                    <ListItemButton
                        selected={isSelected}
                        onClick={() => {
                            if (hasChildren) {
                                handleToggle(item.title);
                            } else {
                                handleNavigation(item.path);
                            }
                        }}
                        sx={{
                            minHeight: 48,
                            pl: depth > 0 ? 4 : 2,
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <item.icon sx={{ color: item.color, fontSize: 22 }} />
                        </ListItemIcon>
                        <ListItemText 
                            primary={item.title}
                            primaryTypographyProps={{
                                fontSize: depth > 0 ? '0.875rem' : '0.95rem',
                                fontWeight: isSelected ? 600 : 500,
                                color: isSelected ? '#6366f1' : 'inherit'
                            }}
                        />
                        {item.badge && (
                            <Chip 
                                label={item.badge} 
                                size="small" 
                                sx={{ 
                                    backgroundColor: '#ef4444',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    height: 20,
                                    minWidth: 20
                                }} 
                            />
                        )}
                        {hasChildren && (
                            isExpanded ? <ExpandLess /> : <ExpandMore />
                        )}
                    </ListItemButton>
                </ListItem>
                {hasChildren && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            {item.children.map(child => renderNavItem(child, depth + 1))}
                        </List>
                    </Collapse>
                )}
            </React.Fragment>
        );
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Logo Section */}
            <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                    }}
                >
                    <Avatar
                        sx={{
                            width: 48,
                            height: 48,
                            background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                            mr: 2
                        }}
                    >
                        <Store sx={{ fontSize: 24 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h6" fontWeight="bold" color="white">
                            AdminPro
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Management System
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Navigation */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 2 }}>
                <List>
                    {navigationItems.map(item => renderNavItem(item))}
                </List>
            </Box>

            {/* User Profile Section */}
            <Box sx={{ p: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Paper
                    sx={{
                        p: 2,
                        background: 'rgba(99, 102, 241, 0.1)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        borderRadius: 2
                    }}
                >
                    <Box display="flex" alignItems="center">
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                background: 'linear-gradient(45deg, #10b981, #06b6d4)',
                                mr: 2
                            }}
                        >
                            J
                        </Avatar>
                        <Box>
                            <Typography variant="body2" fontWeight="bold" color="white">
                                John Doe
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Administrator
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Sidebar;