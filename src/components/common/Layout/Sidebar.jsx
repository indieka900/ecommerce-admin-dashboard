import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
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
    Chip,
    IconButton,
    Tooltip,
    Fade,
    Zoom
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
    Store,
    MenuOpen,
    Menu,
    ChevronRight
} from '@mui/icons-material';

const navigationItems = [
    {
        title: 'Dashboard',
        icon: Dashboard,
        path: '/dashboard',
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
                path: '/products',
                color: '#f59e0b'
            },
            // {
            //     title: 'Add Product',
            //     icon: Add,
            //     path: '/admin/products/add',
            //     color: '#10b981'
            // },
            {
                title: 'Categories',
                icon: Category,
                path: '/categories',
                color: '#3b82f6'
            },
            {
                title: 'Brands',
                icon: Business,
                path: '/brands',
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
        title: 'Blogs',
        icon: Analytics,
        color: '#84cc16',
        children: [
            {
                title: 'Blog List',
                icon: Analytics,
                path: '/blog',
                color: '#84cc16'
            },
            {
                title: 'Blog Categories',
                icon: Category,
                path: '/blog/categories',
                color: '#3b82f6'
            }
        ]
    },
    {
        title: 'Settings',
        icon: Settings,
        path: '/admin/settings',
        color: '#6b7280'
    }
];

