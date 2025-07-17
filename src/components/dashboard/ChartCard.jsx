import { Paper, Box, Typography, useTheme } from '@mui/material';

const ChartCard = ({
    title,
    subtitle,
    children,
    height = 400,
    action,
    sx = {}
}) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                height,
                border: `1px solid ${theme.palette.divider}`,
                ...sx
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                    <Typography variant="h6" fontWeight="medium">
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant="body2" color="text.secondary">
                            {subtitle}
                        </Typography>
                    )}
                </Box>
                {action}
            </Box>
            <Box height={`calc(100% - ${subtitle ? 64 : 48}px)`}>
                {children}
            </Box>
        </Paper>
    );
};

export default ChartCard;