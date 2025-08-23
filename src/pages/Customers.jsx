import { useState, useMemo } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Chip,
    IconButton,
    Grid,
    Avatar,
    InputAdornment,
    Menu,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Switch,
    FormControlLabel,
    Badge,
    Divider
} from '@mui/material';
import { CustomerDetailsModal } from '../components/customers/CustomerDetails';
import {
    Search,
    Add,
    Edit,
    Delete,
    MoreVert,
    Person,
    TrendingUp,
    TrendingDown,
    Download,
    Upload,
    Visibility,
    Block,
    CheckCircle,
    Star
} from '@mui/icons-material';

import CustomerFormModal from '../components/customers/CustomerForm';
import DeleteCustomerModal from '../components/customers/DeleteCustomerModal';

// Mock customer data
const generateMockCustomers = () => {
    const statuses = ['Active', 'Inactive', 'Pending', 'Blocked'];
    const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'];
    const countries = ['USA', 'UK', 'Canada', 'Germany', 'France', 'Japan', 'Australia'];

    return Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Customer ${i + 1}`,
        email: `customer${i + 1}@example.com`,
        phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        tier: tiers[Math.floor(Math.random() * tiers.length)],
        country: countries[Math.floor(Math.random() * countries.length)],
        joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        totalOrders: Math.floor(Math.random() * 100),
        totalSpent: Math.floor(Math.random() * 10000),
        lastActivity: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        avatar: `https://ui-avatars.com/api/?name=Customer+${i + 1}&background=random`,
        isVip: Math.random() > 0.8
    }));
};

