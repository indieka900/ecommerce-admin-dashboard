import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
    >
        <Typography variant="h1" color="primary" gutterBottom>
            404
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
            Oops! The page you are looking for does not exist.
        </Typography>
        <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/"
            sx={{ mt: 3 }}
        >
            Go to Home
        </Button>
    </Box>
);

export default NotFound;