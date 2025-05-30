// ChangePassword.jsx
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { validationSchema } from '../validators/ValidationSchema';
import {
    Box,
    Paper,
    Typography,
    Slide,
} from '@mui/material';
import {
    Lock as LockIcon,
} from '@mui/icons-material';
import { authService } from "../services/auth";
import toast from 'react-hot-toast';
import PasswordFormFields from '../components/PasswordFormFields';

const ChangePassword = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await authService.changePassword({
                    new_password: values.newPassword,
                    confirm_password: values.confirmPassword
                });

                if (response.success) {
                    toast.success('Password changed successfully! Redirecting to profile...');
                    navigate('/profile');
                }
            } catch (err) {
                const message = err.response?.data?.detail ||
                    err.response?.data?.error ||
                    'Change Password failed. Please try again.';
                formik.setFieldError('newPassword', message);
            }
        }
    });

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Slide direction="up" in={true} timeout={600}>
                <Paper elevation={8} sx={{ p: 5, width: '100%', maxWidth: 520 }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <LockIcon color="primary" sx={{ fontSize: 40 }} />
                        <Typography variant="h4" gutterBottom>Change Password</Typography>
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
                </Paper>
            </Slide>
        </Box>
    );
};

export default ChangePassword;