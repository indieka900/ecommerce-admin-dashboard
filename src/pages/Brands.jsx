import {
    Box, Typography, TextField, IconButton, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Grid, Card, CardContent, Avatar, Chip, Paper, Skeleton,
    Alert, Fade, Grow, CardActionArea, Tooltip, Divider
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Store as StoreIcon,
    Business as BusinessIcon,
    TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useState, useCallback, useMemo } from 'react';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import LoadingButton from '../components/ui/LoadingButton';
import { productService } from '../services/productService';
import ConfirmDialog from '../components/blog/DeleteDialog';
import toast from 'react-hot-toast';
import { useBrands } from '../hooks/useBrands';

// Brand Card Component
const BrandCard = ({ brand, onEdit, requestDelete }) => {

    return (
        <Grow in timeout={300}>
            <Card
                elevation={2}
                sx={{
                    height: '100%',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                    }
                }}
            >
                <CardActionArea
                    onClick={() => onEdit(brand)}
                    sx={{ height: '100%' }}
                >
                    <CardContent sx={{
                        textAlign: 'center',
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Box>
                            <Avatar
                                sx={{
                                    margin: '0 auto 16px',
                                    width: 56,
                                    height: 56,
                                    bgcolor: 'primary.main',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                {brand.brand_title.charAt(0).toUpperCase()}
                            </Avatar>

                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 2,
                                    fontWeight: 600,
                                    color: 'text.primary'
                                }}
                            >
                                {brand.brand_title}
                            </Typography>

                            <Chip
                                label={`${brand.product_count} ${brand.product_count === 1 ? 'Product' : 'Products'}`}
                                icon={<StoreIcon />}
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{
                                    mb: 2,
                                    fontWeight: 500
                                }}
                            />
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Box
                            display="flex"
                            justifyContent="center"
                            gap={1}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Tooltip title="Edit Brand">
                                <IconButton
                                    color="primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(brand);
                                    }}
                                    size="small"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'primary.light',
                                            color: 'white'
                                        }
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete Brand">
                                <IconButton
                                    color="error"
                                    onClick={() => requestDelete(brand)}
                                    size="small"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'error.light',
                                            color: 'white'
                                        }
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>

                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grow>
    );
};

// Loading Skeleton Component
const BrandCardSkeleton = () => (
    <Card elevation={2}>
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
            <Skeleton variant="circular" width={56} height={56} sx={{ margin: '0 auto 16px' }} />
            <Skeleton variant="text" width="60%" height={32} sx={{ margin: '0 auto 16px' }} />
            <Skeleton variant="rounded" width="40%" height={24} sx={{ margin: '0 auto 16px' }} />
            <Box display="flex" justifyContent="center" gap={1} mt={2}>
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="circular" width={32} height={32} />
            </Box>
        </CardContent>
    </Card>
);

// Empty State Component
const EmptyState = ({ searchTerm }) => (
    <Paper
        elevation={0}
        sx={{
            p: 6,
            textAlign: 'center',
            backgroundColor: 'grey.50',
            border: '2px dashed',
            borderColor: 'grey.300'
        }}
    >
        <BusinessIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchTerm ? 'No brands found' : 'No brands available'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm
                ? `No brands match "${searchTerm}". Try adjusting your search.`
                : 'Start by adding your first brand to organize your products.'
            }
        </Typography>
        {!searchTerm && (
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => { }}
                sx={{ mt: 1 }}
            >
                Add Your First Brand
            </Button>
        )}
    </Paper>
);

