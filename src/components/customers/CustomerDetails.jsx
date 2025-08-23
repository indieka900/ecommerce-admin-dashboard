import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    FormControl,
    Typography,
    Box,
    Avatar,
    Chip,
    IconButton,
    Tabs,
    Tab,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Alert,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    
    Badge} from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
} from '@mui/lab';
import {
    Close,
    Edit,
    Save,
    Person,
    Email,
    Phone,
    LocationOn,
    CreditCard,
    Star,
    ShoppingCart} from '@mui/icons-material';

// 1. Customer Details View Modal
export const CustomerDetailsModal = ({ open, onClose, customer }) => {
    const [activeTab, setActiveTab] = useState(0);

    if (!customer) return null;

    const getStatusColor = (status) => {
        const colors = {
            'Active': 'success',
            'Inactive': 'default',
            'Pending': 'warning',
            'Blocked': 'error'
        };
        return colors[status] || 'default';
    };

    const getTierColor = (tier) => {
        const colors = {
            'Bronze': '#cd7f32',
            'Silver': '#c0c0c0',
            'Gold': '#ffd700',
            'Platinum': '#e5e4e2'
        };
        return colors[tier] || '#666';
    };

    // Mock order data
    const orders = [
        { id: 1001, date: '2024-01-15', amount: 299.99, status: 'Delivered', items: 3 },
        { id: 1002, date: '2024-01-10', amount: 149.50, status: 'Processing', items: 1 },
        { id: 1003, date: '2024-01-05', amount: 89.99, status: 'Shipped', items: 2 }
    ];

    // Mock activity data
    const activities = [
        { id: 1, action: 'Order Placed', description: 'Order #1002 placed', date: '2024-01-10', type: 'order' },
        { id: 2, action: 'Profile Updated', description: 'Updated shipping address', date: '2024-01-08', type: 'profile' },
        { id: 3, action: 'Payment Added', description: 'New credit card added', date: '2024-01-05', type: 'payment' }
    ];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            slotProps={{
                paper: {
                    sx: { borderRadius: 3, maxHeight: '90vh' }
                }
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Box display="flex" alignItems="center" justifyContent="between">
                    <Box display="flex" alignItems="center">
                        <Badge
                            badgeContent={customer.isVip ? <Star sx={{ fontSize: 12 }} /> : 0}
                            color="warning"
                        >
                            <Avatar
                                src={customer.avatar}
                                sx={{ mr: 2, width: 56, height: 56 }}
                            >
                                {customer.name.charAt(0)}
                            </Avatar>
                        </Badge>
                        <Box>
                            <Typography variant="h5" fontWeight="bold">
                                {customer.name}
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                Customer ID: {customer.id} | Joined: {customer.joinDate}
                            </Typography>
                            <Box mt={1} display="flex" gap={1}>
                                <Chip
                                    label={customer.status}
                                    color={getStatusColor(customer.status)}
                                    size="small"
                                />
                                <Chip
                                    label={customer.tier}
                                    size="small"
                                    sx={{
                                        bgcolor: getTierColor(customer.tier),
                                        color: 'white'
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 0 }}>
                <Tabs
                    value={activeTab}
                    onChange={(e, v) => setActiveTab(v)}
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    <Tab label="Overview" />
                    <Tab label="Orders" />
                    <Tab label="Activity" />
                    <Tab label="Notes" />
                </Tabs>

                <Box sx={{ p: 3 }}>
                    {/* Overview Tab */}
                    {activeTab === 0 && (
                        <Grid container spacing={3}>
                            <Grid
                                size={{
                                    xs: 12,
                                    md: 6
                                }}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom color="primary">
                                            Contact Information
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                                                        <Email />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Email"
                                                    secondary={customer.email}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: 'success.light' }}>
                                                        <Phone />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Phone"
                                                    secondary={customer.phone}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: 'info.light' }}>
                                                        <LocationOn />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Location"
                                                    secondary={customer.country}
                                                />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid
                                size={{
                                    xs: 12,
                                    md: 6
                                }}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom color="primary">
                                            Customer Statistics
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid size={6}>
                                                <Box textAlign="center" p={2} bgcolor="primary.light" borderRadius={2}>
                                                    <Typography variant="h4" color="primary">
                                                        {customer.totalOrders}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Total Orders
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid size={6}>
                                                <Box textAlign="center" p={2} bgcolor="success.light" borderRadius={2}>
                                                    <Typography variant="h4" color="success.dark">
                                                        ${customer.totalSpent.toLocaleString()}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Total Spent
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid size={12}>
                                                <Box p={2} bgcolor="grey.100" borderRadius={2}>
                                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                                        Last Activity
                                                    </Typography>
                                                    <Typography variant="body1" fontWeight="medium">
                                                        {customer.lastActivity}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 1 && (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Order History
                            </Typography>
                            {orders.map((order) => (
                                <Card key={order.id} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="between" alignItems="center">
                                            <Box>
                                                <Typography variant="h6">
                                                    Order #{order.id}
                                                </Typography>
                                                <Typography color="textSecondary" gutterBottom>
                                                    {order.date} • {order.items} items
                                                </Typography>
                                                <Chip
                                                    label={order.status}
                                                    color={order.status === 'Delivered' ? 'success' : 'primary'}
                                                    size="small"
                                                />
                                            </Box>
                                            <Typography variant="h6" color="primary">
                                                ${order.amount}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    )}

                    {/* Activity Tab */}
                    {activeTab === 2 && (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Recent Activity
                            </Typography>
                            <Timeline>
                                {activities.map((activity, index) => (
                                    <TimelineItem key={activity.id}>
                                        <TimelineSeparator>
                                            <TimelineDot
                                                color={activity.type === 'order' ? 'primary' :
                                                    activity.type === 'payment' ? 'success' : 'info'}
                                            >
                                                {activity.type === 'order' && <ShoppingCart />}
                                                {activity.type === 'payment' && <CreditCard />}
                                                {activity.type === 'profile' && <Person />}
                                            </TimelineDot>
                                            {index < activities.length - 1 && <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Typography variant="h6" component="span">
                                                {activity.action}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                {activity.description}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {activity.date}
                                            </Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                ))}
                            </Timeline>
                        </Box>
                    )}

                    {/* Notes Tab */}
                    {activeTab === 3 && (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Customer Notes
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={6}
                                placeholder="Add notes about this customer..."
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                            <Button variant="contained" startIcon={<Save />}>
                                Save Notes
                            </Button>
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} variant="outlined">
                    Close
                </Button>
                <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => console.log('Edit customer')}
                >
                    Edit Customer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// 4. Bulk Actions Modal
export const BulkActionsModal = ({ open, onClose, selectedCustomers, onAction }) => {
    const [action, setAction] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!action) return;

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            onAction(action, selectedCustomers);
            onClose();
            setAction('');
        } catch (error) {
            console.error('Error performing bulk action:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Bulk Actions ({selectedCustomers.length} customers selected)
            </DialogTitle>
            <DialogContent>
                <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
                    <FormLabel component="legend">Choose Action</FormLabel>
                    <RadioGroup
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                    >
                        <FormControlLabel
                            value="activate"
                            control={<Radio />}
                            label="Activate Selected Customers"
                        />
                        <FormControlLabel
                            value="deactivate"
                            control={<Radio />}
                            label="Deactivate Selected Customers"
                        />
                        <FormControlLabel
                            value="upgrade"
                            control={<Radio />}
                            label="Upgrade Tier"
                        />
                        <FormControlLabel
                            value="export"
                            control={<Radio />}
                            label="Export Customer Data"
                        />
                        <FormControlLabel
                            value="delete"
                            control={<Radio color="error" />}
                            label="Delete Selected Customers"
                            sx={{ color: 'error.main' }}
                        />
                    </RadioGroup>
                </FormControl>

                {action === 'delete' && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        Warning: This will permanently delete all selected customers and their data.
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={!action || loading}
                    color={action === 'delete' ? 'error' : 'primary'}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    {loading ? 'Processing...' : 'Apply Action'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// // 5. Success/Error Notification Component
// export const NotificationSnackbar = ({ open, onClose, message, type = 'success' }) => {
//     const getIcon = () => {
//         switch (type) {
//             case 'success': return <Check />;
//             case 'error': return <ErrorIcon />;
//             case 'warning': return <Warning />;
//             case 'info': return <Info />;
//             default: return <Check />;
//         }
//     };

//     return (
//         <Snackbar
//             open={open}
//             autoHideDuration={4000}
//             onClose={onClose}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         >
//             <Alert
//                 onClose={onClose}
//                 severity={type}
//                 variant="filled"
//                 iconMapping={{
//                     success: getIcon(),
//                     error: getIcon(),
//                     warning: getIcon(),
//                     info: getIcon()
//                 }}
//             >
//                 {message}
//             </Alert>
//         </Snackbar>
//     );
// };