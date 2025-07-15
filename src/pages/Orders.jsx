// src/pages/Orders/OrdersList.jsx
import { useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Chip,
    IconButton,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Typography,
    Skeleton,
    Menu,
    Checkbox,
    Toolbar,
    Tooltip
} from '@mui/material';
import {
    Visibility,
    MoreVert,
    FileDownload,
    Search,
    FilterList,
    Refresh
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useOrders, useOrderActions, useOrderExport } from '../hooks/userOrder';
// import { useOrders, useOrderActions, useOrderExport } from '../../hooks/useOrderApi';
import { format } from 'date-fns';

const OrdersList = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        status: '',
        payment_status: '',
        start_date: '',
        end_date: '',
        search: ''
    });
    const [selected, setSelected] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentOrderId, setCurrentOrderId] = useState(null);

    const { orders, loading, pagination, updateFilters, changePage, refetch, setPagination } = useOrders(filters);
    const { updateOrderStatus, updatePaymentStatus, bulkUpdateStatus, loading: actionLoading } = useOrderActions();
    const { exportToCSV, exportToExcel, loading: exportLoading } = useOrderExport();

    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        updateFilters(newFilters);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            updateFilters(filters);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            refetch();
            setAnchorEl(null);
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleBulkStatusUpdate = async (newStatus) => {
        if (selected.length === 0) return;

        try {
            await bulkUpdateStatus(selected, newStatus);
            setSelected([]);
            refetch();
        } catch (error) {
            console.error('Failed to bulk update:', error);
        }
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelected = orders.map((order) => order.id);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    };

    const handleSelectOne = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
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

    if (loading && !orders.length) {
        return (
            <Box>
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={60} sx={{ mb: 1 }} />
                ))}
            </Box>
        );
    }

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Orders Management
                </Typography>
                <Box display="flex" gap={2}>
                    <Button
                        variant="outlined"
                        startIcon={<FileDownload />}
                        onClick={() => exportToCSV(filters)}
                        disabled={exportLoading}
                    >
                        Export CSV
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<FileDownload />}
                        onClick={() => exportToExcel(filters)}
                        disabled={exportLoading}
                    >
                        Export Excel
                    </Button>
                    <IconButton onClick={refetch} disabled={loading}>
                        <Refresh />
                    </IconButton>
                </Box>
            </Box>
            {/* Filters */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}>
                        <TextField
                            fullWidth
                            label="Search"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            onKeyPress={handleSearch}
                            InputProps={{
                                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                            }}
                        />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            md: 2
                        }}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filters.status}
                                label="Status"
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Processing">Processing</MenuItem>
                                <MenuItem value="Shipped">Shipped</MenuItem>
                                <MenuItem value="Delivered">Delivered</MenuItem>
                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            md: 2
                        }}>
                        <FormControl fullWidth>
                            <InputLabel>Payment Status</InputLabel>
                            <Select
                                value={filters.payment_status}
                                label="Payment Status"
                                onChange={(e) => handleFilterChange('payment_status', e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Cash-On-Delivery">COD</MenuItem>
                                <MenuItem value="Paid">Paid</MenuItem>
                                <MenuItem value="Failed">Failed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            md: 2
                        }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Start Date"
                            value={filters.start_date}
                            onChange={(e) => handleFilterChange('start_date', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            md: 2
                        }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="End Date"
                            value={filters.end_date}
                            onChange={(e) => handleFilterChange('end_date', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                </Grid>
            </Paper>
            {/* Bulk Actions Toolbar */}
            {selected.length > 0 && (
                <Toolbar sx={{ bgcolor: 'primary.light', mb: 2 }}>
                    <Typography sx={{ flex: 1 }} color="inherit" variant="subtitle1">
                        {selected.length} selected
                    </Typography>
                    <Button
                        size="small"
                        onClick={() => handleBulkStatusUpdate('Processing')}
                        disabled={actionLoading}
                    >
                        Mark Processing
                    </Button>
                    <Button
                        size="small"
                        onClick={() => handleBulkStatusUpdate('Shipped')}
                        disabled={actionLoading}
                    >
                        Mark Shipped
                    </Button>
                </Toolbar>
            )}
            {/* Orders Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={selected.length > 0 && selected.length < orders.length}
                                        checked={orders.length > 0 && selected.length === orders.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>Order Number</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Payment</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    hover
                                    selected={selected.indexOf(order.id) !== -1}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selected.indexOf(order.id) !== -1}
                                            onChange={() => handleSelectOne(order.id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="medium">
                                            {order.order_number}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{order.customer_name}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {order.user_email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(order.created_at), 'MMM dd, yyyy')}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={order.status}
                                            color={getStatusColor(order.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={order.payment_status}
                                            color={getPaymentStatusColor(order.payment_status)}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        ${parseFloat(order.total).toFixed(2)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="View Details">
                                            <IconButton
                                                size="small"
                                                onClick={() => navigate(`/orders/${order.id}`)}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                setAnchorEl(e.currentTarget);
                                                setCurrentOrderId(order.id);
                                            }}
                                        >
                                            <MoreVert />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={pagination.total}
                    page={pagination.page - 1}
                    onPageChange={(e, newPage) => changePage(newPage + 1)}
                    rowsPerPage={pagination.pageSize}
                    onRowsPerPageChange={(e) => {
                        setPagination(prev => ({ ...prev, pageSize: parseInt(e.target.value, 10), page: 1 }));
                    }}
                />
            </Paper>
            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => handleStatusUpdate(currentOrderId, 'Processing')}>
                    Mark as Processing
                </MenuItem>
                <MenuItem onClick={() => handleStatusUpdate(currentOrderId, 'Shipped')}>
                    Mark as Shipped
                </MenuItem>
                <MenuItem onClick={() => handleStatusUpdate(currentOrderId, 'Delivered')}>
                    Mark as Delivered
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default OrdersList;