const CustomerPage = () => {
    const [customers] = useState(generateMockCustomers());
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [tierFilter, setTierFilter] = useState('All');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
    const [viewMode, setViewMode] = useState('table');

    const [modals, setModals] = useState({
        details: false,
        form: false,
        delete: false,
        bulk: false
    });




    // Filter customers based on search and filters
    const filteredCustomers = useMemo(() => {
        return customers.filter(customer => {
            const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.phone.includes(searchTerm);
            const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
            const matchesTier = tierFilter === 'All' || customer.tier === tierFilter;

            return matchesSearch && matchesStatus && matchesTier;
        });
    }, [customers, searchTerm, statusFilter, tierFilter]);

    // Paginated customers
    const paginatedCustomers = useMemo(() => {
        const start = page * rowsPerPage;
        return filteredCustomers.slice(start, start + rowsPerPage);
    }, [filteredCustomers, page, rowsPerPage]);

    // Statistics
    const stats = useMemo(() => {
        const total = customers.length;
        const active = customers.filter(c => c.status === 'Active').length;
        const inactive = customers.filter(c => c.status === 'Inactive').length;
        const vip = customers.filter(c => c.isVip).length;
        const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

        return { total, active, inactive, vip, totalRevenue };
    }, [customers]);

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


    const handleActionMenuOpen = (event, customer) => {
        setActionMenuAnchor(event.currentTarget); 
        setSelectedCustomer(customer);       
    };

    const handleActionClose = () => {
        setActionMenuAnchor(null);
    };

    const handleCustomerAction = (action) => {
        if (selectedCustomer) {
            console.log(`${action} customer:`, selectedCustomer);

            if (action === 'view') {
                setModals(prev => ({ ...prev, details: true }));
            } else if (action === 'edit') {
                setModals(prev => ({ ...prev, form: true }));
            } else if (action === 'block' || action === 'delete') {
                setModals(prev => ({ ...prev, delete: true }));
            }

            handleActionClose();
        }
    };


    const openCustomerDialog = (customer) => {
        setSelectedCustomer(customer);
        // setModals(prev => ({ ...prev, details: true }));
        // setDialogOpen(true);
    };

    const StatCard = ({ title, value, icon, color = 'primary', trend, trendValue }) => (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography color="textSecondary" gutterBottom variant="body2">
                            {title}
                        </Typography>
                        <Typography variant="h4" component="div" color={color}>
                            {typeof value === 'number' && value > 1000 ?
                                value.toLocaleString() : value}
                        </Typography>
                        {trend && (
                            <Box display="flex" alignItems="center" mt={1}>
                                {trend === 'up' ?
                                    <TrendingUp color="success" fontSize="small" /> :
                                    <TrendingDown color="error" fontSize="small" />
                                }
                                <Typography
                                    variant="body2"
                                    color={trend === 'up' ? 'success.main' : 'error.main'}
                                    sx={{ ml: 0.5 }}
                                >
                                    {trendValue}%
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.dark` }}>
                        {icon}
                    </Avatar>
                </Box>
            </CardContent>
        </Card>
    );

    const CustomerCard = ({ customer }) => (
        <Card sx={{ mb: 2, cursor: 'pointer' }} onClick={() => openCustomerDialog(customer)}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Badge
                            badgeContent={customer.isVip ? <Star sx={{ fontSize: 12 }} /> : 0}
                            color="warning"
                        >
                            <Avatar src={customer.avatar} sx={{ mr: 2 }}>
                                {customer.name.charAt(0)}
                            </Avatar>
                        </Badge>
                        <Box>
                            <Typography variant="h6">{customer.name}</Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer.email}
                            </Typography>
                            <Box display="flex" alignItems="center" mt={1} gap={1}>
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
                    <Box textAlign="right">
                        <Typography variant="h6" color="primary">
                            Ksh {customer.totalSpent.toLocaleString()}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                            {customer.totalOrders} orders
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Customer Management
                </Typography>
                <Box display="flex" gap={2}>
                    <Button
                        variant="outlined"
                        startIcon={<Upload />}
                        onClick={() => console.log('Import customers')}
                    >
                        Import
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Download />}
                        onClick={() => console.log('Export customers')}
                    >
                        Export
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => {
                            setSelectedCustomer(null); 
                            setModals(prev => ({ ...prev, form: true }));
                        }}
                    >
                        Add Customer
                    </Button>
                </Box>
            </Box>
            {/* Statistics Cards */}
            <Grid container spacing={3} mb={3}>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}>
                    <StatCard
                        title="Total Customers"
                        value={stats.total}
                        icon={<Person />}
                        color="primary"
                        trend="up"
                        trendValue="12.5"
                    />
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}>
                    <StatCard
                        title="Active Customers"
                        value={stats.active}
                        icon={<CheckCircle />}
                        color="success"
                        trend="up"
                        trendValue="8.2"
                    />
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}>
                    <StatCard
                        title="VIP Customers"
                        value={stats.vip}
                        icon={<Star />}
                        color="warning"
                        trend="up"
                        trendValue="5.1"
                    />
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}>
                    <StatCard
                        title="Total Revenue"
                        value={`Ksh ${stats.totalRevenue.toLocaleString()}`}
                        icon={<TrendingUp />}
                        color="success"
                        trend="up"
                        trendValue="18.7"
                    />
                </Grid>
            </Grid>
            {/* Filters and Search */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
                        <Grid
                            size={{
                                xs: 12,
                                md: 4
                            }}>
                            <TextField
                                fullWidth
                                placeholder="Search customers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 2
                            }}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={statusFilter}
                                    label="Status"
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <MenuItem value="All">All Statuses</MenuItem>
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Blocked">Blocked</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 2
                            }}>
                            <FormControl fullWidth>
                                <InputLabel>Tier</InputLabel>
                                <Select
                                    value={tierFilter}
                                    label="Tier"
                                    onChange={(e) => setTierFilter(e.target.value)}
                                >
                                    <MenuItem value="All">All Tiers</MenuItem>
                                    <MenuItem value="Bronze">Bronze</MenuItem>
                                    <MenuItem value="Silver">Silver</MenuItem>
                                    <MenuItem value="Gold">Gold</MenuItem>
                                    <MenuItem value="Platinum">Platinum</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                md: 4
                            }}>
                            <Box display="flex" gap={1} alignItems="center">
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={viewMode === 'card'}
                                            onChange={(e) => setViewMode(e.target.checked ? 'card' : 'table')}
                                        />
                                    }
                                    label="Card View"
                                />
                                <Typography color="textSecondary">
                                    {filteredCustomers.length} customers found
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {/* Customer List */}
            <Card>
                <CardContent sx={{ p: 0 }}>
                    {viewMode === 'table' ? (
                        <>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Customer</TableCell>
                                            <TableCell>Contact</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Tier</TableCell>
                                            <TableCell>Orders</TableCell>
                                            <TableCell>Total Spent</TableCell>
                                            <TableCell>Join Date</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedCustomers.map((customer) => (
                                            <TableRow
                                                key={customer.id}
                                                hover
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    setSelectedCustomer(customer);
                                                    handleCustomerAction('view');
                                                }}
                                            >
                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <Badge
                                                            badgeContent={customer.isVip ? <Star sx={{ fontSize: 12 }} /> : 0}
                                                            color="warning"
                                                        >
                                                            <Avatar src={customer.avatar} sx={{ mr: 2, width: 40, height: 40 }}>
                                                                {customer.name.charAt(0)}
                                                            </Avatar>
                                                        </Badge>
                                                        <Box>
                                                            <Typography variant="body1" fontWeight="medium">
                                                                {customer.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                ID: {customer.id}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">{customer.email}</Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {customer.phone}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={customer.status}
                                                        color={getStatusColor(customer.status)}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={customer.tier}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: getTierColor(customer.tier),
                                                            color: 'white'
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>{customer.totalOrders}</TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight="medium">
                                                        Ksh {customer.totalSpent.toLocaleString()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>{customer.joinDate}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleActionMenuOpen(e, customer);
                                                            // handleActionClick(e, customer, 'menu');
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
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                component="div"
                                count={filteredCustomers.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={(e, newPage) => setPage(newPage)}
                                onRowsPerPageChange={(e) => {
                                    setRowsPerPage(parseInt(e.target.value, 10));
                                    setPage(0);
                                }}
                            />
                        </>
                    ) : (
                        <Box sx={{ p: 3 }}>
                            {paginatedCustomers.map((customer) => (
                                <CustomerCard key={customer.id} customer={customer} />
                            ))}
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                component="div"
                                count={filteredCustomers.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={(e, newPage) => setPage(newPage)}
                                onRowsPerPageChange={(e) => {
                                    setRowsPerPage(parseInt(e.target.value, 10));
                                    setPage(0);
                                }}
                            />
                        </Box>
                    )}
                </CardContent>
            </Card>
            {/* Action Menu */}
            <Menu
                anchorEl={actionMenuAnchor}
                open={Boolean(actionMenuAnchor)}
                onClose={handleActionClose}
                
            >
                <MenuItem onClick={() => handleCustomerAction('view')}>
                    <Visibility sx={{ mr: 1 }} /> View Details
                </MenuItem>
                <MenuItem onClick={() => handleCustomerAction('edit')}>
                    <Edit sx={{ mr: 1 }} /> Edit Customer
                </MenuItem>
                <MenuItem onClick={() => handleCustomerAction('block')}>
                    <Block sx={{ mr: 1 }} /> Block Customer
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleCustomerAction('delete')} sx={{ color: 'error.main' }}>
                    <Delete sx={{ mr: 1 }} /> Delete Customer
                </MenuItem>
            </Menu>
            <CustomerDetailsModal
                open={modals.details}
                onClose={() => setModals(prev => ({ ...prev, details: false }))}
                customer={selectedCustomer}
            />
            <CustomerFormModal
                open={modals.form}
                onClose={() => setModals(prev => ({ ...prev, form: false }))}
                customer={selectedCustomer} 
                onSave={(customerData) => {
                    console.log('Save customer:', customerData);
                    // setNotification({
                    //     open: true,
                    //     message: 'Customer saved successfully!',
                    //     type: 'success'
                    // });
                }}
            />
            <DeleteCustomerModal
                open={modals.delete}
                onClose={() => setModals(prev => ({ ...prev, delete: false }))}
                customer={selectedCustomer}
                onConfirm={(customer) => {
                    console.log('Delete customer:', customer);
                    // setNotification({
                    //     open: true,
                    //     message: 'Customer deleted successfully!',
                    //     type: 'success'
                    // });
                }}
            />
        </Box>
    );
};

export default CustomerPage;