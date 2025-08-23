/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Alert,
    Chip,
    Grid,
    Tooltip,
    CircularProgress,
    InputAdornment
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Save as SaveIcon,
    Inventory as InventoryIcon,
    ColorLens as ColorIcon,
    Straighten as SizeIcon
} from '@mui/icons-material';

import { productService } from '../../services/productService';


const ProductVariant = ({ product, open, onClose, onVariantsUpdate }) => {
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [editingVariant, setEditingVariant] = useState(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [deletingVariantId, setDeletingVariantId] = useState(null);
    const [formData, setFormData] = useState({
        size: '',
        color: '',
        stock: '',
        variant_price: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open && product) {
            loadVariants();
        }
    }, [open, product]);

    const loadVariants = async () => {
        setLoading(true);
        try {
            const data = await productService.getProductVariants(product.id);
            setVariants(data);
        } catch (error) {
            console.error('Error loading variants:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddVariant = () => {
        setEditingVariant(null);
        setFormData({
            size: '',
            color: '',
            stock: '',
            variant_price: ''
        });
        setFormErrors({});
        setFormOpen(true);
    };

    const handleEditVariant = (variant) => {
        setEditingVariant(variant);
        setFormData({
            size: variant.size || '',
            color: variant.color || '',
            stock: variant.stock.toString(),
            variant_price: variant.variant_price.toString()
        });
        setFormErrors({});
        setFormOpen(true);
    };

    const handleDeleteVariant = (variantId) => {
        setDeletingVariantId(variantId);
        setDeleteConfirmOpen(true);
    };

    const validateForm = () => {
        const errors = {};

        // At least one of size or color must be filled
        if (!formData.size.trim() && !formData.color.trim()) {
            errors.general = 'Either size or color must be specified';
        }

        // Stock validation
        if (!formData.stock || parseInt(formData.stock) < 0) {
            errors.stock = 'Stock must be a non-negative number';
        }

        // Variant price validation
        if (!formData.variant_price || parseFloat(formData.variant_price) <= 0) {
            errors.variant_price = 'Variant price is required and must be greater than 0';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = async () => {
        if (!validateForm()) return;

        setSubmitting(true);
        try {
            const variantData = {
                product_id: product.id,
                size: formData.size.trim(),
                color: formData.color.trim(),
                stock: parseInt(formData.stock),
                variant_price: parseFloat(formData.variant_price)
            };

            let result;
            if (editingVariant) {
                result = await productService.updateProductVariant(editingVariant.id, variantData);
                setVariants(prev => prev.map(v => v.id === editingVariant.id ? result : v));
            } else {
                result = await productService.addProductVariant(variantData);
                setVariants(prev => [...prev, result]);
            }

            setFormOpen(false);
            onVariantsUpdate && onVariantsUpdate();
        } catch (error) {
            console.error('Error saving variant:', error);
            setFormErrors({ general: 'Failed to save variant. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    const confirmDelete = async () => {
        setSubmitting(true);
        try {
            await productService.deleteProductVariant(deletingVariantId);
            setVariants(prev => prev.filter(v => v.id !== deletingVariantId));
            setDeleteConfirmOpen(false);
            onVariantsUpdate && onVariantsUpdate();
        } catch (error) {
            console.error('Error deleting variant:', error);
        } finally {
            setSubmitting(false);
            setDeletingVariantId(null);
        }
    };

    const getVariantDisplay = (variant) => {
        const parts = [];
        if (variant.size) parts.push(`Size: ${variant.size}`);
        if (variant.color) parts.push(`Color: ${variant.color}`);
        return parts.join(' | ') || 'No variant info';
    };

    const getStockStatus = (stock) => {
        if (stock === 0) return <Chip label="Out of Stock" color="error" size="small" />;
        if (stock < 10) return <Chip label="Low Stock" color="warning" size="small" />;
        return <Chip label="In Stock" color="success" size="small" />;
    };

    if (!product) return null;

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
                <DialogTitle>
                    <Box display="flex" alignItems="center" gap={2}>
                        <InventoryIcon />
                        <Box>
                            <Typography variant="h6">Manage Product Variants</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.title}
                            </Typography>
                        </Box>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <Box mb={3}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAddVariant}
                            disabled={loading}
                        >
                            Add New Variant
                        </Button>
                    </Box>

                    {loading ? (
                        <Box display="flex" justifyContent="center" py={4}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer component={Paper} variant="outlined">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Variant Details</TableCell>
                                        <TableCell align="right">Stock</TableCell>
                                        <TableCell align="right">Variant Price</TableCell>
                                        <TableCell align="right">Selling Price</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {variants.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">
                                                <Typography color="text.secondary" py={2}>
                                                    No variants found. Add your first variant above.
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        variants.map((variant) => (
                                            <TableRow key={variant.id} hover>
                                                <TableCell>
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        {variant.size && (
                                                            <Chip
                                                                icon={<SizeIcon />}
                                                                label={variant.size}
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        )}
                                                        {variant.color && (
                                                            <Chip
                                                                icon={<ColorIcon />}
                                                                label={variant.color}
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        )}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" fontWeight="medium">
                                                        {variant.stock}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2">
                                                        Ksh {variant.variant_price.toLocaleString()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" color="primary" fontWeight="medium">
                                                        Ksh {variant.selling_price.toLocaleString()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {getStockStatus(variant.stock)}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Tooltip title="Edit Variant">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleEditVariant(variant)}
                                                            color="primary"
                                                        >
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete Variant">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleDeleteVariant(variant.id)}
                                                            color="error"
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>
            {/* Variant Form Dialog */}
            <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingVariant ? 'Edit Variant' : 'Add New Variant'}
                </DialogTitle>
                <DialogContent>
                    {formErrors.general && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {formErrors.general}
                        </Alert>
                    )}

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}>
                            <TextField
                                fullWidth
                                label="Size"
                                value={formData.size}
                                onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                                placeholder="e.g., S, M, L, XL, 32, 34"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SizeIcon />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}>
                            <TextField
                                fullWidth
                                label="Color"
                                value={formData.color}
                                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                                placeholder="e.g., Red, Blue, Black"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ColorIcon />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}>
                            <TextField
                                fullWidth
                                label="Stock Quantity"
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                                error={!!formErrors.stock}
                                helperText={formErrors.stock}
                                slotProps={{
                                    htmlInput: { min: 0 }
                                }}
                            />
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}>
                            <TextField
                                fullWidth
                                label="Variant Price (Ksh)"
                                type="number"
                                value={formData.variant_price}
                                onChange={(e) => setFormData(prev => ({ ...prev, variant_price: e.target.value }))}
                                error={!!formErrors.variant_price}
                                helperText={formErrors.variant_price}
                                slotProps={{
                                    htmlInput: { min: 0, step: 0.01 }
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Alert severity="info" sx={{ mt: 2 }}>
                        <Typography variant="body2">
                            <strong>Note:</strong> Either size or color (or both) must be specified for each variant.
                        </Typography>
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setFormOpen(false)} disabled={submitting}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleFormSubmit}
                        disabled={submitting}
                        startIcon={submitting ? <CircularProgress size={16} /> : <SaveIcon />}
                    >
                        {submitting ? 'Saving...' : 'Save Variant'}
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this variant? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)} disabled={submitting}>
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={confirmDelete}
                        disabled={submitting}
                        startIcon={submitting ? <CircularProgress size={16} /> : <DeleteIcon />}
                    >
                        {submitting ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
            {/* <ConfirmDialog
                open={deleteConfirm.open}
                title="Delete Variant"
                content={`Are you sure you want to delete the variant "${deleteConfirm.variantName}"? This action cannot be undone.`}
                onClose={() => setDeleteConfirm({ open: false, variantId: null, variantName: '' })}
                onConfirm={confirmDeleteVariant}
                loading={loading}
            /> */}
        </>
    );
};

export default ProductVariant;