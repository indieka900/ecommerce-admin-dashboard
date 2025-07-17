import { Grid } from '@mui/material';
import MetricCard from './MetricCard';
import {
    ShoppingCart,
    AttachMoney,
    ShoppingBasket,
    Warning,
    Favorite,
    Schedule
} from '@mui/icons-material';

const RealTimeMetrics = ({ realtime, loading, theme, formatCurrency }) => {
    return (
        <Grid container spacing={3} mb={3}>
            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 2
                }}>
                <MetricCard
                    title="Today's Orders"
                    value={realtime.today_orders || 0}
                    icon={ShoppingCart}
                    color={theme.palette.primary.main}
                    loading={loading}
                />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 2
                }}>
                <MetricCard
                    title="Today's Revenue"
                    value={formatCurrency(realtime.today_revenue)}
                    icon={AttachMoney}
                    color={theme.palette.success.main}
                    loading={loading}
                />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 2
                }}>
                <MetricCard
                    title="Active Carts"
                    value={realtime.active_carts || 0}
                    icon={ShoppingBasket}
                    color={theme.palette.info.main}
                    loading={loading}
                />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 2
                }}>
                <MetricCard
                    title="Abandoned Carts"
                    value={realtime.abandoned_carts || 0}
                    icon={Warning}
                    color={theme.palette.warning.main}
                    loading={loading}
                />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 2
                }}>
                <MetricCard
                    title="Wishlist Items"
                    value={realtime.wishlist_items || 0}
                    icon={Favorite}
                    color={theme.palette.error.main}
                    loading={loading}
                />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 2
                }}>
                <MetricCard
                    title="Current Hour Orders"
                    value={realtime.current_hour_orders || 0}
                    icon={Schedule}
                    color={theme.palette.secondary.main}
                    loading={loading}
                />
            </Grid>
        </Grid>
    );
};

export default RealTimeMetrics;