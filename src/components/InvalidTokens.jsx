import { Box, Paper, Typography, Button } from '@mui/material';

const InvalidTokenView = ({ navigate }) => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={8} sx={{ p: 4 }}>
                <Typography variant="h6" color="error">Invalid reset link</Typography>
                <Button onClick={() => navigate('/login')} sx={{ mt: 2 }}>
                    Back to Login
                </Button>
            </Paper>
        </Box>
    );
};

export default InvalidTokenView;