import { Card, CardContent, Box, Typography, Avatar, Skeleton, useTheme, alpha } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

const MetricCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
    trend,
    loading,
    onClick,
    sx = {}
}) => {
    const theme = useTheme();

    if (loading) {
        return (
            <Card sx={{ height: '100%', ...sx }}>
                <CardContent>
                    <Skeleton variant="rectangular" height={120} />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            onClick={onClick}
            sx={{
                height: '100%',
                background: `linear-gradient(135deg, ${alpha(color || theme.palette.primary.main, 0.1)} 0%, ${alpha(color || theme.palette.primary.main, 0.05)} 100%)`,
                border: `1px solid ${alpha(color || theme.palette.primary.main, 0.2)}`,
                cursor: onClick ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                '&:hover': onClick ? {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                } : {},
                ...sx
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                        <Typography color="text.secondary" variant="body2" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                            {value}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body2" color="text.secondary">
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                    {Icon && (
                        <Avatar
                            sx={{
                                bgcolor: alpha(color || theme.palette.primary.main, 0.2),
                                color: color || theme.palette.primary.main,
                                width: 28,
                                height: 28,
                                p: 0.5,
                            }}
                        >
                            <Icon />
                        </Avatar>
                    )}
                </Box>
                {trend !== undefined && trend !== null && (
                    <Box display="flex" alignItems="center" mt={2}>
                        {trend > 0 ? (
                            <TrendingUp sx={{ color: 'success.main', mr: 0.5, fontSize: 20 }} />
                        ) : (
                            <TrendingDown sx={{ color: 'error.main', mr: 0.5, fontSize: 20 }} />
                        )}
                        <Typography
                            variant="body2"
                            color={trend > 0 ? 'success.main' : 'error.main'}
                            fontWeight="medium"
                        >
                            {Math.abs(trend)}% from last period
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default MetricCard;