const Sidebar = ({ onItemClick, onToggleCollapse }) => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [expandedItems, setExpandedItems] = useState(['Products']);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const getDisplayName = () => {
        const first = user?.first_name || '';
        const last = user?.last_name || '';
        return `${first} ${last}`.trim() || 'User';
    };

    const getInitials = () => {
        const first = user?.first_name || '';
        const last = user?.last_name || '';
        return (first.charAt(0) + last.charAt(0)).toUpperCase() || 'U';
    };

    const handleToggle = (title) => {
        if (isCollapsed) {
            setIsCollapsed(false);
            onToggleCollapse?.(false);
            setTimeout(() => {
                setExpandedItems([title]);
            }, 200);
        } else {
            setExpandedItems(prev =>
                prev.includes(title)
                    ? prev.filter(item => item !== title)
                    : [...prev, title]
            );
        }
    };

    const handleNavigation = (path) => {
        if (path) {
            navigate(path);
            onItemClick?.();
        }
    };

    const toggleSidebar = () => {
        const newCollapsedState = !isCollapsed;
        setIsCollapsed(newCollapsedState);

        onToggleCollapse?.(newCollapsedState);
        if (!isCollapsed) {
            setExpandedItems([]);
        }
    };

    const renderNavItem = (item, depth = 0) => {
        const isSelected = location.pathname === item.path;
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.includes(item.title);

        return (
            <React.Fragment key={item.title}>
                <ListItem disablePadding sx={{ pl: depth * 2 }}>
                    {isCollapsed && depth === 0 ? (
                        <Tooltip
                            title={item.title}
                            placement="right"
                            TransitionComponent={Zoom}
                            arrow
                        >
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
                                    justifyContent: 'center',
                                    px: 2.5,
                                    position: 'relative'
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
                                    <item.icon sx={{ color: item.color, fontSize: 22 }} />
                                </ListItemIcon>
                                {item.badge && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: '#ef4444',
                                            animation: 'pulse 2s infinite'
                                        }}
                                    />
                                )}
                                {hasChildren && (
                                    <ChevronRight
                                        sx={{
                                            position: 'absolute',
                                            right: 4,
                                            fontSize: 16,
                                            color: 'text.secondary'
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </Tooltip>
                    ) : (
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
                                opacity: isCollapsed && depth > 0 ? 0 : 1,
                                transition: 'opacity 0.2s ease-in-out'
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <item.icon sx={{ color: item.color, fontSize: 22 }} />
                            </ListItemIcon>
                            <Fade in={!isCollapsed} timeout={200}>
                                <ListItemText
                                    primary={item.title}
                                    slotProps={{
                                        primary: {
                                            fontSize: depth > 0 ? '0.875rem' : '0.95rem',
                                            fontWeight: isSelected ? 600 : 500,
                                            color: isSelected ? '#6366f1' : 'inherit'
                                        }
                                    }}
                                />
                            </Fade>
                            {!isCollapsed && item.badge && (
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
                            {!isCollapsed && hasChildren && (
                                isExpanded ? <ExpandLess /> : <ExpandMore />
                            )}
                        </ListItemButton>
                    )}
                </ListItem>
                {hasChildren && !isCollapsed && (
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
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 0,
            overflow: 'hidden',
            '& > *': {
                borderRadius: 0
            }
        }}>
            {/* Toggle Button */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: isCollapsed ? 'center' : 'flex-end',
                    alignItems: 'center',
                    px: 2,
                    py: 1,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <IconButton
                    onClick={toggleSidebar}
                    sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: 'background.paper',
                        boxShadow: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                            transform: 'scale(1.05)',
                        },
                        transition: 'all 0.2s ease-in-out',
                    }}
                >
                    {isCollapsed ? <Menu sx={{ fontSize: 20 }} /> : <MenuOpen sx={{ fontSize: 20 }} />}
                </IconButton>
            </Box>

            {/* Logo Section */}
            <Box sx={{
                p: isCollapsed ? 2 : 3,
                textAlign: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                flexShrink: 0,
                transition: 'padding 0.3s ease-in-out'
            }}>
                {isCollapsed ? (
                    <Tooltip title="AdminPro Management System" placement="right" arrow>
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                                margin: '0 auto'
                            }}
                        >
                            <Store sx={{ fontSize: 20 }} />
                        </Avatar>
                    </Tooltip>
                ) : (
                    <Fade in={!isCollapsed} timeout={300}>
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
                    </Fade>
                )}
            </Box>

            {/* Navigation */}
            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                py: 2,
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}>
                <List sx={{ width: '100%' }}>
                    {navigationItems.map(item => renderNavItem(item))}
                </List>
            </Box>

            {/* User Profile Section */}
            <Box sx={{
                p: isCollapsed ? 2 : 3,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                flexShrink: 0,
                transition: 'padding 0.3s ease-in-out'
            }}>
                {isCollapsed ? (
                    <Tooltip
                        title={`${getDisplayName()} (${user?.role})`}
                        placement="right"
                        arrow
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            {user?.profile_picture ? (
                                <Avatar
                                    src={user.profile_picture}
                                    alt={getDisplayName()}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        background: 'linear-gradient(45deg, #10b981, #06b6d4)',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.1)'
                                        }
                                    }}
                                />
                            ) : (
                                <Avatar
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        background: 'linear-gradient(45deg, #10b981, #06b6d4)',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.1)'
                                        }
                                    }}
                                >
                                    {getInitials()}
                                </Avatar>
                            )}
                        </Box>
                    </Tooltip>
                ) : (
                    <Fade in={!isCollapsed} timeout={300}>
                        <Paper
                            sx={{
                                p: 2,
                                background: 'rgba(99, 102, 241, 0.1)',
                                border: '1px solid rgba(99, 102, 241, 0.2)',
                                borderRadius: 2
                            }}
                        >
                            <Box display="flex" alignItems="center">
                                {user?.profile_picture ? (
                                    <Avatar
                                        src={user.profile_picture}
                                        alt={getDisplayName()}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            background: 'linear-gradient(45deg, #10b981, #06b6d4)',
                                            mr: 2
                                        }}
                                    />
                                ) : (
                                    <Avatar
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            background: 'linear-gradient(45deg, #10b981, #06b6d4)',
                                            mr: 2
                                        }}
                                    >
                                        {getInitials()}
                                    </Avatar>
                                )}
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                        color="white"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {getDisplayName()}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {user?.role}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Fade>
                )}
            </Box>

            <style jsx >{`
                @keyframes pulse {
                    0% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
                    }
                    70% {
                        transform: scale(1);
                        box-shadow: 0 0 0 4px rgba(239, 68, 68, 0);
                    }
                    100% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
                    }
                }
            `}</style>
        </Box>
    );
};

export default Sidebar;