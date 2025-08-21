import React, { useEffect, useRef, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Alert,
    Box,
    Typography,
    IconButton,
    Avatar,
    Switch,
    FormControlLabel
} from '@mui/material';
import {
    ShoppingCart,
    AttachMoney,
    Inventory,
    Description,
    Image,
    CloudUpload,
    Delete,
    Star,
    Discount,
    TrendingUp,
    LocalOffer,
    Save as SaveIcon,
} from '@mui/icons-material';
import LoadingButton from '../../components/ui/LoadingButton';
import BrandDropdown from './BrandDropdown';
import CategoryDropdown from './CategoryDropdown';
import CustomTextField from '../CustomTextField';
import { useForm, Controller } from 'react-hook-form';


const ProductFormDialog = ({
    open,
    onClose,
    onSubmit,
    initialData = {},
    categories = [],
    brands = [],
    isEditing = false,
}) => {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);
    const [submitStatus, setSubmitStatus] = useState(null);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        register,
        watch
    } = useForm({
        defaultValues: {
            title: '',
            price: '',
            quantity: '',
            description: '',
            keywords: '',
            category: '',
            brand: '',
            discount: '',
            rating: '',
            min_variant_price: '',
            max_variant_price: '',
            prod_img: '',
            featured: false,
            has_variants: false
        }
    });

    const hasVariants = watch('has_variants');

    useEffect(() => {
        if (open) {
            const safeData = initialData || {};
            reset({
                title: safeData.title || '',
                price: safeData.price || '',
                quantity: safeData.quantity || '',
                description: safeData.description || '',
                keywords: safeData.keywords || '',
                category: safeData.category || '',
                brand: safeData.brand || '',
                discount: safeData.discount || '',
                rating: safeData.rating || '',
                min_variant_price: safeData.min_variant_price || '',
                max_variant_price: safeData.max_variant_price || '',
                prod_img: safeData.prod_img || '',
                featured: safeData.featured || false,
                has_variants: safeData.has_variants || false
            });
            setImageFile(null);
            setImagePreview(safeData.prod_img || '');
            setSubmitStatus(null);
        }
    }, [open, initialData, reset]);

    // Form submission handler
    const onSubmitForm = async (formData) => {

        try {
            setSubmitStatus(null);
            const submissionData = new FormData();
            Object.keys(formData).forEach(key => {
                if (key !== 'prod_img') {
                    submissionData.append(key, formData[key]);
                }
            });
            if (imageFile) {
                submissionData.append('prod_img', imageFile);
            } else if (formData.prod_img && formData.prod_img.trim()) {
                submissionData.append('prod_img_url', formData.prod_img);
            }

            console.log('Submitting FormData with:');
            for (let pair of submissionData.entries()) {
                console.log(pair[0], pair[1]);
            }
            console.log(submissionData);
            

            await onSubmit(submissionData);

            setSubmitStatus({
                type: 'success',
                message: `Product ${isEditing ? 'updated' : 'added'} successfully!`
            });

            if (!isEditing) {
                reset();
                handleRemoveImage();
            }

            setTimeout(() => {
                onClose();
                setSubmitStatus(null);
            }, 1500);

        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus({
                type: 'error',
                message: error?.message || 'Submission failed. Please try again.'
            });
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

        if (!validTypes.includes(file.type)) {
            setSubmitStatus({
                type: 'error',
                message: 'Invalid image type. Please upload JPEG, PNG, GIF, or WebP images.'
            });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setSubmitStatus({
                type: 'error',
                message: 'Image must be less than 5MB'
            });
            return;
        }

        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setValue('prod_img', ''); // Clear URL field when file is uploaded
        };
        reader.readAsDataURL(file);

        setSubmitStatus(null);
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview('');
        setValue('prod_img', '');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setSubmitStatus(null);
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            disableEscapeKeyDown={isSubmitting}
        >
            <DialogTitle>
                {isEditing ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogContent dividers>
                {submitStatus && (
                    <Alert
                        severity={submitStatus.type}
                        sx={{ mb: 2 }}
                        onClose={() => setSubmitStatus(null)}
                    >
                        {submitStatus.message}
                    </Alert>
                )}

                <Box component="form" id="product-form" onSubmit={handleSubmit(onSubmitForm)} noValidate>
                    <Grid container spacing={3}>

                        {/* Basic Information Section */}
                        <Grid size={12}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 2 }}>
                                Basic Information
                            </Typography>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <CustomTextField
                                label="Product Title *"
                                name="title"
                                register={() => register('title', { 
                                    required: 'Product Title is required' 
                                })}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                icon={ShoppingCart}
                                placeholder="Enter product title"
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <CustomTextField
                                label="Price *"
                                name="price"
                                type="number"
                                register={() => register('price', { 
                                    required: 'Price is required',
                                    validate: value => {
                                        const num = parseFloat(value);
                                        if (isNaN(num)) return 'Price must be a number';
                                        if (num <= 0) return 'Price must be greater than 0';
                                        return true;
                                    }
                                })}
                                error={!!errors.price}
                                helperText={errors.price?.message}
                                icon={AttachMoney}
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
                                label="Quantity *"
                                name="quantity"
                                type="number"
                                register={() => register('quantity', { 
                                    required: 'Quantity is required',
                                    validate: value => {
                                        const num = parseInt(value);
                                        if (isNaN(num)) return 'Quantity must be a number';
                                        if (num < 0) return 'Quantity cannot be negative';
                                        return true;
                                    }
                                })}
                                error={!!errors.quantity}
                                helperText={errors.quantity?.message}
                                icon={Inventory}
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
                                label="Discount (%)"
                                name="discount"
                                type="number"
                                register={() => register('discount', {
                                    validate: value => {
                                        if (!value) return true; // Optional field
                                        const num = parseFloat(value);
                                        if (isNaN(num)) return 'Discount must be a number';
                                        if (num < 0) return 'Discount cannot be negative';
                                        if (num > 100) return 'Discount cannot exceed 100%';
                                        return true;
                                    }
                                })}
                                error={!!errors.discount}
                                helperText={errors.discount?.message || 'Optional: Enter discount percentage (0-100)'}
                                icon={Discount}
                                placeholder="0"
                                inputProps={{ min: '0', max: '100', step: '0.01' }}
                            />
                        </Grid>

                        {/* Categories & Brand Section */}
                        <Grid size={12}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
                                Categories & Brand
                            </Typography>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: 'Category is required' }}
                                render={({ field }) => (
                                    <CategoryDropdown
                                        categories={categories}
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={!!errors.category}
                                        helperText={errors.category?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <Controller
                                name="brand"
                                control={control}
                                rules={{ required: 'Brand is required' }}
                                render={({ field }) => (
                                    <BrandDropdown
                                        brands={brands}
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={!!errors.brand}
                                        helperText={errors.brand?.message}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Product Features Section */}
                        <Grid size={12}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
                                Product Features
                            </Typography>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 4
                            }}>
                            <Controller
                                name="featured"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        }
                                        label="Featured Product"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 4
                            }}>
                            <Controller
                                name="has_variants"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        }
                                        label="Has Variants"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 4
                            }}>
                            <CustomTextField
                                label="Rating"
                                name="rating"
                                type="number"
                                register={() => register('rating', {
                                    validate: value => {
                                        if (!value) return true;
                                        const num = parseFloat(value);
                                        if (isNaN(num)) return 'Rating must be a number';
                                        if (num < 0) return 'Rating cannot be negative';
                                        if (num > 5) return 'Rating cannot exceed 5';
                                        return true;
                                    }
                                })}
                                error={!!errors.rating}
                                helperText={errors.rating?.message || 'Optional: Rating (0-5)'}
                                icon={Star}
                                placeholder="0"
                                inputProps={{ min: '0', max: '5', step: '0.1' }}
                            />
                        </Grid>

                        {hasVariants && (
                            <>
                                <Grid size={12}>
                                    <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
                                        Variant Pricing
                                    </Typography>
                                </Grid>

                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6
                                    }}>
                                    <CustomTextField
                                        label="Min Variant Price"
                                        name="min_variant_price"
                                        type="number"
                                        register={() => register('min_variant_price', {
                                            validate: value => {
                                                if (!value) return true; // Optional field
                                                const num = parseFloat(value);
                                                if (isNaN(num)) return 'Min variant price must be a number';
                                                if (num <= 0) return 'Min variant price must be greater than 0';
                                                return true;
                                            }
                                        })}
                                        error={!!errors.min_variant_price}
                                        helperText={errors.min_variant_price?.message || 'Minimum price for variants'}
                                        icon={TrendingUp}
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
                                        label="Max Variant Price"
                                        name="max_variant_price"
                                        type="number"
                                        register={() => register('max_variant_price', {
                                            validate: value => {
                                                if (!value) return true; // Optional field
                                                const num = parseFloat(value);
                                                if (isNaN(num)) return 'Max variant price must be a number';
                                                if (num <= 0) return 'Max variant price must be greater than 0';
                                                return true;
                                            }
                                        })}
                                        error={!!errors.max_variant_price}
                                        helperText={errors.max_variant_price?.message || 'Maximum price for variants'}
                                        icon={TrendingUp}
                                        placeholder="0.00"
                                        inputProps={{ step: '0.01', min: '0' }}
                                    />
                                </Grid>
                            </>
                        )}

                        {/* Product Image Section */}
                        <Grid size={12}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
                                Product Image
                            </Typography>
                        </Grid>

                        <Grid size={12}>
                            {/* Image Preview */}
                            {imagePreview && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <Avatar
                                        src={imagePreview}
                                        sx={{ width: 80, height: 80 }}
                                        variant="rounded"
                                    />
                                    <IconButton
                                        onClick={handleRemoveImage}
                                        color="error"
                                        size="small"
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            )}

                            {/* File Upload */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <Button
                                variant="outlined"
                                startIcon={<CloudUpload />}
                                onClick={() => fileInputRef.current?.click()}
                                sx={{ mb: 2 }}
                                disabled={isSubmitting}
                            >
                                Upload Image
                            </Button>

                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Or enter image URL below:
                            </Typography>

                            {/* Image URL Field */}
                            <CustomTextField
                                label="Image URL"
                                name="prod_img"
                                register={() => register('prod_img', {
                                    validate: value => {
                                        if (!value) return true; // Optional field
                                        try {
                                            new URL(value);
                                            return true;
                                        } catch {
                                            return 'Invalid URL';
                                        }
                                    }
                                })}
                                error={!!errors.prod_img}
                                helperText={errors.prod_img?.message || 'Optional: Enter a valid URL for the product image'}
                                icon={Image}
                                placeholder="https://example.com/image.jpg"
                                disabled={!!imageFile || isSubmitting}
                            />
                        </Grid>

                        {/* Content Section */}
                        <Grid size={12}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
                                Content
                            </Typography>
                        </Grid>

                        <Grid size={12}>
                            <CustomTextField
                                label="Description *"
                                name="description"
                                multiline
                                rows={4}
                                register={() => register('description', { 
                                    required: 'Description is required' 
                                })}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                icon={Description}
                                placeholder="Enter detailed product description"
                            />
                        </Grid>

                        <Grid size={12}>
                            <CustomTextField
                                label="Keywords *"
                                name="keywords"
                                multiline
                                rows={3}
                                register={() => register('keywords', { 
                                    required: 'Keywords are required' 
                                })}
                                error={!!errors.keywords}
                                helperText={errors.keywords?.message || 'Enter keywords separated by commas for SEO'}
                                icon={LocalOffer}
                                placeholder="e.g., smartphone, electronics, mobile phone, android"
                            />
                        </Grid>

                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <LoadingButton
                    onClick={handleSubmit(onSubmitForm)}
                    loading={isSubmitting}
                    loadingText={isEditing ? 'Updating...' : 'Adding...'}
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{ minWidth: 120 }}
                >
                    {isEditing ? 'Update Product' : 'Add Product'}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default ProductFormDialog;