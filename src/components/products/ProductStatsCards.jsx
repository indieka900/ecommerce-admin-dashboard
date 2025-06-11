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

export const ProductStatsCards = ({ products, categories }) => {
    const featuredCount = products.filter(p => p.featured).length;
    const lowStockCount = products.filter(p => p.quantity < 10).length;
    const categoryCount = categories.length - 1; // Subtract "All" option

    return (
        <Grid container spacing={3} mb={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                        <Inventory sx={{ fontSize: 40, color: '#6366f1', mr: 1 }} />
                        <Typography variant="h4" fontWeight="bold">
                            {products.length}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Total Products
                    </Typography>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                        <Star sx={{ fontSize: 40, color: '#f59e0b', mr: 1 }} />
                        <Typography variant="h4" fontWeight="bold">
                            {featuredCount}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Featured Products
                    </Typography>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                        <TrendingDown sx={{ fontSize: 40, color: '#ef4444', mr: 1 }} />
                        <Typography variant="h4" fontWeight="bold">
                            {lowStockCount}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Low Stock
                    </Typography>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                        <Category sx={{ fontSize: 40, color: '#10b981', mr: 1 }} />
                        <Typography variant="h4" fontWeight="bold">
                            {categoryCount}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Categories
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};