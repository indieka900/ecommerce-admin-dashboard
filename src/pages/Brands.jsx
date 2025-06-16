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
import { useState } from 'react';

const Brands = () => {
    const [brands, setBrands] = useState([
        { id: 1, brand_title: "Zara", product_count: 2 },
        { id: 2, brand_title: "Nike", product_count: 2 }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [editBrand, setEditBrand] = useState(null);
    const [formData, setFormData] = useState({ brand_title: '', product_count: '' });

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
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Brand Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                >
                    Add Brand
                </Button>
            </Box>
            <TextField
                fullWidth
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                sx={{ mb: 3 }}
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
                        value={formData.brand_title}
                        onChange={handleFormChange}
                    />
                    <TextField
                        name="product_count"
                        label="Product Count"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formData.product_count}
                        onChange={handleFormChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveBrand}>
                        {editBrand ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Brands;
