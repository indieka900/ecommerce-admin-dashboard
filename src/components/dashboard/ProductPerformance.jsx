import { Grid } from '@mui/material';
import ChartCard from './ChartCard';
import { Skeleton, Chip, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Avatar } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as ChartTooltip,
    ResponsiveContainer
} from 'recharts';

const ProductPerformance = ({
    loading,
    products,
    theme,
    formatCurrency
}) => {
    return (
        <Grid container spacing={3} mb={3}>
            <Grid
                size={{
                    xs: 12,
                    md: 6
                }}>
                <ChartCard
                    title="Best Selling Products"
                    action={
                        <Chip
                            label={`${products.products_sold || 0} / ${products.total_products || 0} products`}
                            size="small"
                        />
                    }
                >
                    {loading ? (
                        <Skeleton variant="rectangular" height={320} />
                    ) : (
                        <TableContainer sx={{ maxHeight: 320 }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="right">Sold</TableCell>
                                        <TableCell align="right">Revenue</TableCell>
                                        <TableCell align="right">Orders</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(products.best_sellers || []).map((product) => (
                                        <TableRow key={product.product__id} hover>
                                            <TableCell>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <Avatar
                                                        src={product.product__prod_img}
                                                        variant="rounded"
                                                        sx={{ width: 40, height: 40 }}
                                                    />
                                                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                                        {product.product__title}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">{product.quantity_sold}</TableCell>
                                            <TableCell align="right">{formatCurrency(product.revenue)}</TableCell>
                                            <TableCell align="right">{product.order_count}</TableCell>
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
                <ChartCard
                    title="Category Performance"
                    action={
                        <Chip
                            label={`${products.out_of_stock_count || 0} out of stock`}
                            color="error"
                            size="small"
                        />
                    }
                >
                    {loading ? (
                        <Skeleton variant="rectangular" height={320} />
                    ) : (
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart
                                data={products.category_performance || []}
                                margin={{ left: 0, right: 0, top: 0, bottom: 50 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="product__category__category_name"
                                    angle={-45}
                                    textAnchor="end"
                                    height={100}
                                />
                                <YAxis />
                                <ChartTooltip
                                    formatter={(value, name) => {
                                        if (name === 'revenue') return formatCurrency(value);
                                        return value;
                                    }}
                                />
                                <Bar dataKey="revenue" fill={theme.palette.primary.main} name="Revenue" />
                                <Bar dataKey="quantity_sold" fill={theme.palette.secondary.main} name="Units Sold" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </ChartCard>
            </Grid>
        </Grid>
    );
};

export default ProductPerformance;