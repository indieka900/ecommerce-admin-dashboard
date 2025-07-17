import { Grid } from '@mui/material';
import ChartCard from './ChartCard';
import { Skeleton } from '@mui/material';
import { format } from 'date-fns';
import {
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as ChartTooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const RevenueOrdersCharts = ({
    loading,
    theme,
    charts,
    orders,
    formatCurrency
}) => {
    return (
        <Grid container spacing={3} mb={3}>
            <Grid
                size={{
                    xs: 12,
                    lg: 8
                }}>
                <ChartCard title="Revenue & Orders Trend">
                    {loading ? (
                        <Skeleton variant="rectangular" height={320} />
                    ) : (
                        <ResponsiveContainer width="100%" height={320}>
                            <AreaChart data={charts.daily_revenue || []}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={theme.palette.success.main} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={theme.palette.success.main} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                                />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <ChartTooltip
                                    formatter={(value, name) => {
                                        if (name === 'revenue') return formatCurrency(value);
                                        return value;
                                    }}
                                    labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
                                />
                                <Area
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke={theme.palette.success.main}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                    name="Revenue"
                                />
                                <Area
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="orders"
                                    stroke={theme.palette.primary.main}
                                    fillOpacity={1}
                                    fill="url(#colorOrders)"
                                    name="Orders"
                                />
                                <Legend />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </ChartCard>
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    lg: 4
                }}>
                <ChartCard title="Order Status Distribution">
                    {loading ? (
                        <Skeleton variant="circular" width={280} height={280} />
                    ) : (
                        <ResponsiveContainer width="100%" height={320}>
                            <PieChart>
                                <Pie
                                    data={orders.status_breakdown || []}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="count"
                                    label={({ status, count }) => `${status}: ${count}`}
                                >
                                    {(orders.status_breakdown || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <ChartTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </ChartCard>
            </Grid>
        </Grid>
    );
};

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'];

export default RevenueOrdersCharts;