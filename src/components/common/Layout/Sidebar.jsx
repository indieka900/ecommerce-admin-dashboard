import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useDashboardStats } from '../../../hooks/userOrder';
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
    Zoom,
    Divider
} from '@mui/material';
import {
    ExpandLess,
    ExpandMore,
    MenuOpen,
    Menu,
    ChevronRight
} from '@mui/icons-material';
import { navigationItems } from '../../../utils/navigationItems';

const Sidebar = ({ onItemClick, onToggleCollapse }) => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [expandedItems, setExpandedItems] = useState(['Orders']); // Default expanded
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Get pending orders count for badge
    const { stats } = useDashboardStats();
    const pendingOrdersCount = stats?.pending_orders || 0;

    const getDisplayName = () => {
        const first = user?.first_name || '';
        const last = user?.last_name || '';
        return `${first} ${last}`.trim() || 'User';
    };

    const handleNavigation = (path) => {
        navigate(path);
        if (onItemClick) onItemClick();
    };

    const handleToggle = (title) => {
        setExpandedItems(prev =>
            prev.includes(title)
                ? prev.filter(item => item !== title)
                : [...prev, title]
        );
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        if (onToggleCollapse) onToggleCollapse(!isCollapsed);
    };

    // Check if current path matches the item path
    const isPathActive = (path) => {
        if (!path) return false;
        // Handle query params in path
        const [basePath, queryString] = path.split('?');
        const isActive = location.pathname === basePath;

        // If there's a query string, check if it matches current search params
        if (queryString && isActive) {
            const itemParams = new URLSearchParams(queryString);
            const currentParams = new URLSearchParams(location.search);

            // Check if all item params match current params
            for (let [key, value] of itemParams) {
                if (currentParams.get(key) !== value) return false;
            }
        }

        return isActive;
    };

    // Update navigation items with dynamic data
    const getNavigationItems = () => {
        return navigationItems.map(item => {
            if (item.title === 'Orders' && item.children) {
                return {
                    ...item,
                    badge: pendingOrdersCount,
                    children: item.children.map(child => {
                        if (child.path === '/orders?status=Pending') {
                            return { ...child, badge: pendingOrdersCount };
                        }
                        return child;
                    })
                };
            }
            return item;
        });
    };

    const renderNavItem = (item, depth = 0) => {
        const isSelected = isPathActive(item.path);
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.includes(item.title);

        // Check if any child is selected
        const hasSelectedChild = hasChildren && item.children.some(child => isPathActive(child.path));

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
                                selected={isSelected || hasSelectedChild}
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
                            selected={isSelected || hasSelectedChild}
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
                                    primaryTypographyProps={{
                                        fontSize: depth > 0 ? '0.875rem' : '0.95rem',
                                        fontWeight: isSelected || hasSelectedChild ? 600 : 500,
                                        color: isSelected || hasSelectedChild ? '#6366f1' : 'inherit'
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
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.paper',
                borderRight: 1,
                borderColor: 'divider',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: 64,
                }}
            >
                {!isCollapsed && (
                    <Fade in={!isCollapsed}>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                            Admin Panel
                        </Typography>
                    </Fade>
                )}
                <IconButton onClick={toggleSidebar} size="small">
                    {isCollapsed ? <Menu /> : <MenuOpen />}
                </IconButton>
            </Box>

            <Divider />

            {/* User Info */}
            <Box sx={{ p: 2 }}>
                {isCollapsed ? (
                    <Tooltip title={getDisplayName()} placement="right" arrow>
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                margin: 'auto',
                                cursor: 'pointer',
                                backgroundColor: 'primary.main'
                            }}
                        >
                            {getDisplayName().charAt(0).toUpperCase()}
                        </Avatar>
                    </Tooltip>
                ) : (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            backgroundColor: 'action.hover',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                                backgroundColor: 'action.selected',
                            }
                        }}
                        onClick={() => handleNavigation('/profile')}
                    >
                        <Avatar sx={{ backgroundColor: 'primary.main' }}>
                            {getDisplayName().charAt(0).toUpperCase()}
                        </Avatar>
                        <Box flex={1}>
                            <Typography variant="body2" fontWeight="medium">
                                {getDisplayName()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {user?.email}
                            </Typography>
                        </Box>
                    </Paper>
                )}
            </Box>

            <Divider />

            {/* Navigation Items */}
            <List sx={{ flex: 1, overflow: 'auto', px: 1, py: 2 }}>
                {getNavigationItems().map(item => renderNavItem(item))}
            </List>

            {/* Footer */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                {!isCollapsed ? (
                    <Typography variant="caption" color="text.secondary" align="center" display="block">
                        © 2024 Admin Dashboard
                    </Typography>
                ) : (
                    <Typography variant="caption" color="text.secondary" align="center" display="block">
                        v1.0
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default Sidebar;