// Statistics Component
const BrandStats = ({ brands }) => {
    const totalProducts = useMemo(() =>
        brands.reduce((sum, brand) => sum + brand.product_count, 0),
        [brands]
    );

    if (brands.length === 0) return null;

    return (
        <Paper elevation={1} sx={{ p: 2, mb: 3, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
            <Box display="flex" alignItems="center" gap={2}>
                <TrendingUpIcon />
                <Typography variant="body1" fontWeight={500}>
                    {brands.length} {brands.length === 1 ? 'Brand' : 'Brands'} • {totalProducts} Total Products
                </Typography>
            </Box>
        </Paper>
    );
};

const Brands = () => {
    const { brands, setBrands, loading, error, refetch } = useBrands();
    const [searchTerm, setSearchTerm] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editBrand, setEditBrand] = useState(null);
    const [formData, setFormData] = useState({ brand_title: '' });
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState(null);
    const [loading_d, setLoading_d] = useState(false);


    // Memoized filtered brands for performance
    const filteredBrands = useMemo(() =>
        brands.filter(brand =>
            brand.brand_title.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [brands, searchTerm]
    );

    const handleOpenDialog = useCallback((brand = null) => {
        setEditBrand(brand);
        setFormData(brand ? { brand_title: brand.brand_title } : { brand_title: '' });
        setOpenDialog(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setOpenDialog(false);
        setFormData({ brand_title: '' });
        setEditBrand(null);
    }, []);

    const handleFormChange = useCallback((e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleSaveBrand = async () => {
        if (!formData.brand_title?.trim()) {
            toast.error("Brand title is required");
            return;
        }

        try {
            setIsSaving(true);

            if (editBrand) {
                const updatedBrand = await productService.updateBrand(editBrand.id, formData);
                setBrands(prev =>
                    prev.map(b => (b.id === editBrand.id ? { ...b, ...updatedBrand } : b))
                );
                toast.success("Brand updated successfully");
            } else {
                const newBrand = await productService.addBrand(formData);
                setBrands(prev => [...prev, newBrand]);
                toast.success("Brand added successfully");
            }

            handleCloseDialog();
        } catch (error) {
            console.error('Error saving brand:', error);
            toast.error(error.message || "Failed to save brand");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading_d(true);
        try {
            await productService.deleteBrand(id);
            setBrands(prev => prev.filter(brand => brand.id !== id));
            setConfirmOpen(false);
            setBrandToDelete(null);
            toast.success("Brand deleted successfully");
        } catch (error) {
            console.error('Error deleting brand:', error);
            toast.error(error.message || "Failed to delete brand");
        } finally {
            setLoading_d(false);
        }
    };



    return (
        <Box>
            <PageHeader
                title="Brand Management"
                subtitle="Manage all product brands and organize your inventory"
                actions={[
                    {
                        label: 'Add Brand',
                        icon: <AddIcon />,
                        onClick: () => handleOpenDialog(),
                        variant: 'contained'
                    },
                ]}
            />

            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                    action={
                        <Button color="inherit" size="small" onClick={refetch}>
                            Retry
                        </Button>
                    }
                >
                    {error}
                </Alert>
            )}

            <BrandStats brands={brands} />

            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search brands..."
                sx={{ mb: 3 }}
            />

            {loading ? (
                <Grid container spacing={3}>
                    {[...Array(6)].map((_, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <BrandCardSkeleton />
                        </Grid>
                    ))}
                </Grid>
            ) : filteredBrands.length === 0 ? (
                <EmptyState searchTerm={searchTerm} />
            ) : (
                <Grid container spacing={3}>
                    {filteredBrands.map((brand) => (
                        <Grid
                            key={brand.id}
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        >
                            <BrandCard
                                brand={brand}
                                onEdit={handleOpenDialog}
                                requestDelete={(brand) => {
                                    setBrandToDelete(brand);
                                    setConfirmOpen(true);
                                }}
                            />


                        </Grid>

                    ))}
                </Grid>
            )}

            {/* Add/Edit Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="sm"
                TransitionComponent={Fade}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                    }
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <BusinessIcon color="primary" />
                        {editBrand ? 'Edit Brand' : 'Add New Brand'}
                    </Box>
                </DialogTitle>

                <DialogContent sx={{ pt: 2 }}>
                    <TextField
                        name="brand_title"
                        label="Brand Title"
                        fullWidth
                        margin="normal"
                        required
                        value={formData.brand_title}
                        onChange={handleFormChange}
                        error={!formData.brand_title?.trim() && formData.brand_title !== ''}
                        helperText={!formData.brand_title?.trim() && formData.brand_title !== '' ? 'Brand title is required' : ''}
                        autoFocus
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            }
                        }}
                    />
                </DialogContent>

                <DialogActions sx={{ p: 3, gap: 1 }}>
                    <Button
                        onClick={handleCloseDialog}
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                    >
                        Cancel
                    </Button>
                    <LoadingButton
                        variant="contained"
                        onClick={handleSaveBrand}
                        disabled={!formData.brand_title?.trim()}
                        loading={isSaving}
                        loadingText={editBrand ? 'Updating...' : 'Adding...'}
                        sx={{ borderRadius: 2, minWidth: 100 }}
                    >
                        {editBrand ? 'Update' : 'Add'}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            <ConfirmDialog
                open={confirmOpen}
                title="Delete Brand"
                content={`Are you sure you want to delete "${brandToDelete?.brand_title}"?`}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => handleDelete(brandToDelete.id)}
                loading={loading_d}
            />
        </Box>
    );
};

export default Brands;