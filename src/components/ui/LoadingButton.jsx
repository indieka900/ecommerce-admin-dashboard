import {
    Button,
    CircularProgress,
    Box
} from '@mui/material';

const LoadingButton = ({ 
    children, 
    loading = false, 
    loadingText = 'Loading...', 
    disabled = false,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    loadingIndicator,
    sx = {},
    ...props 
}) => {
    const defaultLoadingIndicator = (
        <CircularProgress
            size={16}
            color="inherit"
            thickness={4}
        />
    );

    return (
        <Button
            variant={variant}
            color={color}
            size={size}
            disabled={disabled || loading}
            sx={{
                position: 'relative',
                ...sx
            }}
            {...props}
        >
            {loading && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    {loadingIndicator || defaultLoadingIndicator}
                    {loadingText}
                </Box>
            )}
            {!loading && children}
        </Button>
    );
};

export default LoadingButton;