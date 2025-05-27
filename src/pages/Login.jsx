import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Alert,
    InputAdornment,
    IconButton,
    CircularProgress,
    Container,
    Avatar,
    Divider,
    Link
} from '@mui/material';
import {
    Email,
    Lock,
    Visibility,
    VisibilityOff,
    AdminPanelSettings,
    Login as LoginIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Validation schema
const loginSchema = yup.object({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(4, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated, user } = useAuth();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && user?.role === 'Administrator') {
            const from = location.state?.from?.pathname || '/dashboard';
            console.log('Already authenticated, redirecting to:', from);
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, user, navigate, location]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setLoginError('');

        try {
            
            // Attempt login
            const response = await login(data);

            // Double-check user role (should already be validated in authService)
            if (response.user?.role !== 'Administrator') {
                setLoginError('Access denied. Administrator privileges required.');
                toast.error('Access denied. Administrator privileges required.');
                return;
            }

            // Success toast
            toast.success(`Welcome back, ${response.user.first_name || response.user.email}!`);

            // Get the intended destination or default to homepage/dashboard
            const from = location.state?.from?.pathname || '/dashboard'; 
            
            // Use setTimeout to ensure state updates have propagated
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 100);

        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.message || 'Login failed. Please try again.';
            setLoginError(errorMessage);
            toast.error(errorMessage);

            // Reset form on error
            reset({ email: data.email, password: '' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
        toast.info('Forgot password functionality will be implemented');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: 2
            }}
        >
            <Container maxWidth="sm">
                <Card
                    elevation={24}
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.95)'
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        {/* Header */}
                        <Box textAlign="center" mb={4}>
                            <Avatar
                                sx={{
                                    mx: 'auto',
                                    mb: 2,
                                    bgcolor: 'primary.main',
                                    width: 64,
                                    height: 64
                                }}
                            >
                                <AdminPanelSettings fontSize="large" />
                            </Avatar>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                Admin Portal
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Sign in to access the administration dashboard
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        {/* Error Alert */}
                        {loginError && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {loginError}
                            </Alert>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Box mb={3}>
                                <TextField
                                    {...register('email')}
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Email color="action" />
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                />
                            </Box>

                            <Box mb={3}>
                                <TextField
                                    {...register('password')}
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock color="action" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleTogglePassword}
                                                        edge="end"
                                                        aria-label="toggle password visibility"
                                                    >
                                                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                />
                            </Box>

                            {/* Forgot Password Link */}
                            <Box display="flex" justifyContent="flex-end" mb={3}>
                                <Link
                                    component="button"
                                    type="button"
                                    variant="body2"
                                    onClick={handleForgotPassword}
                                    sx={{ textDecoration: 'none' }}
                                >
                                    Forgot password?
                                </Link>
                            </Box>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={isLoading}
                                startIcon={isLoading ? <CircularProgress size={20} /> : <LoginIcon />}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                                    }
                                }}
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>

                        {/* Footer */}
                        <Box textAlign="center" mt={4}>
                            <Typography variant="body2" color="text.secondary">
                                Only administrators can access this portal
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Login;

