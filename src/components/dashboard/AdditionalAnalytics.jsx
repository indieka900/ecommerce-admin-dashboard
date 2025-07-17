import { Grid } from '@mui/material';
import ChartCard from './ChartCard';
import { Skeleton, Box, Stack, Typography, Chip, LinearProgress, Divider, List, ListItem, ListItemAvatar, ListItemText, Avatar, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { CreditCard } from '@mui/icons-material';

const AdditionalAnalytics = ({
    loading,
    orders,
    payments,
    charts,
    formatCurrency,
    theme
}) => {
    // Prepare hourly distribution data for heatmap
    const hourlyData = charts.hourly_distribution || [];
    const maxHourlyOrders = Math.max(...hourlyData.map(h => h.count || 0));

    return (
        <Grid container spacing={3} mb={3}>
            {/* Order Processing Metrics */}
            <Grid
                size={{
                    xs: 12,
                    md: 4
                }}>
                <ChartCard title="Order Processing">
                    {loading ? (
                        <Skeleton variant="rectangular" height={320} />
                    ) : (
                        <Box>
                            <Stack spacing={2}>
                                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Pending Orders
                                        </Typography>
                                        <Chip label={orders.pending || 0} color="warning" size="small" />
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(orders.pending / orders.total) * 100 || 0}
                                        sx={{ height: 8, borderRadius: 4 }}
                                        color="warning"
                                    />
                                </Box>

                                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Processing
                                        </Typography>
                                        <Chip label={orders.processing || 0} color="info" size="small" />
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(orders.processing / orders.total) * 100 || 0}
                                        sx={{ height: 8, borderRadius: 4 }}
                                        color="info"
                                    />
                                </Box>

                                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Shipped
                                        </Typography>
                                        <Chip label={orders.shipped || 0} color="primary" size="small" />
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(orders.shipped / orders.total) * 100 || 0}
                                        sx={{ height: 8, borderRadius: 4 }}
                                    />
                                </Box>

                                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Cancelled
                                        </Typography>
                                        <Chip label={orders.cancelled || 0} color="error" size="small" />
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(orders.cancelled / orders.total) * 100 || 0}
                                        sx={{ height: 8, borderRadius: 4 }}
                                        color="error"
                                    />
                                </Box>
                            </Stack>

                            <Box textAlign="center" mt={3}>
                                <Typography variant="h5" color="primary">
                                    {orders.avg_processing_days || 0} days
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Average Processing Time
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </ChartCard>
            </Grid>
            {/* Payment Methods */}
            <Grid
                size={{
                    xs: 12,
                    md: 4
                }}>
                <ChartCard title="Payment Analytics">
                    {loading ? (
                        <Skeleton variant="rectangular" height={320} />
                    ) : (
                        <Box>
                            <Box display="flex" justifyContent="space-around" mb={3}>
                                <Box textAlign="center">
                                    <Typography variant="h5" color="success.main">
                                        {payments.success_rate || 0}%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Success Rate
                                    </Typography>
                                </Box>
                                <Box textAlign="center">
                                    <Typography variant="h5" color="error">
                                        {payments.failed?.count || 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Failed
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <List dense>
                                {(payments.payment_methods || []).map((method, index) => (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: COLORS[index % COLORS.length], width: 36, height: 36 }}>
                                                <CreditCard fontSize="small" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={method.payment_method || 'Unknown'}
                                            secondary={`${method.count} transactions`}
                                        />
                                        <Typography variant="body2" fontWeight="bold">
                                            {formatCurrency(method.total)}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                </ChartCard>
            </Grid>
            {/* Hourly Distribution */}
            <Grid
                size={{
                    xs: 12,
                    md: 4
                }}>
                <ChartCard title="Peak Hours">
                    {loading ? (
                        <Skeleton variant="rectangular" height={320} />
                    ) : (
                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Order distribution by hour
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, mt: 2 }}>
                                {[...Array(24)].map((_, hour) => {
                                    const hourData = hourlyData.find(h => h.hour === hour) || { count: 0 };
                                    const intensity = maxHourlyOrders > 0 ? hourData.count / maxHourlyOrders : 0;

                                    return (
                                        <Tooltip key={hour} title={`${hour}:00 - ${hourData.count} orders`}>
                                            <Box
                                                sx={{
                                                    aspectRatio: '1',
                                                    bgcolor: alpha(theme.palette.primary.main, intensity * 0.8 + 0.1),
                                                    borderRadius: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: 2
                                                    }
                                                }}
                                            >
                                                <Typography variant="caption" sx={{
                                                    color: intensity > 0.5 ? 'white' : 'text.primary',
                                                    fontWeight: intensity > 0.5 ? 'bold' : 'normal'
                                                }}>
                                                    {hour}
                                                </Typography>
                                            </Box>
                                        </Tooltip>
                                    );
                                })}
                            </Box>
                            <Box mt={3}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Peak Hours
                                </Typography>
                                {hourlyData
                                    .sort((a, b) => b.count - a.count)
                                    .slice(0, 3)
                                    .map((hour, index) => (
                                        <Box key={index} display="flex" justifyContent="space-between" mb={1}>
                                            <Typography variant="body2">
                                                {hour.hour}:00 - {hour.hour + 1}:00
                                            </Typography>
                                            <Typography variant="body2" fontWeight="bold" color="primary">
                                                {hour.count} orders
                                            </Typography>
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                    )}
                </ChartCard>
            </Grid>
        </Grid>
    );
};

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'];

export default AdditionalAnalytics;