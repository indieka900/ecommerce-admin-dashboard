import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeProvider';
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
    Divider,
    AppBar
} from '@mui/material';
import {
    Settings,
    Menu as MenuIcon,
    Notifications,
    Search,
    Logout,
    Person,
    LightMode,
    DarkMode,
} from '@mui/icons-material';


const Header = ({ onMenuClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, logout } = useAuth()
    const { mode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [notificationAnchor, setNotificationAnchor] = useState(null);

    const handleGoToProfile = () => {
        navigate('/profile');
        handleClose();
    };

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationClick = (event) => {
        setNotificationAnchor(event.currentTarget);
    };

    const getDisplayName = () => {
        const first = user?.first_name || '';
        const last = user?.last_name || '';
        return `${first} ${last}`.trim() || 'User';
    };

    const handleClose = () => {
        setAnchorEl(null);
        setNotificationAnchor(null);
    };

    return (
        <AppBar>
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
                    <Typography variant="h6" fontWeight="bold" color="primary">
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
                        {mode === 'dark' ? <LightMode /> : <DarkMode />}
                    </IconButton>

                    <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
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
                            getDisplayName().charAt(0)
                        )}

                    </IconButton>

                    {/* Profile Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleGoToProfile}>
                            <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
                            Settings
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={logout}>
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
        </AppBar>

    );
};

export default Header;