import {
    Grid,
    Paper,
    Box,
    Typography
} from '@mui/material';
import {
    Inventory,
    Star,
    TrendingDown,
    Category
} from '@mui/icons-material';
import StatCard from '../common/Charts/StatsCard';

export const ProductStatsCards = ({ products, categories }) => {
    const featuredCount = products.filter(p => p.featured).length;
    const lowStockCount = products.filter(p => p.quantity < 10).length;
    const categoryCount = categories.length;

    return (
        <Grid container spacing={3} mb={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard
                    value={products.length}
                    label="Total Products"
                    icon={(props) => <Inventory {...props} />}
                    iconColor="#6366f1"
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard
                    value={featuredCount}
                    label="Featured Products"
                    icon={(props) => <Star {...props} />}
                    iconColor="#f59e0b"
                />
                {/* <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                        <Star sx={{ fontSize: 40, color: '#f59e0b', mr: 1 }} />
                        <Typography variant="h4" fontWeight="bold">
                            {featuredCount}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Featured Products
                    </Typography>
                </Paper> */}
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard
                    value={lowStockCount}
                    label="Low Stock"
                    icon={(props) => <TrendingDown {...props} />}
                    iconColor="#ef4444"
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard
                    value={categoryCount}
                    label="Categories"
                    icon={(props) => <Category {...props} />}
                    iconColor="#10b981"
                />
            </Grid>
        </Grid>
    );
};