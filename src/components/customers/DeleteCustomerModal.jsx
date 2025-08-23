import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Avatar,
    Alert,
} from '@mui/material';
import {
    Delete,
    Warning,
} from '@mui/icons-material';
import LoadingButton from '../ui/LoadingButton';
import customerService from '../../services/customerService';


const DeleteCustomerModal = ({ open, onClose, customer }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await customerService.deleteCustomer(customer.id)
            onClose();
        } catch (error) {
            console.error('Error deleting customer:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: 'error.light', mr: 2 }}>
                        <Warning />
                    </Avatar>
                    <Typography variant="h6">Delete Customer</Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Alert severity="warning" sx={{ mb: 2 }}>
                    This action cannot be undone. The customer and all associated data will be permanently deleted.
                </Alert>
                <Typography>
                    Are you sure you want to delete <strong>{customer?.name}</strong>?
                </Typography>
                <Box sx={{ mt: 2, p: 2, bgcolor: 'info.900', borderRadius: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                        Customer Details:
                    </Typography>
                    <Typography variant="body2">
                        • ID: {customer?.id}
                    </Typography>
                    <Typography variant="body2">
                        • Email: {customer?.email}
                    </Typography>
                    <Typography variant="body2">
                        • Total Orders: {customer?.totalOrders}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <LoadingButton
                    loading={loading}
                    loadingText="Deleting Customer..."
                    disabled={loading}
                    onClick={handleDelete}
                    color='#ef4444'
                    startIcon= {<Delete/>}
                >
                    Delete Customer
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteCustomerModal