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
    useTheme
} from '@mui/material';
import {
    TrendingUp,
    ShoppingCart,
    People,
    AttachMoney,
    ArrowUpward,
    ArrowDownward
} from '@mui/icons-material';
import { getGradientBackground, getGlassmorphismStyles, getHoverTransition } from '../context/ThemeContext';


const StatCard = ({ title, value, icon: Icon, color, trend, trendValue, gradient }) => {
    const theme = useTheme();
    
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
                }
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
                    {trend && (
                        <Chip
                            icon={trend === 'up' ? <ArrowUpward /> : <ArrowDownward />}
                            label={trendValue}
                            size="small"
                            sx={{
                                backgroundColor: trend === 'up' ? 
                                    theme.palette.success[50] : 
                                    theme.palette.error[50],
                                color: trend === 'up' ? 
                                    theme.palette.success.main : 
                                    theme.palette.error.main,
                                border: `1px solid ${trend === 'up' ? 
                                    theme.palette.success[100] : 
                                    theme.palette.error[100]}`,
                            }}
                        />
                    )}
                </Box>
                <Typography 
                    color={theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)'} 
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

const ChartCard = ({ title, children, height = 400 }) => {
    const theme = useTheme();
    
    return (
        <Paper 
            elevation={0}
            sx={{ 
                p: 4, 
                height,
                background: getGradientBackground(theme, ['primary', 'secondary']),
                position: 'relative',
                overflow: 'hidden',
                ...getGlassmorphismStyles(theme, 0.02),
            }}
        >
            <Box position="relative" zIndex={1} height="100%">
                <Typography variant="h6" gutterBottom color="text.primary" sx={{ mb: 3 }}>
                    {title}
                </Typography>
                {children}
            </Box>
        </Paper>
    );
};

const Dashboard = () => {
    const theme = useTheme();
    const statsData = [
        {
            title: "Total Revenue",
            value: "$124,563",
            icon: AttachMoney,
            gradient: getGradientBackground(theme, ['purple', 'pink']),
            trend: "up",
            trendValue: "+12.5%"
        },
        {
            title: "Orders",
            value: "2,847",
            icon: ShoppingCart,
            gradient: getGradientBackground(theme, ['pink', 'error']),
            trend: "up",
            trendValue: "+8.2%"
        },
        {
            title: "Customers",
            value: "1,429",
            icon: People,
            gradient: getGradientBackground(theme, ['info', 'cyan']),
            trend: "up",
            trendValue: "+23.1%"
        },
        {
            title: "Growth Rate",
            value: "+28.4%",
            icon: TrendingUp,
            gradient: getGradientBackground(theme, ['success', 'cyan']),
            trend: "up",
            trendValue: "+2.4%"
        }
    ];

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            background: getGradientBackground(theme, ['background.default', 'background.paper', 'secondary']),
            p: 4
        }}>
            <Box sx={{ mb: 4 }}>
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
            <Grid container spacing={4}>
                {/* Stats Cards */}
                {statsData.map((stat, index) => (
                    <Grid
                        key={index}
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 3
                        }}>
                        <StatCard {...stat} />
                    </Grid>
                ))}

                {/* Sales Chart */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 8
                    }}>
                    <ChartCard title="Sales Analytics" height={450}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height="80%"
                            sx={{
                                background: `linear-gradient(45deg, ${theme.palette.primary[50]}, ${theme.palette.secondary[50]})`,
                                borderRadius: theme.shape.borderRadius,
                                border: `1px dashed ${theme.palette.primary[200]}`,
                            }}
                        >
                            <Typography variant="h6" color="text.secondary" textAlign="center">
                                📈 Interactive Sales Chart<br />
                                <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                                    Connect your analytics data here
                                </Typography>
                            </Typography>
                        </Box>
                    </ChartCard>
                </Grid>

                {/* Quick Stats */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 4
                    }}>
                    <ChartCard title="Quick Stats" height={450}>
                        <Box sx={{ height: '80%' }}>
                            {[
                                { label: 'Conversion Rate', value: '3.2%', color: 'success.main' },
                                { label: 'Avg. Order Value', value: '$87.50', color: 'warning.main' },
                                { label: 'Customer Satisfaction', value: '94%', color: 'info.main' },
                                { label: 'Return Rate', value: '2.1%', color: 'error.main' },
                            ].map((item, index) => (
                                <Box 
                                    key={index}
                                    sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        py: 2,
                                        px: 3,
                                        mb: 2,
                                        backgroundColor: theme.palette.mode === 'dark' ? 
                                            'rgba(255, 255, 255, 0.05)' : 
                                            'rgba(0, 0, 0, 0.02)',
                                        borderRadius: theme.shape.borderRadius,
                                        border: `1px solid ${theme.palette.divider}`,
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        {item.label}
                                    </Typography>
                                    <Typography 
                                        variant="h6" 
                                        fontWeight="bold" 
                                        sx={{ color: theme.palette[item.color.split('.')[0]][item.color.split('.')[1]] }}
                                    >
                                        {item.value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </ChartCard>
                </Grid>

                {/* Recent Activity */}
                <Grid size={12}>
                    <ChartCard title="Recent Activity" height={300}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height="80%"
                            sx={{
                                background: `linear-gradient(45deg, ${theme.palette.warning[50]}, ${theme.palette.error[50]})`,
                                borderRadius: theme.shape.borderRadius,
                                border: `1px dashed ${theme.palette.warning[200]}`,
                            }}
                        >
                            <Typography variant="h6" color="text.secondary" textAlign="center">
                                📋 Recent Orders & Activity Feed<br />
                                <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                                    Real-time activity monitoring
                                </Typography>
                            </Typography>
                        </Box>
                    </ChartCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;