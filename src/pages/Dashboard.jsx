/* eslint-disable no-unused-vars */
// src/pages/Dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Paper,
    Avatar,
    LinearProgress,
    Chip,
    useTheme,
    Skeleton,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    IconButton,
    Menu,
    MenuItem,
    FormControl,
    Select,
    InputLabel
} from '@mui/material';
import {
    TrendingUp,
    ShoppingCart,
    People,
    AttachMoney,
    ArrowUpward,
    ArrowDownward,
    MoreVert,
    Refresh,
    Receipt,
    LocalShipping,
    Warning,
    CheckCircle
} from '@mui/icons-material';
import {
    getGradientBackground, getHoverTransition,
    getGlassmorphismStyles
} from '../context/ThemeContext';
import { LineChart, BarChart } from '../components/charts/index';
import { format } from 'date-fns';
import {
    useDashboardStats,
    useOrderAnalytics,
    useRevenueAnalytics,
    useCustomerAnalytics
} from '../hooks/userOrder';

const StatCard = ({ title, value, icon: Icon, color, trend, trendValue, gradient, loading }) => {
    const theme = useTheme();

    if (loading) {
        return (
            <Card elevation={0} sx={{ p: 3, height: '100%' }}>
                <Skeleton variant="rectangular" height={150} />
            </Card>
        );
    }

    return (
        <Card
            elevation={0}
            sx={{
                p: 3,
                height: '100%',
                background: gradient,
                position: 'relative',
                overflow: 'hidden',
                ...getGlassmorphismStyles(theme, 0.05),
                ...getHoverTransition(-4),
                '&:hover': {
                    boxShadow: theme.shadows[6],
                },
            }}
        >
            <CardContent sx={{ position: 'relative', zIndex: 1, p: 0, '&:last-child': { pb: 0 } }}>
                <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                    <Avatar
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            width: 56,
                            height: 56,
                        }}
                    >
                        <Icon fontSize="large" />
                    </Avatar>
                    {trend !== undefined && (
                        <Chip
                            icon={trend > 0 ? <ArrowUpward /> : <ArrowDownward />}
                            label={`${trend > 0 ? '+' : ''}${trendValue || trend}%`}
                            size="small"
                            sx={{
                                backgroundColor:
                                    trend > 0 ? theme.palette.success[50] : theme.palette.error[50],
                                color:
                                    trend > 0 ? theme.palette.success.main : theme.palette.error.main,
                                border: `1px solid ${trend > 0 ? theme.palette.success[100] : theme.palette.error[100]
                                    }`,
                            }}
                        />
                    )}
                </Box>
                <Typography
                    color={
                        theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.8)'
                            : 'rgba(0, 0, 0, 0.6)'
                    }
                    variant="body2"
                    sx={{ mb: 1 }}
                >
                    {title}
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="white" sx={{ mb: 1 }}>
                    {value}
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 3,
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
};

const ChartCard = ({ title, children, height = 400, action }) => {
    const theme = useTheme();
    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                height,
                background: theme.palette.background.paper,
                position: 'relative',
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Box position="relative" zIndex={1} height="100%">
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" color="text.primary">
                        {title}
                    </Typography>
                    {action}
                </Box>
                {children}
            </Box>
        </Paper>
    );
};

