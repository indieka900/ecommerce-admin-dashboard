import { useState } from "react";
import { 
    Button, 
    TextField, 
    Typography, 
    Paper, 
    Box, 
    useTheme,
    Alert,
    CircularProgress,
    Divider,
    Link,
    InputAdornment,
    IconButton,
    Fade,
    Slide
} from "@mui/material";
import { 
    Email as EmailIcon,
    ArrowBack as ArrowBackIcon,
    Security as SecurityIcon,
    CheckCircle as CheckCircleIcon,
    ErrorOutline as ErrorIcon,
    Refresh as RefreshIcon
} from "@mui/icons-material";
import { authService } from "../services/auth";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [validationErrors, setValidationErrors] = useState({});
    const theme = useTheme();

    // Email validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setError("");
        setValidationErrors({});
        
        // Real-time validation
        if (value && !validateEmail(value)) {
            setValidationErrors({ email: "Please enter a valid email address" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setValidationErrors({});

        // Validation checks
        if (!email) {
            setValidationErrors({ email: "Email address is required" });
            return;
        }

        if (!validateEmail(email)) {
            setValidationErrors({ email: "Please enter a valid email address" });
            return;
        }

        setLoading(true);

        try {
            
            const response = await authService.resetPassword(email);

            if (response.success) {
                setSubmitted(true);
                startResendTimer();
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to send reset link. Please try again.");
            }
        } catch (err) {
            console.error('Forgot password error:', err);
            setError("Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    const startResendTimer = () => {
        setResendTimer(60);
        const timer = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleResend = () => {
        if (resendTimer === 0) {
            handleSubmit({ preventDefault: () => {} });
        }
    };

    const handleBackToLogin = () => {
        // Replace with your navigation logic
        window.location.href = '/login';
    };

    const resetForm = () => {
        setSubmitted(false);
        setEmail("");
        setError("");
        setValidationErrors({});
        setResendTimer(0);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: 2,
                position: 'relative'
            }}
        >
            {/* Background decoration */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    opacity: 0.3
                }}
            />
            
            <Slide direction="up" in={true} timeout={600}>
                <Paper 
                    elevation={8} 
                    sx={{ 
                        p: 5, 
                        borderRadius: 3, 
                        bgcolor: theme.palette.background.paper,
                        maxWidth: 450,
                        width: '100%',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <SecurityIcon 
                            sx={{ 
                                fontSize: 48, 
                                color: theme.palette.primary.main, 
                                mb: 2 
                            }} 
                        />
                        <Typography 
                            variant="h4" 
                            gutterBottom 
                            sx={{ 
                                fontWeight: 600,
                                color: theme.palette.text.primary 
                            }}
                        >
                            Admin Password Reset
                        </Typography>
                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ maxWidth: 300, mx: 'auto' }}
                        >
                            {submitted 
                                ? "Check your email for reset instructions"
                                : "Enter your admin email to receive a password reset link"
                            }
                        </Typography>
                    </Box>

                    {/* Success State */}
                    {submitted ? (
                        <Fade in={submitted} timeout={800}>
                            <Box sx={{ textAlign: 'center' }}>
                                <CheckCircleIcon 
                                    sx={{ 
                                        fontSize: 64, 
                                        color: 'success.main', 
                                        mb: 2 
                                    }} 
                                />
                                
                                <Alert 
                                    severity="success" 
                                    sx={{ mb: 3, textAlign: 'left' }}
                                >
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        <strong>Reset link sent successfully!</strong>
                                    </Typography>
                                    <Typography variant="body2">
                                        If an admin account exists with <strong>{email}</strong>, 
                                        you'll receive a password reset link within 5 minutes.
                                    </Typography>
                                </Alert>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Didn't receive the email? Check your spam folder or:
                                    </Typography>
                                    
                                    <Button
                                        variant="outlined"
                                        startIcon={<RefreshIcon />}
                                        onClick={handleResend}
                                        disabled={resendTimer > 0}
                                        sx={{ mt: 1, mb: resendTimer > 0 ? 1 : 0 }}
                                    >
                                        {resendTimer > 0 
                                            ? `Resend in ${resendTimer}s` 
                                            : "Resend Email"
                                        }
                                    </Button>
                                    
                                    {resendTimer > 0 && (
                                        <Typography variant="caption" display="block" color="text.secondary">
                                            Please wait before requesting another email
                                        </Typography>
                                    )}
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<ArrowBackIcon />}
                                        onClick={handleBackToLogin}
                                        fullWidth
                                    >
                                        Back to Login
                                    </Button>
                                    
                                    <Button
                                        variant="text"
                                        onClick={resetForm}
                                        color="primary"
                                    >
                                        Try Different Email
                                    </Button>
                                </Box>
                            </Box>
                        </Fade>
                    ) : (
                        /* Form State */
                        <Fade in={!submitted} timeout={400}>
                            <Box>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        label="Admin Email Address"
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        fullWidth
                                        margin="normal"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        error={!!validationErrors.email}
                                        helperText={validationErrors.email}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ mb: 2 }}
                                    />

                                    {/* Error Display */}
                                    {error && (
                                        <Alert 
                                            severity="error" 
                                            sx={{ mb: 2 }}
                                            icon={<ErrorIcon />}
                                        >
                                            {error}
                                        </Alert>
                                    )}

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        disabled={loading || !!validationErrors.email}
                                        startIcon={loading ? <CircularProgress size={20} /> : <EmailIcon />}
                                        sx={{ 
                                            py: 1.5, 
                                            mt: 1,
                                            fontWeight: 600,
                                            textTransform: 'none'
                                        }}
                                    >
                                        {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
                                    </Button>
                                </form>

                                <Divider sx={{ my: 3 }} />

                                {/* Footer Actions */}
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Remember your password?
                                    </Typography>
                                    
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
                                        Back to Admin Login
                                    </Link>
                                </Box>

                                {/* Support Contact */}
                                <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                                    <Typography variant="caption" color="text.secondary" align="center" display="block">
                                        Need help? Contact IT Support at{' '}
                                        <Link href="mailto:indiekaj@gmail.com" underline="hover">
                                            indiekaj@gmail.com
                                        </Link>
                                        {' '}or call (071) 328-3900
                                    </Typography>
                                </Box>
                            </Box>
                        </Fade>
                    )}
                </Paper>
            </Slide>
        </Box>
    );
};

export default ForgotPassword;