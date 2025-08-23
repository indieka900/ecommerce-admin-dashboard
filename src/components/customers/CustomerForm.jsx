import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Box,
    IconButton,
    FormControlLabel,
    Switch,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';

import {
    Close,
    Save,
} from '@mui/icons-material';

const CustomerFormModal = ({ open, onClose, customer, onSave }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (customer) {
            setFormData({
                name: customer.name || '',
                email: customer.email || '',
                phone: customer.phone || '',
                country: customer.country || '',
                status: customer.status || 'Active',
                tier: customer.tier || 'Bronze',
                company: customer.company || '',
                address: customer.address || '',
                city: customer.city || '',
                zipCode: customer.zipCode || '',
                notes: customer.notes || '',
                isVip: customer.isVip || false,
                newsletter: customer.newsletter !== undefined ? customer.newsletter : true
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                country: '',
                status: 'Active',
                tier: 'Bronze',
                company: '',
                address: '',
                city: '',
                zipCode: '',
                notes: '',
                isVip: false,
                newsletter: true
            });
        }
    }, [customer, open]);

    console.log(customer);
    

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const isEdit = Boolean(customer);
    const steps = ['Basic Info', 'Contact Details', 'Preferences'];

    const handleInputChange = (field) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        switch (step) {
            case 0: // Basic Info
                if (!formData.name.trim()) newErrors.name = 'Name is required';
                if (!formData.email.trim()) newErrors.email = 'Email is required';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    newErrors.email = 'Invalid email format';
                }
                break;
            case 1: // Contact Details
                if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
                if (!formData.country.trim()) newErrors.country = 'Country is required';
                break;
            case 2: // Preferences - no validation needed
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(activeStep)) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async () => {
        if (!validateStep(activeStep)) return;

        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            onSave(formData);
            onClose();
        } catch (error) {
            console.error('Error saving customer:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                value={formData.name}
                                onChange={handleInputChange('name')}
                                error={!!errors.name}
                                helperText={errors.name}
                                required
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange('email')}
                                error={!!errors.email}
                                helperText={errors.email}
                                required
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={formData.status}
                                    label="Status"
                                    onChange={handleInputChange('status')}
                                >
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
                                sm: 6
                            }}>
                            <FormControl fullWidth>
                                <InputLabel>Tier</InputLabel>
                                <Select
                                    value={formData.tier}
                                    label="Tier"
                                    onChange={handleInputChange('tier')}
                                >
                                    <MenuItem value="Bronze">Bronze</MenuItem>
                                    <MenuItem value="Silver">Silver</MenuItem>
                                    <MenuItem value="Gold">Gold</MenuItem>
                                    <MenuItem value="Platinum">Platinum</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Company (Optional)"
                                value={formData.company}
                                onChange={handleInputChange('company')}
                            />
                        </Grid>
                    </Grid>
                );

            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}>
                            <TextField
                                fullWidth
                                label="Phone"
                                value={formData.phone}
                                onChange={handleInputChange('phone')}
                                error={!!errors.phone}
                                helperText={errors.phone}
                                required
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}>
                            <TextField
                                fullWidth
                                label="Country"
                                value={formData.country}
                                onChange={handleInputChange('country')}
                                error={!!errors.country}
                                helperText={errors.country}
                                required
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                value={formData.address}
                                onChange={handleInputChange('address')}
                                multiline
                                rows={2}
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}>
                            <TextField
                                fullWidth
                                label="City"
                                value={formData.city}
                                onChange={handleInputChange('city')}
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}>
                            <TextField
                                fullWidth
                                label="ZIP Code"
                                value={formData.zipCode}
                                onChange={handleInputChange('zipCode')}
                            />
                        </Grid>
                    </Grid>
                );

            case 2:
                return (
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.isVip}
                                        onChange={handleInputChange('isVip')}
                                        color="primary"
                                    />
                                }
                                label="VIP Customer"
                            />
                        </Grid>
                        <Grid size={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.newsletter}
                                        onChange={handleInputChange('newsletter')}
                                        color="primary"
                                    />
                                }
                                label="Subscribe to Newsletter"
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Notes"
                                value={formData.notes}
                                onChange={handleInputChange('notes')}
                                multiline
                                rows={4}
                                placeholder="Add any additional notes about this customer..."
                            />
                        </Grid>
                    </Grid>
                );

            default:
                return null;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    sx: { borderRadius: 3 }
                }
            }}
        >
            <DialogTitle>
                <Box display="flex" alignItems="center" justifyContent="between">
                    <Typography variant="h5" fontWeight="bold">
                        {isEdit ? 'Edit Customer' : 'Add New Customer'}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 4 }}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ mt: 2 }}>
                    {renderStepContent(activeStep)}
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Box sx={{ flex: 1 }} />
                <Button onClick={onClose} variant="outlined">
                    Cancel
                </Button>
                {activeStep === steps.length - 1 ? (
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                    >
                        {loading ? 'Saving...' : (isEdit ? 'Update Customer' : 'Create Customer')}
                    </Button>
                ) : (
                    <Button onClick={handleNext} variant="contained">
                        Next
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default CustomerFormModal;