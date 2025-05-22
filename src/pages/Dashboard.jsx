import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Paper
} from '@mui/material';
import {
    TrendingUp,
    ShoppingCart,
    People,
    AttachMoney
} from '@mui/icons-material';

const StatCard = ({ title, value, icon: Icon, color = 'primary' }) => (
    <Card elevation={2}>
        <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                        {title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                        {value}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: `${color}.light`,
                        color: `${color}.contrastText`,
                    }}
                >
                    <Icon fontSize="large" />
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Dashboard Overview
            </Typography>

            <Grid container spacing={3}>
                {/* Stats Cards */}
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Sales"
                        value="$12,345"
                        icon={AttachMoney}
                        color="success"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Orders"
                        value="1,234"
                        icon={ShoppingCart}
                        color="info"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Customers"
                        value="567"
                        icon={People}
                        color="warning"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Growth"
                        value="+23%"
                        icon={TrendingUp}
                        color="error"
                    />
                </Grid>

                {/* Placeholder for charts */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" gutterBottom>
                            Sales Chart
                        </Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height="100%"
                            color="text.secondary"
                        >
                            Sales chart will be implemented here
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Orders
                        </Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height="100%"
                            color="text.secondary"
                        >
                            Recent orders list will be implemented here
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;