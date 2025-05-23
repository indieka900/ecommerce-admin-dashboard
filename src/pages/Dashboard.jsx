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
    ThemeProvider,
    createTheme,
    CssBaseline
} from '@mui/material';
import {
    TrendingUp,
    ShoppingCart,
    People,
    AttachMoney,
    ArrowUpward,
    ArrowDownward
} from '@mui/icons-material';

// Create a custom dark theme
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6366f1',
            light: '#818cf8',
            dark: '#4f46e5',
        },
        secondary: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
        },
        background: {
            default: '#0f172a',
            paper: '#1e293b',
        },
        success: {
            main: '#10b981',
            light: '#34d399',
        },
        error: {
            main: '#ef4444',
            light: '#f87171',
        },
        warning: {
            main: '#f59e0b',
            light: '#fbbf24',
        },
        info: {
            main: '#3b82f6',
            light: '#60a5fa',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
        },
        h6: {
            fontWeight: 600,
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
    },
});

const StatCard = ({ title, value, icon: Icon, color, trend, trendValue, gradient }) => (
    <Card 
        elevation={0} 
        sx={{ 
            p: 3, 
            height: '100%',
            background: gradient,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
            },
            '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease-in-out',
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
                            backgroundColor: trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            color: trend === 'up' ? '#10b981' : '#ef4444',
                            border: `1px solid ${trend === 'up' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                        }}
                    />
                )}
            </Box>
            <Typography color="rgba(255, 255, 255, 0.8)" variant="body2" sx={{ mb: 1 }}>
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

const ChartCard = ({ title, children, height = 400 }) => (
    <Paper 
        elevation={0}
        sx={{ 
            p: 4, 
            height,
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
            }
        }}
    >
        <Box position="relative" zIndex={1} height="100%">
            <Typography variant="h6" gutterBottom color="white" sx={{ mb: 3 }}>
                {title}
            </Typography>
            {children}
        </Box>
    </Paper>
);

const Dashboard = () => {
    const statsData = [
        {
            title: "Total Revenue",
            value: "$124,563",
            icon: AttachMoney,
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            trend: "up",
            trendValue: "+12.5%"
        },
        {
            title: "Orders",
            value: "2,847",
            icon: ShoppingCart,
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            trend: "up",
            trendValue: "+8.2%"
        },
        {
            title: "Customers",
            value: "1,429",
            icon: People,
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            trend: "up",
            trendValue: "+23.1%"
        },
        {
            title: "Growth Rate",
            value: "+28.4%",
            icon: TrendingUp,
            gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            trend: "up",
            trendValue: "+2.4%"
        }
    ];

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ 
                minHeight: '100vh', 
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                p: 4
            }}>
                <Box sx={{ mb: 4 }}>
                    <Typography 
                        variant="h4" 
                        fontWeight="bold" 
                        color="white"
                        sx={{ 
                            mb: 1,
                            background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Dashboard Overview
                    </Typography>
                    <Typography variant="body1" color="rgba(255, 255, 255, 0.7)">
                        Welcome back! Here's what's happening with your business today.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Stats Cards */}
                    {statsData.map((stat, index) => (
                        <Grid item xs={12} sm={6} lg={3} key={index}>
                            <StatCard {...stat} />
                        </Grid>
                    ))}

                    {/* Sales Chart */}
                    <Grid item xs={12} lg={8}>
                        <ChartCard title="Sales Analytics" height={450}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                height="80%"
                                sx={{
                                    background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                                    borderRadius: 2,
                                    border: '1px dashed rgba(99, 102, 241, 0.3)',
                                }}
                            >
                                <Typography variant="h6" color="rgba(255, 255, 255, 0.6)" textAlign="center">
                                    📈 Interactive Sales Chart<br />
                                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                                        Connect your analytics data here
                                    </Typography>
                                </Typography>
                            </Box>
                        </ChartCard>
                    </Grid>

                    {/* Quick Stats */}
                    <Grid item xs={12} lg={4}>
                        <ChartCard title="Quick Stats" height={450}>
                            <Box sx={{ height: '80%' }}>
                                {[
                                    { label: 'Conversion Rate', value: '3.2%', color: '#10b981' },
                                    { label: 'Avg. Order Value', value: '$87.50', color: '#f59e0b' },
                                    { label: 'Customer Satisfaction', value: '94%', color: '#3b82f6' },
                                    { label: 'Return Rate', value: '2.1%', color: '#ef4444' },
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
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: 2,
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                        }}
                                    >
                                        <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
                                            {item.label}
                                        </Typography>
                                        <Typography 
                                            variant="h6" 
                                            fontWeight="bold" 
                                            sx={{ color: item.color }}
                                        >
                                            {item.value}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </ChartCard>
                    </Grid>

                    {/* Recent Activity */}
                    <Grid item xs={12}>
                        <ChartCard title="Recent Activity" height={300}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                height="80%"
                                sx={{
                                    background: 'linear-gradient(45deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1))',
                                    borderRadius: 2,
                                    border: '1px dashed rgba(245, 158, 11, 0.3)',
                                }}
                            >
                                <Typography variant="h6" color="rgba(255, 255, 255, 0.6)" textAlign="center">
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
        </ThemeProvider>
    );
};

export default Dashboard;