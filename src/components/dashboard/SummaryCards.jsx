import { Grid, Alert, Typography, Box } from '@mui/material';
import { Speed, ShoppingBasket, LocalShipping, Assignment } from '@mui/icons-material';

const SummaryCards = ({ orders, realtime }) => {
    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom>
                Quick Actions & Insights
            </Typography>
            <Grid container spacing={2}>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}>
                    <Alert severity="info" icon={<Speed />}>
                        <Typography variant="body2" fontWeight="medium">
                            Conversion Rate
                        </Typography>
                        <Typography variant="h6">
                            {((orders.delivered / orders.total) * 100).toFixed(1)}%
                        </Typography>
                    </Alert>
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}>
                    <Alert severity="warning" icon={<ShoppingBasket />}>
                        <Typography variant="body2" fontWeight="medium">
                            Cart Abandonment
                        </Typography>
                        <Typography variant="h6">
                            {((realtime.abandoned_carts / (realtime.active_carts + realtime.abandoned_carts)) * 100).toFixed(1)}%
                        </Typography>
                    </Alert>
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}>
                    <Alert severity="success" icon={<LocalShipping />}>
                        <Typography variant="body2" fontWeight="medium">
                            Fulfillment Rate
                        </Typography>
                        <Typography variant="h6">
                            {orders.fulfillment_rate}%
                        </Typography>
                    </Alert>
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}>
                    <Alert severity="error" icon={<Assignment />}>
                        <Typography variant="body2" fontWeight="medium">
                            Pending Actions
                        </Typography>
                        <Typography variant="h6">
                            {orders.pending + orders.processing} orders
                        </Typography>
                    </Alert>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SummaryCards;