const Dashboard = () => {
    const theme = useTheme();
    const [analyticsPeriod, setAnalyticsPeriod] = useState(30);
    const [revenuePeriod, setRevenuePeriod] = useState('monthly');

    // Fetch real data using hooks
    const { stats, loading: statsLoading, refetch: refetchStats } = useDashboardStats();
    const { analytics, loading: analyticsLoading, refetch: refetchAnalytics } = useOrderAnalytics(analyticsPeriod);
    const { revenue, loading: revenueLoading } = useRevenueAnalytics(revenuePeriod);
    const { customerData, loading: customerLoading } = useCustomerAnalytics();

    // Calculate trends
    const calculateTrend = (current, previous) => {
        if (!previous || previous === 0) return 0;
        return ((current - previous) / previous * 100).toFixed(1);
    };

    // Format currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value || 0);
    };

    // Prepare chart data
    const getSalesChartData = () => {
        if (!revenue?.data) return null;

        const labels = revenue.data.map(item => {
            if (revenuePeriod === 'daily') return format(new Date(item.date), 'MMM dd');
            if (revenuePeriod === 'monthly') return format(new Date(item.month), 'MMM');
            return item.year;
        });

        return {
            labels,
            datasets: [
                {
                    label: 'Revenue',
                    data: revenue.data.map(item => item.revenue),
                    borderColor: theme.palette.success.main,
                    backgroundColor: `${theme.palette.success.main}20`,
                    tension: 0.4,
                    fill: true,
                },
                {
                    label: 'Orders',
                    data: revenue.data.map(item => item.orders * 100), // Scale for visibility
                    borderColor: theme.palette.primary.main,
                    backgroundColor: `${theme.palette.primary.main}20`,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y1',
                },
            ],
        };
    };

    const getOrderStatusChartData = () => {
        if (!analytics?.orders_by_status) return null;

        return {
            labels: analytics.orders_by_status.map(item => item.status),
            datasets: [
                {
                    label: 'Orders by Status',
                    data: analytics.orders_by_status.map(item => item.count),
                    backgroundColor: [
                        theme.palette.warning.main,
                        theme.palette.info.main,
                        theme.palette.primary.main,
                        theme.palette.success.main,
                        theme.palette.error.main,
                    ],
                    borderWidth: 0,
                },
            ],
        };
    };

    const handleRefreshAll = () => {
        refetchStats();
        refetchAnalytics();
    };

    const statsData = [
        {
            title: 'Total Revenue',
            value: formatCurrency(stats?.this_month?.revenue),
            icon: AttachMoney,
            gradient: getGradientBackground(theme, ['purple', 'pink']),
            trend: 12.5, // You could calculate this from historical data
            loading: statsLoading,
        },
        {
            title: 'Total Orders',
            value: stats?.this_month?.orders || '0',
            icon: ShoppingCart,
            gradient: getGradientBackground(theme, ['pink', 'error']),
            trend: 8.2,
            loading: statsLoading,
        },
        {
            title: 'Pending Orders',
            value: stats?.pending_orders || '0',
            icon: Receipt,
            gradient: getGradientBackground(theme, ['warning', 'orange']),
            loading: statsLoading,
        },
        {
            title: 'Conversion Rate',
            value: `${stats?.conversion_rate || 0}%`,
            icon: TrendingUp,
            gradient: getGradientBackground(theme, ['success', 'cyan']),
            trend: 2.4,
            loading: statsLoading,
        },
    ];

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            mb: 1,
                            background: getGradientBackground(theme, ['primary', 'purple']),
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Dashboard Overview
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Welcome back! Here's what's happening with your business today.
                    </Typography>
                </Box>
                <IconButton onClick={handleRefreshAll} color="primary">
                    <Refresh />
                </IconButton>
            </Box>
            <Grid container spacing={4}>
                {/* Stats Cards */}
                {statsData.map((stat, idx) => (
                    <Grid
                        key={idx}
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 3
                        }}>
                        <StatCard {...stat} />
                    </Grid>
                ))}

                {/* Revenue Chart */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 8
                    }}>
                    <ChartCard
                        title="Revenue Analytics"
                        height={450}
                        action={
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
                        }
                    >
                        {revenueLoading ? (
                            <Skeleton variant="rectangular" height="90%" />
                        ) : (
                            <Box sx={{ height: '90%' }}>
                                <LineChart
                                    data={getSalesChartData()}
                                    title=""
                                    loading={revenueLoading}
                                />
                            </Box>
                        )}
                    </ChartCard>
                </Grid>

                {/* Order Status Chart */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 4
                    }}>
                    <ChartCard title="Order Status Distribution" height={450}>
                        {analyticsLoading ? (
                            <Skeleton variant="rectangular" height="90%" />
                        ) : (
                            <Box sx={{ height: '90%' }}>
                                <BarChart
                                    data={getOrderStatusChartData()}
                                    title=""
                                    loading={analyticsLoading}
                                />
                            </Box>
                        )}
                    </ChartCard>
                </Grid>

                {/* Recent Orders */}
                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}>
                    <ChartCard title="Recent Orders" height={400}>
                        {analyticsLoading ? (
                            <Skeleton variant="rectangular" height="90%" />
                        ) : (
                            <List sx={{ height: '90%', overflow: 'auto' }}>
                                {analytics?.recent_orders?.slice(0, 5).map((order) => (
                                    <ListItem
                                        key={order.id}
                                        secondaryAction={
                                            <Chip
                                                label={order.status}
                                                size="small"
                                                color={
                                                    order.status === 'Delivered' ? 'success' :
                                                        order.status === 'Processing' ? 'info' :
                                                            order.status === 'Pending' ? 'warning' : 'default'
                                                }
                                            />
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                                                <ShoppingCart />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={order.order_number}
                                            secondary={
                                                <>
                                                    {order.customer_name} • {formatCurrency(order.total)}
                                                    <br />
                                                    {format(new Date(order.created_at), 'MMM dd, yyyy hh:mm a')}
                                                </>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </ChartCard>
                </Grid>

                {/* Top Products */}
                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}>
                    <ChartCard title="Top Selling Products" height={400}>
                        {analyticsLoading ? (
                            <Skeleton variant="rectangular" height="90%" />
                        ) : (
                            <List sx={{ height: '90%', overflow: 'auto' }}>
                                {analytics?.top_products?.slice(0, 5).map((product, index) => (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: theme.palette.secondary.light }}>
                                                {index + 1}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={product.product_name}
                                            secondary={`${product.quantity_sold} units • ${formatCurrency(product.revenue)}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </ChartCard>
                </Grid>

                {/* Quick Stats */}
                <Grid size={12}>
                    <ChartCard title="Performance Metrics" height={300}>
                        <Grid container spacing={3}>
                            {[
                                {
                                    label: 'Today\'s Revenue',
                                    value: formatCurrency(stats?.today?.revenue),
                                    color: 'success.main',
                                    icon: <AttachMoney />
                                },
                                {
                                    label: 'Today\'s Orders',
                                    value: stats?.today?.orders || '0',
                                    color: 'primary.main',
                                    icon: <ShoppingCart />
                                },
                                {
                                    label: 'Processing Orders',
                                    value: stats?.processing_orders || '0',
                                    color: 'info.main',
                                    icon: <LocalShipping />
                                },
                                {
                                    label: 'Failed Payments',
                                    value: stats?.failed_payments || '0',
                                    color: 'error.main',
                                    icon: <Warning />
                                },
                            ].map((item, i) => (
                                <Grid
                                    key={i}
                                    size={{
                                        xs: 12,
                                        sm: 6,
                                        md: 3
                                    }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            p: 3,
                                            backgroundColor:
                                                theme.palette.mode === 'dark'
                                                    ? 'rgba(255, 255, 255, 0.05)'
                                                    : 'rgba(0, 0, 0, 0.02)',
                                            borderRadius: theme.shape.borderRadius,
                                            border: `1px solid ${theme.palette.divider}`,
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: `${theme.palette[item.color.split('.')[0]].light}20`,
                                                color: theme.palette[item.color.split('.')[0]].main,
                                                mr: 2
                                            }}
                                        >
                                            {item.icon}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.label}
                                            </Typography>
                                            <Typography
                                                variant="h5"
                                                fontWeight="bold"
                                                sx={{
                                                    color: theme.palette[item.color.split('.')[0]][item.color.split('.')[1]],
                                                }}
                                            >
                                                {statsLoading ? <Skeleton width={80} /> : item.value}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </ChartCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;