import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { validationSchema } from '../validators/ValidationSchema';
import {
    Box,
    Paper,
    Link,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton,
    LinearProgress,
    Divider,
    useTheme,
    Slide,
    Chip
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Close as CloseIcon,
    Check as CheckIcon,
    Lock as LockIcon,
    Security as SecurityIcon
} from '@mui/icons-material';
import { authService } from "../services/auth";
import { calculatePasswordStrength, getPasswordStrengthColor, getPasswordStrengthText } from '../utils/passwordUtils';
import SuccessView from '../components/SuccessView';
import InvalidTokenView from '../components/InvalidTokens';

const ResetPassword = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    const [showPasswords, setShowPasswords] = useState({
        newPassword: false,
        confirmPassword: false
    });
    const [success, setSuccess] = useState(false);
    const [tokenValid, setTokenValid] = useState(true);

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await authService.resetPassword({
                    uid,
                    token,
                    new_password: values.newPassword,
                });

                if (response.status === 200) {
                    setSuccess(true);
                    setTimeout(() => navigate('/login'), 4000);
                }
            } catch (err) {
                const message = err.response?.data?.detail ||
                    err.response?.data?.error ||
                    'Password reset failed. Please try again.';
                formik.setFieldError('newPassword', message);
            }
        }
    });

    const passwordStrength = calculatePasswordStrength(formik.values.newPassword);

    const handleBackToLogin = () => {
        navigate('/login');
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    useEffect(() => {
        if (!uid || !token) {
            setTokenValid(false);
        }
    }, [uid, token]);

    if (!tokenValid) {
        return <InvalidTokenView navigate={navigate} />;
    }

    if (success) {
        return <SuccessView theme={theme} navigate={navigate} />;
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`
        }}>
            <Slide direction="up" in={true} timeout={600}>
                <Paper elevation={8} sx={{ p: 5, width: '100%', maxWidth: 520 }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <LockIcon color="primary" sx={{ fontSize: 40 }} />
                        <Typography variant="h4" gutterBottom>Create New Password</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Your new password must be different from previously used passwords
                        </Typography>
                    </Box>

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="New Password"
                            name="newPassword"
                            type={showPasswords.newPassword ? 'text' : 'password'}
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            margin="normal"
                            required
                            autoFocus
                            error={formik.touched.newPassword && !!formik.errors.newPassword}
                            helperText={formik.touched.newPassword && formik.errors.newPassword}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => togglePasswordVisibility('newPassword')} edge="end">
                                                {showPasswords.newPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                        {formik.values.newPassword && (
                            <Box sx={{ mt: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="body2" sx={{ mr: 2 }}>Password Strength:</Typography>
                                    <Chip
                                        label={getPasswordStrengthText(passwordStrength)}
                                        size="small"
                                        color={getPasswordStrengthColor(passwordStrength)}
                                        variant="outlined"
                                    />
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={(passwordStrength.score / 5) * 100}
                                    color={getPasswordStrengthColor(passwordStrength)}
                                    sx={{ mb: 2 }}
                                />
                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1
                                }}>
                                    {/* {Object.entries(passwordStrength.checks).map(([key, passed]) => (
                                        <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            {passed ? <CheckIcon sx={{ color: theme.palette.success.main }} /> : <CloseIcon sx={{ color: theme.palette.error.main }} />}
                                            <Typography variant="caption" color={passed ? 'success.main' : 'error.main'}>
                                                {{
                                                    length: '6+ characters',
                                                    uppercase: 'Uppercase',
                                                    lowercase: 'Lowercase',
                                                    number: 'Number',
                                                    special: 'Special char'
                                                }[key]}
                                            </Typography>
                                        </Box>
                                    ))} */}
                                </Box>
                            </Box>
                        )}

                        <TextField
                            label="Confirm New Password"
                            name="confirmPassword"
                            type={showPasswords.confirmPassword ? 'text' : 'password'}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            margin="normal"
                            required
                            error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => togglePasswordVisibility('confirmPassword')} edge="end">
                                                {showPasswords.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                        <Alert severity="info" sx={{ mt: 2, mb: 3 }} icon={<SecurityIcon />}>
                            <strong>Security Tips:</strong> Use a strong password with a mix of letters,
                            numbers, and special characters.
                        </Alert>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            disabled={formik.isSubmitting || !formik.isValid || passwordStrength.score < 3}
                            startIcon={formik.isSubmitting ? <CircularProgress size={20} /> : <LockIcon />}
                        >
                            {formik.isSubmitting ? 'Updating Password...' : 'Update Password'}
                        </Button>
                    </form>

                    <Divider sx={{ my: 3 }} />
                    <Box sx={{ textAlign: 'center' }}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleBackToLogin}
                            sx={{ 
                                textDecoration: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            ← Back to Login
                        </Link>
                    </Box>
                </Paper>
            </Slide>
        </Box>
    );
};

export default ResetPassword;