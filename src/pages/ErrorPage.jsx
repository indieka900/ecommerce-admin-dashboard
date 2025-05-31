import { useRouteError } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h4" color="error" gutterBottom>
                Unexpected Error
            </Typography>
            <Typography variant="body1" color="textSecondary">
                {error.statusText || error.message}
            </Typography>
        </Box>
    );
};

export default ErrorPage;
