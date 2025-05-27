import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import {
    Box,
    Toolbar,
    Typography,
    ListItemIcon,
    Avatar,
    Badge,
    IconButton,
    Menu,
    MenuItem,
    Divider
} from '@mui/material';
import {
    Settings,
    Menu as MenuIcon,
    Notifications,
    Search,
    Logout,
    Person,
    DarkMode,
} from '@mui/icons-material';


const Header = ({ onMenuClick, toggleTheme, mode }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationAnchor, setNotificationAnchor] = useState(null);

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationClick = (event) => {
        setNotificationAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setNotificationAnchor(null);
    };

    return (
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box display="flex" alignItems="center">
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" fontWeight="bold" color="white">
                    Admin Dashboard
                </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
                <IconButton color="inherit">
                    <Search />
                </IconButton>

                <IconButton color="inherit" onClick={handleNotificationClick}>
                    <Badge badgeContent={4} color="error">
                        <Notifications />
                    </Badge>
                </IconButton>

                <IconButton color="inherit" onClick={toggleTheme}>
                    {mode === 'dark' ? <DarkMode /> : <DarkMode sx={{ opacity: 0.5 }} />}
                </IconButton>

                <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            background: 'linear-gradient(45deg, #10b981, #06b6d4)'
                        }}
                    >
                        J
                    </Avatar>
                </IconButton>

                {/* Profile Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
                        Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={useAuth().logout}>
                        <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>

                {/* Notifications Menu */}
                <Menu
                    anchorEl={notificationAnchor}
                    open={Boolean(notificationAnchor)}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose}>
                        <Typography variant="body2">New order received</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Typography variant="body2">Product out of stock</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Typography variant="body2">Customer review pending</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Toolbar>
    );
};

export default Header;