import { Paper, Box, Typography, Stack, Button, useTheme } from '@mui/material';

const PageHeader = ({
    title,
    subtitle,
    actions = [],
    color = 'primary',
}) => {
    const theme = useTheme();

    const getGradient = (colorKey) => {
        const palette = theme.palette[colorKey];

        if (palette?.main && palette?.dark) {
            return `linear-gradient(135deg, ${palette.main} 0%, ${palette.dark} 100%)`;
        }

        // fallback default
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    };

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                mb: 4,
                background: getGradient(color),
                color: 'white',
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                <Box>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                        {subtitle}
                    </Typography>
                </Box>

                {actions.length > 0 && (
                    <Stack direction="row" spacing={2}>
                        {actions.map((action, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                startIcon={action.icon}
                                onClick={action.onClick}
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(10px)',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                                }}
                            >
                                {action.label}
                            </Button>
                        ))}
                    </Stack>
                )}
            </Box>
        </Paper>
    );
};

export default PageHeader;
