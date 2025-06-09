import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Paper,
    Typography,
    Slide,
    Button,
    CircularProgress,
    Alert,
    FormHelperText
} from '@mui/material';
import { useState } from 'react';
import {
    Lock as LockIcon,
    Security as SecurityIcon,
    Email as EmailIcon
} from '@mui/icons-material';
import { authService } from "../services/auth";
import toast from 'react-hot-toast';
import CustomTextField from '../components/CustomTextField';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email').required('Email is required'),
});

const AddAdmin = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);
                const response = await authService.addAdmin({
                    email: values.email,
                });

                if (response.success) {
                    toast.success('Administrator added successfully. An email has been sent.');
                    formik.resetForm();
                    navigate('/');
                }
            } catch (err) {
                const message = err.response?.data?.detail ||
                    err.response?.data?.error ||
                    'Failed to add administrator. Please try again.';
                toast.error(message);
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Slide direction="up" in={true} timeout={500}>
                <Paper elevation={6} sx={{ p: 5, width: '100%', maxWidth: 500, borderRadius: 3 }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <LockIcon color="primary" sx={{ fontSize: 40 }} />
                        <Typography variant="h5" gutterBottom>
                            Add New Admin
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Enter the email of the person you'd like to grant admin access.
                        </Typography>
                    </Box>

                    <form onSubmit={formik.handleSubmit} noValidate>
                        <CustomTextField
                            register={formik.getFieldProps}
                            name="email"
                            label="Admin Email"
                            icon={EmailIcon }
                            type="email"
                            fullWidth
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        <Alert severity="info" sx={{ mt: 2, mb: 2 }} icon={<SecurityIcon />}>
                            <strong>Security Tip:</strong> The new admin will receive an email to set their password.
                        </Alert>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            disabled={isSubmitting || !formik.isValid || !formik.dirty}
                            startIcon={isSubmitting ? <CircularProgress size={20} /> : <LockIcon />}
                            sx={{ mt: 1 }}
                        >
                            {isSubmitting ? 'Submitting...' : 'Add Admin'}
                        </Button>

                        {formik.status && (
                            <FormHelperText error sx={{ mt: 1 }}>
                                {formik.status}
                            </FormHelperText>
                        )}
                    </form>
                </Paper>
            </Slide>
        </Box>
    );
};

export default AddAdmin;
