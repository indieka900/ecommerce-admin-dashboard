// src/pages/Orders/OrderDetails.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent
} from '@mui/lab';
import {
    Box,
    Paper,
    Grid,
    Typography,
    Chip,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    IconButton,
    Skeleton,
    Alert,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
} from '@mui/material';
import {
    ArrowBack,
    Edit,
    Print,
    Email,
    LocalShipping,
    CheckCircle,
    Cancel,
    Pending,
    AccessTime,
    AttachMoney,
    CreditCard,
    Person,
    LocationOn,
    Phone,
    Receipt
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useOrderDetails, useOrderActions } from '../hooks/userOrder';
// import toast from 'react-hot-toast';

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [statusDialog, setStatusDialog] = useState(false);
    const [paymentDialog, setPaymentDialog] = useState(false);
    const [trackingDialog, setTrackingDialog] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');

    const { order, loading, error, refetch } = useOrderDetails(orderId);
    const { updateOrderStatus, updatePaymentStatus, addTracking, loading: actionLoading } = useOrderActions();

    const handleStatusUpdate = async () => {
        try {
            await updateOrderStatus(orderId, selectedStatus);
            setStatusDialog(false);
            refetch();
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handlePaymentStatusUpdate = async () => {
        try {
            await updatePaymentStatus(orderId, selectedPaymentStatus);
            setPaymentDialog(false);
            refetch();
        } catch (error) {
            console.error('Failed to update payment status:', error);
        }
    };

    const handleAddTracking = async () => {
        try {
            await addTracking(orderId, trackingNumber);
            setTrackingDialog(false);
            setTrackingNumber('');
            refetch();
        } catch (error) {
            console.error('Failed to add tracking:', error);
        }
    };

    const getStatusIcon = (status) => {
        const icons = {
            Pending: <Pending />,
            Processing: <AccessTime />,
            Shipped: <LocalShipping />,
            Delivered: <CheckCircle />,
            Cancelled: <Cancel />,
            Refunded: <Cancel />
        };
        return icons[status] || <Pending />;
    };

    const getStatusColor = (status) => {
        const colors = {
            Pending: 'warning',
            Processing: 'info',
            Shipped: 'primary',
            Delivered: 'success',
            Cancelled: 'error',
            Refunded: 'default'
        };
        return colors[status] || 'default';
    };

    const getPaymentStatusColor = (status) => {
        const colors = {
            Pending: 'warning',
            'Cash-On-Delivery': 'info',
            Paid: 'success',
            Failed: 'error',
            Refunded: 'default'
        };
        return colors[status] || 'default';
    };

    const getOrderTimeline = () => {
        const events = [
            {
                date: order.created_at,
                label: 'Order Placed',
                icon: <Receipt />,
                color: 'primary'
            }
        ];

        if (order.paid_at) {
            events.push({
                date: order.paid_at,
                label: 'Payment Received',
                icon: <AttachMoney />,
                color: 'success'
            });
        }

        if (order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered') {
            events.push({
                date: order.updated_at,
                label: 'Order Processing',
                icon: <AccessTime />,
                color: 'info'
            });
        }

        if (order.status === 'Shipped' || order.status === 'Delivered') {
            events.push({
                date: order.updated_at,
                label: 'Order Shipped',
                icon: <LocalShipping />,
                color: 'primary'
            });
        }

        if (order.status === 'Delivered') {
            events.push({
                date: order.updated_at,
                label: 'Order Delivered',
                icon: <CheckCircle />,
                color: 'success'
            });
        }

        return events;
    };

    if (loading) {
        return (
            <Box>
                <Skeleton variant="rectangular" height={60} sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                    <Grid
                        size={{
                            xs: 12,
                            md: 8
                        }}>
                        <Skeleton variant="rectangular" height={400} />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}>
                        <Skeleton variant="rectangular" height={400} />
                    </Grid>
                </Grid>
            </Box>
        );
    }

    if (error || !order) {
        return (
            <Box>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error || 'Order not found'}
                </Alert>
                <Button startIcon={<ArrowBack />} onClick={() => navigate('/orders')}>
                    Back to Orders
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton onClick={() => navigate('/orders')}>
                        <ArrowBack />
                    </IconButton>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">
                            Order {order.order_number}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Created on {format(new Date(order.created_at), 'MMMM dd, yyyy hh:mm a')}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" gap={2}>
                    <Button startIcon={<Print />} variant="outlined">
                        Print Invoice
                    </Button>
                    <Button startIcon={<Email />} variant="outlined">
                        Send Email
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={3}>
                {/* Order Info */}
                <Grid
                    size={{
                        xs: 12,
                        md: 8
                    }}>
                    {/* Status Cards */}
                    <Grid container spacing={2} mb={3}>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}>
                            <Card>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Order Status
                                            </Typography>
                                            <Chip
                                                label={order.status}
                                                color={getStatusColor(order.status)}
                                                icon={getStatusIcon(order.status)}
                                            />
                                        </Box>
                                        <IconButton onClick={() => {
                                            setSelectedStatus(order.status);
                                            setStatusDialog(true);
                                        }}>
                                            <Edit />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}>
                            <Card>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Payment Status
                                            </Typography>
                                            <Chip
                                                label={order.payment_status}
                                                color={getPaymentStatusColor(order.payment_status)}
                                                icon={<CreditCard />}
                                            />
                                        </Box>
                                        <IconButton onClick={() => {
                                            setSelectedPaymentStatus(order.payment_status);
                                            setPaymentDialog(true);
                                        }}>
                                            <Edit />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Order Items */}
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            Order Items
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="right">Unit Price</TableCell>
                                        <TableCell align="right">Subtotal</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Box>
                                                    <Typography variant="body2" fontWeight="medium">
                                                        {item.product_name}
                                                    </Typography>
                                                    {item.variant_info && (
                                                        <Typography variant="caption" color="text.secondary">
                                                            {item.variant_info.size && `Size: ${item.variant_info.size}`}
                                                            {item.variant_info.color && ` | Color: ${item.variant_info.color}`}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">{item.quantity}</TableCell>
                                            <TableCell align="right">Ksh {parseFloat(item.unit_price).toFixed(2)}</TableCell>
                                            <TableCell align="right">Ksh {parseFloat(item.subtotal).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box mt={3}>
                            <Grid container spacing={2}>
                                <Grid
                                    size={{
                                        xs: 12,
                                        sm: 6
                                    }}>
                                    {order.notes && (
                                        <Box>
                                            <Typography variant="body2" fontWeight="medium" gutterBottom>
                                                Order Notes
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {order.notes}
                                            </Typography>
                                        </Box>
                                    )}
                                </Grid>
                                <Grid
                                    size={{
                                        xs: 12,
                                        sm: 6
                                    }}>
                                    <Box display="flex" justifyContent="space-between" mb={1}>
                                        <Typography variant="body2">Subtotal:</Typography>
                                        <Typography variant="body2">Ksh {parseFloat(order.subtotal).toFixed(2)}</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" mb={1}>
                                        <Typography variant="body2">Shipping:</Typography>
                                        <Typography variant="body2">Ksh {parseFloat(order.shipping_cost).toFixed(2)}</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" mb={1}>
                                        <Typography variant="body2">Tax:</Typography>
                                        <Typography variant="body2">Ksh {parseFloat(order.tax).toFixed(2)}</Typography>
                                    </Box>
                                    <Divider sx={{ my: 1 }} />
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography variant="h6" fontWeight="bold">Total:</Typography>
                                        <Typography variant="h6" fontWeight="bold" color="primary">
                                            Ksh {parseFloat(order.total).toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>

                    {/* Shipping Info */}
                    <Paper sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6" fontWeight="bold">
                                Shipping Information
                            </Typography>
                            {!order.tracking_number && order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                                <Button
                                    size="small"
                                    startIcon={<LocalShipping />}
                                    onClick={() => setTrackingDialog(true)}
                                >
                                    Add Tracking
                                </Button>
                            )}
                        </Box>

                        {order.tracking_number && (
                            <Alert severity="info" sx={{ mb: 2 }}>
                                Tracking Number: <strong>{order.tracking_number}</strong>
                            </Alert>
                        )}

                        <Grid container spacing={3}>
                            <Grid
                                size={{
                                    xs: 12,
                                    md: 6
                                }}>
                                <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                                    Shipping Address
                                </Typography>
                                {order.shipping_address && (
                                    <Box>
                                        <Typography variant="body2">
                                            {order.shipping_address.first_name} {order.shipping_address.last_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {order.shipping_address.street_address}
                                            {order.shipping_address.apartment && `, ${order.shipping_address.apartment}`}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {order.shipping_address.city}, {order.shipping_address.county} {order.shipping_address.postal_code}
                                        </Typography>
                                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                                            <Phone fontSize="small" color="action" />
                                            <Typography variant="body2">{order.shipping_address.phone}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Email fontSize="small" color="action" />
                                            <Typography variant="body2">{order.shipping_address.email}</Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Grid>
                            <Grid
                                size={{
                                    xs: 12,
                                    md: 6
                                }}>
                                <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                                    Billing Address
                                </Typography>
                                {order.billing_address ? (
                                    <Box>
                                        <Typography variant="body2">
                                            {order.billing_address.first_name} {order.billing_address.last_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {order.billing_address.street_address}
                                            {order.billing_address.apartment && `, ${order.billing_address.apartment}`}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {order.billing_address.city}, {order.billing_address.county} {order.billing_address.postal_code}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        Same as shipping address
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Sidebar */}
                <Grid
                    size={{
                        xs: 12,
                        md: 4
                    }}>
                    {/* Customer Info */}
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            Customer Information
                        </Typography>
                        <List>
                            <ListItem disablePadding>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={order.user_name}
                                    secondary={order.user_email}
                                />
                            </ListItem>
                        </List>
                        <Divider sx={{ my: 2 }} />
                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Payment Method
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {order.payment_method || 'Not specified'}
                            </Typography>
                        </Box>
                        {order.transaction_id && (
                            <Box mt={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Transaction ID
                                </Typography>
                                <Typography variant="body2" fontWeight="medium">
                                    {order.transaction_id}
                                </Typography>
                            </Box>
                        )}
                    </Paper>

                    {/* Order Timeline */}
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            Order Timeline
                        </Typography>
                        <Timeline position="right" sx={{ p: 0, m: 0 }}>
                            {getOrderTimeline().map((event, index) => (
                                <TimelineItem key={index}>
                                    <TimelineOppositeContent sx={{ flex: 0.3 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            {format(new Date(event.date), 'MMM dd')}
                                        </Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color={event.color}>
                                            {event.icon}
                                        </TimelineDot>
                                        {index < getOrderTimeline().length - 1 && <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography variant="body2">{event.label}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {format(new Date(event.date), 'hh:mm a')}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </Paper>
                </Grid>
            </Grid>
            {/* Update Status Dialog */}
            <Dialog open={statusDialog} onClose={() => setStatusDialog(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Update Order Status</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        fullWidth
                        label="Status"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        margin="normal"
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Processing">Processing</MenuItem>
                        <MenuItem value="Shipped">Shipped</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                        <MenuItem value="Refunded">Refunded</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setStatusDialog(false)}>Cancel</Button>
                    <Button onClick={handleStatusUpdate} variant="contained" disabled={actionLoading}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Update Payment Status Dialog */}
            <Dialog open={paymentDialog} onClose={() => setPaymentDialog(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Update Payment Status</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        fullWidth
                        label="Payment Status"
                        value={selectedPaymentStatus}
                        onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                        margin="normal"
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Cash-On-Delivery">Cash-On-Delivery</MenuItem>
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="Failed">Failed</MenuItem>
                        <MenuItem value="Refunded">Refunded</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPaymentDialog(false)}>Cancel</Button>
                    <Button onClick={handlePaymentStatusUpdate} variant="contained" disabled={actionLoading}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Add Tracking Dialog */}
            <Dialog open={trackingDialog} onClose={() => setTrackingDialog(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Add Tracking Number</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Tracking Number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTrackingDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddTracking} variant="contained" disabled={actionLoading || !trackingNumber}>
                        Add Tracking
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderDetails;