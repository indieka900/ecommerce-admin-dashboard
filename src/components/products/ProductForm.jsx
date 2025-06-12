import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Alert,
    Box,
    Typography
} from '@mui/material';
import {
    ShoppingCart,
    AttachMoney,
    Inventory,
    Description,
    Label,
    Image,
    BarChart,
    BrandingWatermark
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import CustomTextField from '../CustomTextField';
import CategoryDropdown from './CategoryDropdown';
import BrandDropdown from './BrandDropdown';

// Reusable validation functions
const validateRequired = (val, name) =>
    !val ? `${name} is required` : null;
const validateNumber = (val, name) =>
    isNaN(Number(val)) ? `${name} must be a number` : null;
const validateUrl = (val) =>
    val && !/^https?:\/\/.+/.test(val) ? 'Invalid URL' : null;

const ProductFormDialog = ({
    open,
    onClose,
    onSubmit,
    initialData = {},
    categories = [],
    brands = [],
    isEditing = false,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        sku: '',
        stock: '',
        category: '',
        brand: '',
        imageUrl: '',
        description: ''
    });

    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (open) {
            setFormData({
                name: initialData.name || '',
                price: initialData.price || '',
                sku: initialData.sku || '',
                stock: initialData.stock || '',
                category: initialData.category || '',
                brand: initialData.brand || '',
                imageUrl: initialData.image || '',
                description: initialData.description || ''
            });
            setErrors({});
            setSubmitStatus(null);
        }
    }, [open, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const { name, price, sku, stock, category, brand, imageUrl, description } = formData;

        newErrors.name = validateRequired(name, 'Product Name');
        newErrors.price = validateRequired(price, 'Price') || validateNumber(price, 'Price');
        newErrors.sku = validateRequired(sku, 'SKU');
        newErrors.stock = validateRequired(stock, 'Stock') || validateNumber(stock, 'Stock');
        newErrors.category = validateRequired(category, 'Category');
        newErrors.brand = validateRequired(brand, 'Brand');
        newErrors.imageUrl = validateUrl(imageUrl);
        newErrors.description = validateRequired(description, 'Description');

        const filtered = Object.entries(newErrors).reduce((acc, [k, v]) => {
            if (v) acc[k] = v;
            return acc;
        }, {});

        setErrors(filtered);
        return Object.keys(filtered).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            setSubmitStatus({ type: 'success', message: `Product ${isEditing ? 'updated' : 'added'} successfully!` });
            onClose(); // Close dialog after submission
        } catch (err) {
            setSubmitStatus({ type: 'error', message: err.message || 'Failed to save product' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogContent dividers>
                {submitStatus && (
                    <Alert severity={submitStatus.type} sx={{ mb: 2 }}>
                        {submitStatus.message}
                    </Alert>
                )}
                <Box component="form" noValidate>
                    <Grid container spacing={2}>
                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <CustomTextField
                                label="Product Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                icon={ShoppingCart}
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <CustomTextField
                                label="Price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                error={!!errors.price}
                                helperText={errors.price}
                                icon={AttachMoney}
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <CustomTextField
                                label="SKU"
                                name="sku"
                                value={formData.sku}
                                onChange={handleChange}
                                error={!!errors.sku}
                                helperText={errors.sku}
                                icon={Inventory}
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <CustomTextField
                                label="Stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleChange}
                                error={!!errors.stock}
                                helperText={errors.stock}
                                icon={BarChart}
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <CategoryDropdown
                                categories={categories}
                                value={formData.category}
                                onChange={handleChange}
                                error={!!errors.category}
                                helperText={errors.category}
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <BrandDropdown
                                brands={brands}
                                value={formData.brand}
                                onChange={handleChange}
                                error={!!errors.brand}
                                helperText={errors.brand}
                            />
                        </Grid>
                        <Grid size={12}>
                            <CustomTextField
                                label="Image URL"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                error={!!errors.imageUrl}
                                helperText={errors.imageUrl}
                                icon={Image}
                            />
                        </Grid>
                        <Grid size={12}>
                            <CustomTextField
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                error={!!errors.description}
                                helperText={errors.description}
                                icon={Description}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ pr: 3, pb: 2 }}>
                <Button onClick={onClose} variant="outlined" disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (isEditing ? 'Updating...' : 'Adding...') : isEditing ? 'Update' : 'Add Product'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductFormDialog;
