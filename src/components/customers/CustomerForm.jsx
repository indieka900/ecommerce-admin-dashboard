import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    TextField, Grid, FormControlLabel, Switch,
    FormControl, InputLabel, Select, MenuItem, CircularProgress, IconButton
} from '@mui/material';
import { Close, Save } from '@mui/icons-material';
import LoadingButton from "../../components/ui/LoadingButton";
import customerService from '../../services/customerService';
import toast from 'react-hot-toast';

const CustomerFormModal = ({ open, onClose, customer }) => {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        is_active: true,
        role: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const isEdit = Boolean(customer);

    useEffect(() => {
        if (isEdit) {
            setFormData({
                email: customer.email || '',
                first_name: customer.first_name || '',
                last_name: customer.last_name || '',
                phone_number: customer.phone_number || '',
                is_active: customer.is_active ?? true,
                role: customer.role || '',
            });
        } else {
            setFormData({
                email: '',
                first_name: '',
                last_name: '',
                phone_number: '',
                is_active: true,
                role: '',
                password: '',
            });
        }
    }, [customer, open]);

    const handleChange = (field) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const newErrors = {};

        // Basic validation
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
        if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';
        if (!formData.role) newErrors.role = 'Role is required';

        if (!isEdit && !formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);
        try {
            if (isEdit) {
                await customerService.updateCustomer(customer.id, formData);    
            } else {
                await customerService.createCustomer(formData);
            }
            toast.success(isEdit ? "User updated succesfully" : "User created succesfully")
            onClose();
        } catch (err) {
            console.error(err);
            toast.error(err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {isEdit ? 'Edit Customer' : 'Add Customer'}
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6
                        }}>
                        <TextField
                            fullWidth
                            label="First Name"
                            value={formData.first_name}
                            onChange={handleChange('first_name')}
                            error={!!errors.first_name}
                            helperText={errors.first_name}
                        />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6
                        }}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            value={formData.last_name}
                            onChange={handleChange('last_name')}
                            error={!!errors.last_name}
                            helperText={errors.last_name}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange('email')}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            value={formData.phone_number}
                            onChange={handleChange('phone_number')}
                            error={!!errors.phone_number}
                            helperText={errors.phone_number}
                        />
                    </Grid>

                    {!isEdit && (
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange('password')}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </Grid>
                    )}

                    <Grid size={12}>
                        <FormControl fullWidth error={!!errors.role}>
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={formData.role}
                                label="Role"
                                onChange={handleChange('role')}
                            >
                                <MenuItem value="Customer">Customer</MenuItem>
                                <MenuItem value="Administrator">Admin</MenuItem>
                                <MenuItem value="manager">Manager</MenuItem>
                            </Select>
                        </FormControl>
                        {errors.role && (
                            <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.role}</p>
                        )}
                    </Grid>

                    <Grid size={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.is_active}
                                    onChange={handleChange('is_active')}
                                    color="primary"
                                />
                            }
                            label="Active"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <LoadingButton 
                    loading={loading}
                    loadingText={isEdit ? 'Updating...' : 'Creating...'}
                    disabled={loading}
                    onClick={handleSubmit}
                    startIcon={<Save />}
                    
                > {isEdit ? "Update" : "Create"}</LoadingButton>
                
            </DialogActions>
        </Dialog>
    );
};

export default CustomerFormModal;
