/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
    Box,
    Button,
    Paper,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    Alert
} from '@mui/material';
import {
    ShoppingCart,
    AttachMoney,
    Inventory,
    Description,
    Label,
    Image,
    BarChart
} from '@mui/icons-material';
import CustomTextField from '../CustomTextField';

// Yup-style validation functions
const validateRequired = (value, fieldName) => {
    if (!value || value.toString().trim() === '') {
        return `${fieldName} is required`;
    }
    return null;
};

const validateMinLength = (value, min, fieldName) => {
    if (value && value.length < min) {
        return `${fieldName} must be at least ${min} characters`;
    }
    return null;
};

const validateMaxLength = (value, max, fieldName) => {
    if (value && value.length > max) {
        return `${fieldName} must not exceed ${max} characters`;
    }
    return null;
};

const validateNumber = (value, fieldName) => {
    if (value && isNaN(Number(value))) {
        return `${fieldName} must be a valid number`;
    }
    return null;
};

const validatePositive = (value, fieldName) => {
    if (value && Number(value) <= 0) {
        return `${fieldName} must be positive`;
    }
    return null;
};

const validateUrl = (value) => {
    if (value && !value.match(/^http?:\/\/.+/)) {
        return 'Please enter a valid URL';
    }
    return null;
};

const validateSku = (value) => {
    if (value && !value.match(/^[A-Z0-9-]+$/)) {
        return 'SKU must contain only uppercase letters, numbers, and hyphens';
    }
    return null;
};

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        sku: '',
        imageUrl: '',
        stock: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        const nameError = validateRequired(formData.name, 'Product name') ||
            validateMinLength(formData.name, 2, 'Product name') ||
            validateMaxLength(formData.name, 100, 'Product name');
        if (nameError) newErrors.name = nameError;

        // Price validation
        const priceError = validateRequired(formData.price, 'Price') ||
            validateNumber(formData.price, 'Price') ||
            validatePositive(formData.price, 'Price');
        if (priceError) newErrors.price = priceError;
        else if (Number(formData.price) < 0.01) newErrors.price = 'Price must be at least $0.01';
        else if (Number(formData.price) > 999999) newErrors.price = 'Price must not exceed $999,999';

        // Category validation
        const categoryError = validateRequired(formData.category, 'Category') ||
            validateMinLength(formData.category, 2, 'Category');
        if (categoryError) newErrors.category = categoryError;

        // Description validation
        const descError = validateRequired(formData.description, 'Description') ||
            validateMinLength(formData.description, 10, 'Description') ||
            validateMaxLength(formData.description, 500, 'Description');
        if (descError) newErrors.description = descError;

        // SKU validation
        const skuError = validateRequired(formData.sku, 'SKU') ||
            validateMinLength(formData.sku, 3, 'SKU') ||
            validateSku(formData.sku);
        if (skuError) newErrors.sku = skuError;

        // Image URL validation (optional)
        if (formData.imageUrl) {
            const urlError = validateUrl(formData.imageUrl);
            if (urlError) newErrors.imageUrl = urlError;
        }

        // Stock validation
        const stockError = validateRequired(formData.stock, 'Stock quantity') ||
            validateNumber(formData.stock, 'Stock quantity');
        if (stockError) newErrors.stock = stockError;
        else if (Number(formData.stock) < 0) newErrors.stock = 'Stock cannot be negative';
        else if (Number(formData.stock) > 99999) newErrors.stock = 'Stock cannot exceed 99,999';
        else if (!Number.isInteger(Number(formData.stock))) newErrors.stock = 'Stock must be a whole number';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('Product data:', formData);

            setSubmitStatus({
                type: 'success',
                message: 'Product added successfully!'
            });

            // Reset form after successful submission
            setFormData({
                name: '',
                price: '',
                category: '',
                description: '',
                sku: '',
                imageUrl: '',
                stock: ''
            });

        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Failed to add product. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            price: '',
            category: '',
            description: '',
            sku: '',
            imageUrl: '',
            stock: ''
        });
        setErrors({});
        setSubmitStatus(null);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
                    Add New Product
                </Typography>

                {submitStatus && (
                    <Alert
                        severity={submitStatus.type}
                        sx={{ mb: 3 }}
                        onClose={() => setSubmitStatus(null)}
                    >
                        {submitStatus.message}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <CustomTextField
                                name="name"
                                label="Product Name"
                                icon={ShoppingCart}
                                value={formData.name}
                                onChange={handleInputChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                placeholder="Enter product name"
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <CustomTextField
                                name="price"
                                label="Price"
                                icon={AttachMoney}
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                                error={!!errors.price}
                                helperText={errors.price}
                                placeholder="0.00"
                                inputProps={{ step: '0.01', min: '0' }}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <CustomTextField
                                name="category"
                                label="Category"
                                icon={Label}
                                value={formData.category}
                                onChange={handleInputChange}
                                error={!!errors.category}
                                helperText={errors.category}
                                placeholder="Enter product category"
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <CustomTextField
                                name="sku"
                                label="SKU"
                                icon={Inventory}
                                value={formData.sku}
                                onChange={handleInputChange}
                                error={!!errors.sku}
                                helperText={errors.sku}
                                placeholder="e.g., PROD-001"
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <CustomTextField
                                name="stock"
                                label="Stock Quantity"
                                icon={BarChart}
                                type="number"
                                value={formData.stock}
                                onChange={handleInputChange}
                                error={!!errors.stock}
                                helperText={errors.stock}
                                placeholder="0"
                                inputProps={{ min: '0' }}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <CustomTextField
                                name="imageUrl"
                                label="Image URL (Optional)"
                                icon={Image}
                                value={formData.imageUrl}
                                onChange={handleInputChange}
                                error={!!errors.imageUrl}
                                helperText={errors.imageUrl}
                                placeholder="https://example.com/image.jpg"
                            />
                        </Grid>

                        <Grid size={12}>
                            <CustomTextField
                                name="description"
                                label="Description"
                                icon={Description}
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange}
                                error={!!errors.description}
                                helperText={errors.description}
                                placeholder="Enter detailed product description"
                            />
                        </Grid>

                        <Grid size={12}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    onClick={handleReset}
                                    disabled={isSubmitting}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    sx={{ minWidth: 120 }}
                                >
                                    {isSubmitting ? 'Adding...' : 'Add Product'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};

export default ProductForm;