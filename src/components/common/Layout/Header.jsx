import React from 'react';
import {
    Toolbar,
    IconButton,
    Typography,
    Box,
    Avatar,
    Menu,
    MenuItem,
    Badge,
    Divider
} from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications,
    AccountCircle,
    Settings,
    Logout
} from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';

const Header = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        logout();
    };

    return (
        <Toolbar>
            {/* Mobile menu button */}
            <IconButton
                color="inherit"
                edge="start"
                onClick={onMenuClick}
                sx={{ mr: 2, display: { md: 'none' } }}
            >
                <MenuIcon />
            </IconButton>

            {/* Title */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Admin Dashboard
            </Typography>

            {/* Header actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Notifications */}
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="error">
                        <Notifications />
                    </Badge>
                </IconButton>

                {/* User menu */}
                <IconButton
                    color="inherit"
                    onClick={handleMenuOpen}
                    sx={{ ml: 1 }}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {user?.first_name?.[0] || user?.email?.[0] || 'A'}
                    </Avatar>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                    PaperProps={{
                        elevation: 3,
                        sx: {
                            mt: 1.5,
                            minWidth: 200,
                        },
                    }}
                >
                    <Box sx={{ px: 2, py: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {user?.first_name} {user?.last_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user?.email}
                        </Typography>
                        <Typography variant="caption" color="primary">
                            {user?.role}
                        </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleMenuClose}>
                        <AccountCircle sx={{ mr: 2 }} />
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <Settings sx={{ mr: 2 }} />
                        Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <Logout sx={{ mr: 2 }} />
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
        </Toolbar>
    );
};

export default Header;
