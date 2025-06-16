import {
    Container, Box, Typography, TextField, InputAdornment,
    IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    Grid, Card, CardContent, Avatar, Chip
} from '@mui/material';
import {
    Search as SearchIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Store as StoreIcon
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import LoadingButton from '../components/ui/LoadingButton';
import { productService } from '../services/productService';

const Brands = () => {
    const [brands, setBrands] = useState([
        { id: 1, brand_title: "Zara", product_count: 2 },
        { id: 2, brand_title: "Nike", product_count: 2 }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editBrand, setEditBrand] = useState(null);
    const [formData, setFormData] = useState({ brand_title: '', product_count: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedBrands = await productService.getProductBrands();
                setBrands(fetchedBrands);

            } catch (err) {
                console.error(err);
                // setError(err.message || "An error occurred");
                // showNotification(err.message || "Failed to load product data", "error");
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredBrands = brands.filter(brand =>
        brand.brand_title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleOpenDialog = (brand = null) => {
        setEditBrand(brand);
        setFormData(brand || { brand_title: '', product_count: '' });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFormData({ brand_title: '', product_count: '' });
        setEditBrand(null);
    };

    const handleFormChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSaveBrand = () => {
        if (editBrand) {
            setBrands(prev =>
                prev.map(b => (b.id === editBrand.id ? { ...b, ...formData } : b))
            );
        } else {
            const newBrand = {
                id: Date.now(),
                ...formData,
                product_count: Number(formData.product_count) || 0
            };
            setBrands(prev => [...prev, newBrand]);
        }
        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setBrands(prev => prev.filter(brand => brand.id !== id));
    };

    return (
        <Container maxWidth="lg">
            <PageHeader
                title="Brand Management"
                subtitle="Manage all product brands"
                actions={[
                    {
                        label: 'Add Brand',
                        icon: <AddIcon />,
                        onClick: () => handleOpenDialog(),
                    },
                ]}
            />

            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search brands..."
            />

            <Grid container spacing={2}>
                {filteredBrands.map((brand) => (
                    <Grid
                        key={brand.id}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 3
                        }}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Avatar sx={{ margin: '0 auto 12px' }}>
                                    {brand.brand_title.charAt(0)}
                                </Avatar>
                                <Typography variant="h6">{brand.brand_title}</Typography>
                                <Chip
                                    label={`${brand.product_count} Products`}
                                    icon={<StoreIcon />}
                                    size="small"
                                    color="primary"
                                    sx={{ my: 1 }}
                                />
                                <Box display="flex" justifyContent="center" gap={1} mt={1}>
                                    <IconButton color="primary" onClick={() => handleOpenDialog(brand)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(brand.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>{editBrand ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
                <DialogContent sx={{ mt: 1 }}>
                    <TextField
                        name="brand_title"
                        label="Brand Title"
                        fullWidth
                        margin="normal"
                        required={true}
                        value={formData.brand_title}
                        onChange={handleFormChange}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <LoadingButton
                        variant="contained"
                        onClick={handleSaveBrand}
                        loading={isSaving}
                        loadingText={editBrand ? 'Updating...' : 'Adding...'}
                    >
                        {editBrand ? 'Update' : 'Add'}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Brands;
