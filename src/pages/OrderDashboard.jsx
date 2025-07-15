/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Chip,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    LinearProgress,
    Skeleton,
    useTheme,
    alpha
} from '@mui/material';
import {
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    AttachMoney,
    People,
    LocalShipping,
    Refresh,
    ArrowUpward,
    ArrowDownward,
    Receipt
} from '@mui/icons-material';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { format } from 'date-fns';
import { useDashboardStats, useOrderAnalytics, useRevenueAnalytics } from '../hooks/userOrder';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4'];

const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => {
    const theme = useTheme();

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                        <Typography color="text.secondary" variant="body2" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            {value}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                    <Avatar
                        sx={{
                            bgcolor: alpha(color, 0.1),
                            color: color,
                            width: 56,
                            height: 56
                        }}
                    >
                        <Icon />
                    </Avatar>
                </Box>
                {trend && (
                    <Box display="flex" alignItems="center" mt={2}>
                        {trend > 0 ? (
                            <TrendingUp sx={{ color: 'success.main', mr: 0.5 }} />
                        ) : (
                            <TrendingDown sx={{ color: 'error.main', mr: 0.5 }} />
                        )}
                        <Typography
                            variant="body2"
                            color={trend > 0 ? 'success.main' : 'error.main'}
                            fontWeight="medium"
                        >
                            {Math.abs(trend)}% from last month
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

const OrdersDashboard = () => {
    const theme = useTheme();
    const [analyticsPeriod, setAnalyticsPeriod] = useState(30);
    const [revenuePeriod, setRevenuePeriod] = useState('monthly');

    const { stats, loading: statsLoading, refetch: refetchStats } = useDashboardStats();
    const { analytics, loading: analyticsLoading, refetch: refetchAnalytics } = useOrderAnalytics(analyticsPeriod);
    const { revenue, loading: revenueLoading, refetch: refetchRevenue } = useRevenueAnalytics(revenuePeriod);

    const handleRefresh = () => {
        refetchStats();
        refetchAnalytics();
        refetchRevenue();
    };

    if (statsLoading || analyticsLoading) {
        return (
            <Box>
                <Grid container spacing={3}>
                    {[...Array(4)].map((_, i) => (
                        <Grid
                            key={i}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 3
                            }}>
                            <Skeleton variant="rectangular" height={140} />
                        </Grid>
                    ))}
                </Grid>
                <Box mt={3}>
                    <Skeleton variant="rectangular" height={400} />
                </Box>
            </Box>
        );
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Orders Dashboard
                </Typography>
                <IconButton onClick={handleRefresh}>
                    <Refresh />
                </IconButton>
            </Box>
            {/* Summary Stats */}
            <Grid container spacing={3} mb={3}>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}>
                    <StatCard
                        title="Today's Revenue"
                        value={formatCurrency(stats?.today?.revenue || 0)}
                        subtitle={`${stats?.today?.orders || 0} orders`}
                        icon={AttachMoney}
                        color={theme.palette.success.main}
                        trend={12}
                    />
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}>
                    <StatCard
                        title="This Month"
                        value={formatCurrency(stats?.this_month?.revenue || 0)}
                        subtitle={`${stats?.this_month?.orders || 0} orders`}
                        icon={ShoppingCart}
                        color={theme.palette.primary.main}
                        trend={8}
                    />
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}>
                    <StatCard
                        title="Pending Orders"
                        value={stats?.pending_orders || 0}
                        icon={Receipt}
                        color={theme.palette.warning.main}
                    />
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}>
                    <StatCard
                        title="Conversion Rate"
                        value={`${stats?.conversion_rate || 0}%`}
                        icon={TrendingUp}
                        color={theme.palette.info.main}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {/* Revenue Chart */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 8
                    }}>
                    <Paper sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Typography variant="h6" fontWeight="bold">
                                Revenue Analytics
                            </Typography>
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select
                                    value={revenuePeriod}
                                    onChange={(e) => setRevenuePeriod(e.target.value)}
                                >
                                    <MenuItem value="daily">Daily</MenuItem>
                                    <MenuItem value="monthly">Monthly</MenuItem>
                                    <MenuItem value="yearly">Yearly</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={revenue?.data || []}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey={revenuePeriod === 'daily' ? 'date' : revenuePeriod === 'monthly' ? 'month' : 'year'}
                                    tickFormatter={(value) => {
                                        if (revenuePeriod === 'daily') return format(new Date(value), 'MMM dd');
                                        if (revenuePeriod === 'monthly') return format(new Date(value), 'MMM yyyy');
                                        return value;
                                    }}
                                />
                                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                                <Tooltip
                                    formatter={(value) => formatCurrency(value)}
                                    labelFormatter={(label) => {
                                        if (revenuePeriod === 'daily') return format(new Date(label), 'MMMM dd, yyyy');
                                        if (revenuePeriod === 'monthly') return format(new Date(label), 'MMMM yyyy');
                                        return label;
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke={theme.palette.primary.main}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Order Status Distribution */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 4
                    }}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" mb={3}>
                            Order Status Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={analytics?.orders_by_status || []}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="count"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {(analytics?.orders_by_status || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Recent Orders */}
                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" mb={3}>
                            Recent Orders
                        </Typography>
                        <List>
                            {analytics?.recent_orders?.slice(0, 5).map((order) => (
                                <ListItem key={order.id} divider>
                                    <ListItemText
                                        primary={
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="body2" fontWeight="medium">
                                                    {order.order_number}
                                                </Typography>
                                                <Typography variant="body2" fontWeight="bold">
                                                    {formatCurrency(order.total)}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <Box display="flex" justifyContent="space-between" mt={0.5}>
                                                <Typography variant="caption" color="text.secondary">
                                                    {order.customer_name}
                                                </Typography>
                                                <Chip
                                                    label={order.status}
                                                    size="small"
                                                    color={
                                                        order.status === 'Delivered' ? 'success' :
                                                            order.status === 'Processing' ? 'info' :
                                                                order.status === 'Pending' ? 'warning' : 'default'
                                                    }
                                                />
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Top Products */}
                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" mb={3}>
                            Top Selling Products
                        </Typography>
                        <List>
                            {analytics?.top_products?.slice(0, 5).map((product, index) => (
                                <ListItem key={index} divider>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                                            {index + 1}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={product.product_name}
                                        secondary={`${product.quantity_sold} units sold`}
                                    />
                                    <Typography variant="body2" fontWeight="bold">
                                        {formatCurrency(product.revenue)}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrdersDashboard;