import { Grid } from '@mui/material';
import MetricCard from './MetricCard';
import {
    AttachMoney,
    Receipt,
    People,
    TrendingUp
} from '@mui/icons-material';

const KeyMetrics = ({
    revenue,
    orders,
    customers,
    loading,
    theme,
    formatCurrency
}) => {
    return (
        <Grid container spacing={3} mb={3}>
            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                }}>
                <MetricCard
                    title="Total Revenue"
                    value={formatCurrency(revenue.total)}
                    subtitle={`${revenue.order_count || 0} orders`}
                    icon={AttachMoney}
                    color={theme.palette.success.main}
                    trend={revenue.growth}
                    loading={loading}
                />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                }}>
                <MetricCard
                    title="Total Orders"
                    value={orders.total || 0}
                    subtitle={`${orders.delivered || 0} delivered`}
                    icon={Receipt}
                    color={theme.palette.primary.main}
                    trend={orders.growth}
                    loading={loading}
                />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                }}>
                <MetricCard
                    title="Total Customers"
                    value={customers.total || 0}
                    subtitle={`${customers.new_this_period || 0} new`}
                    icon={People}
                    color={theme.palette.info.main}
                    trend={customers.retention_rate}
                    loading={loading}
                />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                }}>
                <MetricCard
                    title="Avg Order Value"
                    value={formatCurrency(revenue.average_order_value)}
                    subtitle={`${orders.fulfillment_rate || 0}% fulfillment`}
                    icon={TrendingUp}
                    color={theme.palette.warning.main}
                    loading={loading}
                />
            </Grid>
        </Grid>
    );
};

export default KeyMetrics;