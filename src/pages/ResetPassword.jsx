import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { validationSchema } from '../validators/ValidationSchema';
import {
    Box,
    Paper,
    Link,
    Typography,
    Divider,
    useTheme,
    Slide,
} from '@mui/material';
import {
    Lock as LockIcon,
} from '@mui/icons-material';
import { authService } from "../services/auth";
import SuccessView from '../components/SuccessView';
import InvalidTokenView from '../components/InvalidTokens';
import PasswordFormFields from '../components/PasswordFormFields';

const ResetPassword = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

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

    const handleBackToLogin = () => {
        navigate('/login');
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
                        <PasswordFormFields
                            formik={formik}
                            isSubmitting={formik.isSubmitting}
                            submitButtonText="Update Password"
                            submittingText="Updating Password..."
                        />
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