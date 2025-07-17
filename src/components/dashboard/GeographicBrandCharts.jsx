import { Grid } from '@mui/material';
import ChartCard from './ChartCard';
import { Skeleton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as ChartTooltip,
    ResponsiveContainer
} from 'recharts';

const GeographicBrandCharts = ({
    loading,
    dashboardData,
    revenue,
    theme,
    formatCurrency,
    formatNumber
}) => {
    return (
        <Grid container spacing={3} mb={3}>
            <Grid
                size={{
                    xs: 12,
                    md: 6
                }}>
                <ChartCard title="Geographic Distribution">
                    {loading ? (
                        <Skeleton variant="rectangular" height={320} />
                    ) : (
                        <TableContainer sx={{ maxHeight: 320 }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Location</TableCell>
                                        <TableCell align="right">Orders</TableCell>
                                        <TableCell align="right">Revenue</TableCell>
                                        <TableCell align="right">Customers</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(dashboardData.geographic?.distribution || []).map((location, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <LocationOn fontSize="small" color="action" />
                                                    <Box>
                                                        <Typography variant="body2">
                                                            {location.shipping_address__city}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {location.shipping_address__county}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">{location.orders}</TableCell>
                                            <TableCell align="right">{formatCurrency(location.revenue)}</TableCell>
                                            <TableCell align="right">{location.customers}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </ChartCard>
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    md: 6
                }}>
                <ChartCard title="Revenue by Brand">
                    {loading ? (
                        <Skeleton variant="rectangular" height={320} />
                    ) : (
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart
                                data={revenue.by_brand || []}
                                layout="horizontal"
                                margin={{ left: 100, right: 10, top: 10, bottom: 10 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" tickFormatter={(value) => formatNumber(value)} />
                                <YAxis dataKey="product__brand__brand_title" type="category" width={90} />
                                <ChartTooltip
                                    formatter={(value, name) => {
                                        if (name === 'revenue') return formatCurrency(value);
                                        return value;
                                    }}
                                />
                                <Bar dataKey="revenue" fill={theme.palette.secondary.main} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </ChartCard>
            </Grid>
        </Grid>
    );
};

export default GeographicBrandCharts;