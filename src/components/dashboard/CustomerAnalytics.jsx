import { Grid } from '@mui/material';
import ChartCard from './ChartCard';
import { Skeleton, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { People, TrendingUp, Warning } from '@mui/icons-material';

const CustomerAnalytics = ({
    loading,
    customers,
    theme,
    formatCurrency
}) => {
    return (
        <Grid container spacing={3} mb={3}>
            <Grid
                size={{
                    xs: 12,
                    md: 4
                }}>
                <ChartCard title="Customer Segments">
                    {loading ? (
                        <Skeleton variant="rectangular" height={320} />
                    ) : (
                        <Box>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: theme.palette.success.light }}>
                                            <People />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="New Customers"
                                        secondary={`${customers.segments?.new || 0} customers`}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                                            <TrendingUp />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Active Customers"
                                        secondary={`${customers.segments?.active || 0} customers`}
                                    />
                                </ListItem>
                                {/* <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: theme.palette.warning.light }}>
                                            <Warning />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="At Risk"
                                        secondary={`${customers.segments?.at_risk || 0} customers`}
                                    />
                                </ListItem> */}
                            </List>
                            <Divider sx={{ my: 2 }} />
                            <Box textAlign="center">
                                <Typography variant="h4" color="primary" gutterBottom>
                                    {customers.retention_rate || 0}%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Customer Retention Rate
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </ChartCard>
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    md: 8
                }}>
                <ChartCard title="Top Customers">
                    {loading ? (
                        <Skeleton variant="rectangular" height={320} />
                    ) : (
                        <TableContainer sx={{ maxHeight: 320 }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Total Spent</TableCell>
                                        <TableCell align="right">Orders</TableCell>
                                        <TableCell align="right">Avg Order</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(customers.top_customers || []).map((customer, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell>
                                                <Box>
                                                    <Typography variant="body2">
                                                        {customer.user__first_name} {customer.user__last_name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {customer.user__email}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">{formatCurrency(customer.total_spent)}</TableCell>
                                            <TableCell align="right">{customer.order_count}</TableCell>
                                            <TableCell align="right">{formatCurrency(customer.avg_order)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </ChartCard>
            </Grid>
        </Grid>
    );
};

export default CustomerAnalytics;