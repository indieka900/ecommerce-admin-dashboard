import { Grid } from '@mui/material';
import ChartCard from './ChartCard';
import { Skeleton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Chip, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as ChartTooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { format } from 'date-fns';

const StockWeeklyCharts = ({
    loading,
    products,
    charts,
    theme,
    formatCurrency
}) => {
    return (
        <Grid container spacing={3}>
            <Grid
                size={{
                    xs: 12,
                    md: 6
                }}>
                <ChartCard title="Low Stock Alert">
                    {loading ? (
                        <Skeleton variant="rectangular" height={320} />
                    ) : products.low_stock?.length === 0 ? (
                        <Box display="flex" alignItems="center" justifyContent="center" height={320}>
                            <Stack alignItems="center" spacing={2}>
                                <CheckCircle sx={{ fontSize: 64, color: 'success.main' }} />
                                <Typography variant="h6" color="text.secondary">
                                    All products are well stocked
                                </Typography>
                            </Stack>
                        </Box>
                    ) : (
                        <TableContainer sx={{ maxHeight: 320 }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="right">Stock</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(products.low_stock || []).map((product) => (
                                        <TableRow key={product.id} hover>
                                            <TableCell>
                                                <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                                    {product.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    variant="body2"
                                                    color={product.quantity <= 5 ? 'error' : 'warning.main'}
                                                    fontWeight="bold"
                                                >
                                                    {product.quantity}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={product.quantity <= 5 ? 'Critical' : 'Low'}
                                                    color={product.quantity <= 5 ? 'error' : 'warning'}
                                                    size="small"
                                                />
                                            </TableCell>
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
                <ChartCard title="Weekly Performance">
                    {loading ? (
                        <Skeleton variant="rectangular" height={320} />
                    ) : (
                        <ResponsiveContainer width="100%" height={320}>
                            <ComposedChart data={charts.weekly_comparison || []}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="week"
                                    tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                                />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <ChartTooltip
                                    formatter={(value, name) => {
                                        if (name === 'revenue') return formatCurrency(value);
                                        return value;
                                    }}
                                    labelFormatter={(date) => `Week of ${format(new Date(date), 'MMM dd, yyyy')}`}
                                />
                                <Bar
                                    yAxisId="left"
                                    dataKey="revenue"
                                    fill={theme.palette.primary.main}
                                    name="Revenue"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="orders"
                                    stroke={theme.palette.secondary.main}
                                    strokeWidth={2}
                                    name="Orders"
                                />
                                <Legend />
                            </ComposedChart>
                        </ResponsiveContainer>
                    )}
                </ChartCard>
            </Grid>
        </Grid>
    );
};

export default StockWeeklyCharts;