import {
    CircularProgress,
    Box,
    Typography,
    Backdrop,
    useTheme
} from '@mui/material';

const LoadingSpinner = ({ 
    size = 40, 
    color = 'primary', 
    thickness = 3.6,
    fullScreen = false,
    overlay = false,
    message = '',
    sx = {},
    ...props 
}) => {
    const theme = useTheme();

    const spinner = (
        <CircularProgress
            size={size}
            color={color}
            thickness={thickness}
            sx={sx}
            {...props}
        />
    );

    if (fullScreen) {
        return (
            <Backdrop
                open={true}
                sx={{
                    color: '#fff',
                    zIndex: theme.zIndex.modal + 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                >
                    {spinner}
                    {message && (
                        <Typography variant="body1" color="inherit">
                            {message}
                        </Typography>
                    )}
                </Box>
            </Backdrop>
        );
    }

    if (overlay) {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    zIndex: 10,
                    gap: 1
                }}
            >
                {spinner}
                {message && (
                    <Typography variant="body2" color="text.secondary">
                        {message}
                    </Typography>
                )}
            </Box>
        );
    }

    return (
        <Box display="inline-flex" alignItems="center" gap={1}>
            {spinner}
            {message && (
                <Typography variant="body2" color="text.secondary">
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default LoadingSpinner;