import { Fade, Paper, Typography, Alert, LinearProgress, Button } from '@mui/material';
import { CheckCircle as CheckCircleIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const SuccessView = ({ theme, navigate }) => {
    return (
        <Fade in={true} timeout={800}>
            <Paper elevation={8} sx={{ p: 6, textAlign: 'center', maxWidth: 480 }}>
                <CheckCircleIcon sx={{ fontSize: 60, color: theme.palette.success.main, mb: 2 }} />
                <Typography variant="h4" gutterBottom>Password Reset Successful!</Typography>
                <Alert severity="success" sx={{ mb: 4, textAlign: 'left' }}>
                    Your password has been successfully updated.
                </Alert>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Redirecting to login page...
                </Typography>
                <LinearProgress sx={{ mb: 3 }} />
                <Button
                    variant="contained"
                    onClick={() => navigate('/login')}
                    startIcon={<ArrowBackIcon />}
                    size="large"
                    fullWidth
                >
                    Go to Login Now
                </Button>
            </Paper>
        </Fade>
    );
};

export default SuccessView;