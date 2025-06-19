import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/Charts/StatsCard'
import SearchBar from '../components/common/SearchBar';
import { formatters } from '../utils/formatters';
import LoadingButton from '../components/ui/LoadingButton';
import {
    Box,
    Button,
    Paper,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Chip,
    Accordion,
    Alert,
    Snackbar,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Container,
    Stack,

    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Category as CategoryIcon,
    AccountTree as TreeIcon,
    ExpandMore as ExpandMoreIcon,
    Store as StoreIcon,
    FolderOpenOutlined as FolderOpenIcon
} from '@mui/icons-material';
import ConfirmDialog from '../components/blog/DeleteDialog';



const CategoryManagement = () => {
    const [parentCategories, setParentCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState('category');
    const [isSaving, setIsSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState({
        type: null,
        id: null,
        name: '',
    });
    const [loading, setLoading] = useState(false);
    const [currentItem, setCurrentItem] = useState({
        id: null,
        category_name: '',
        parent_category_name: '',
        parent_category: '',
        parent_name: ''
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedCategories, fetchedParentsC] = await Promise.all([
                    productService.getProductCategories(),
                    productService.getParentCategories()
                ]);

                setCategories(fetchedCategories);
                setParentCategories(fetchedParentsC)

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

    // Filter items based on search
    const filteredParentCategories = parentCategories.filter(parent =>
        parent.parent_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCategories = categories.filter(category =>
        category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.parent_category_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenDialog = (type, item = null) => {
        setDialogType(type);
        if (item) {
            setCurrentItem(item);
            setEditMode(true);
        } else {
            setCurrentItem({
                id: null,
                category_name: '',
                parent_category: '',
                parent_name: ''
            });
            setEditMode(false);
        }
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCurrentItem({
            id: null,
            category_name: '',
            parent_category: '',
            parent_name: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            setIsSaving(true)
            if (dialogType === 'parent') {
                if (!currentItem.parent_name) {
                    showSnackbar('Parent category name is required', 'error');
                    return;
                }

                if (editMode) {
                    // UPDATE parent category

                    const updatedParent = await productService.updateParentCategory(currentItem.id, {
                        parent_name: currentItem.parent_name
                    });

                    setParentCategories(prev => prev.map(parent =>
                        parent.id === currentItem.id ? updatedParent : parent
                    ));
                    showSnackbar('Parent category updated successfully', 'success');
                } else {
                    // CREATE new parent category

                    const newParent = await productService.addParentCategory({
                        parent_name: currentItem.parent_name
                    });

                    setParentCategories(prev => [...prev, newParent]);
                    showSnackbar('Parent category added successfully', 'success');
                }
            } else {
                // Child category operations
                if (!currentItem.category_name || !currentItem.parent_category) {
                    showSnackbar('Category name and parent category are required', 'error');
                    return;
                }

                if (editMode) {
                    // UPDATE child category

                    const updatedCategory = await productService.updateCategory(currentItem.id, {
                        category_name: currentItem.category_name,
                        parent_category: currentItem.parent_category
                    });

                    setCategories(prev => prev.map(cat =>
                        cat.id === currentItem.id ? updatedCategory : cat
                    ));
                    showSnackbar('Category updated successfully', 'success');
                } else {
                    // CREATE new child category

                    const newCategory = await productService.addCategory({
                        category_name: currentItem.category_name,
                        parent_category: currentItem.parent_category
                    });

                    setCategories(prev => [...prev, newCategory]);
                    showSnackbar('Category added successfully', 'success');
                }
            }
            handleCloseDialog();
        } catch (error) {
            console.error('API Error:', error);

            if (error.response) {
                const message = error.response.data?.message || 'Operation failed';
                showSnackbar(message, 'error');
            } else if (error.request) {
                showSnackbar('Network error. Please check your connection.', 'error');
            } else {
                showSnackbar('An unexpected error occurred', 'error');
            }
        } finally {
            setIsSaving(false)
        }
    };

    const handleDelete = (type, id, name) => {
        setDeleteTarget({ type, id, name });
        setDeleteDialogOpen(true);
    };


    const confirmDelete = async () => {
        setLoading(true);
        try {
            if (deleteTarget.type === 'parent') {
                // Check if parent has categories
                const hasCategories = categories.some(cat => cat.parent_category_name === deleteTarget.name);
                if (hasCategories) {
                    showSnackbar('Cannot delete parent category with existing categories', 'error');
                    return;
                }
                await productService.deleteParentCategory(deleteTarget.id);
                setParentCategories(prev => prev.filter(parent => parent.id !== deleteTarget.id));
                showSnackbar('Parent category deleted successfully', 'success');
            } else {
                await productService.deleteCategory(deleteTarget.id)
                setCategories(prev => prev.filter(cat => cat.id !== deleteTarget.id));
                showSnackbar('Category deleted successfully', 'success');
            }
        } catch (error) {
            showSnackbar(error, 'error')
        } finally {
            setLoading(false);
            setDeleteDialogOpen(false);
        }

    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const getCategoriesForParent = (parentName) => {
        return filteredCategories.filter(cat => cat.parent_category_name === parentName);
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ py: 4 }}>
                {/* Header */}
                <PageHeader
                    title="Category Management"
                    subtitle="Manage your product categories and parent categories"
                    color="purple"
                    actions={[
                        {
                            label: 'Add Parent Category',
                            icon: <FolderOpenIcon />,
                            onClick: () => handleOpenDialog('parent'),
                        },
                        {
                            label: 'Add Category',
                            icon: <AddIcon />,
                            onClick: () => handleOpenDialog('category'),
                        },
                    ]}
                />


                {/* Search Bar */}
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search categories and parent categories..."
                />

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3
                        }}>
                        <StatCard
                            value={filteredParentCategories.length}
                            label="Parent Categories"
                            icon={(props) => <FolderOpenIcon {...props} />}
                            iconColor="#6366f1"
                        />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3
                        }}>
                        <StatCard
                            value={filteredCategories.length}
                            label="Categories"
                            icon={(props) => <CategoryIcon {...props} />}
                            iconColor="#f59e0b"
                        />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3
                        }}>
                        <StatCard
                            value={formatters.productCountTotal(categories)}
                            label="Total Products"
                            icon={(props) => <StoreIcon {...props} />}
                            iconColor="#06b6d4"
                        />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3
                        }}>
                        <StatCard
                            value={formatters.avgProductsPerCategory(categories)}
                            label="Avg Products/Category"
                            icon={(props) => <TreeIcon {...props} />}
                            iconColor="#34d399"
                        />
                    </Grid>
                </Grid>

                {/* Categories Display */}
                <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                        Category Hierarchy
                    </Typography>

                    {filteredParentCategories.length === 0 ? (
                        <Box textAlign="center" py={8}>
                            <FolderOpenIcon sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary">
                                No parent categories found
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={3}>
                                {searchTerm ? 'Try adjusting your search terms' : 'Create your first parent category to get started'}
                            </Typography>
                            {!searchTerm && (
                                <Button
                                    variant="contained"
                                    startIcon={<FolderOpenIcon />}
                                    onClick={() => handleOpenDialog('parent')}
                                >
                                    Add Parent Category
                                </Button>
                            )}
                        </Box>
                    ) : (
                        filteredParentCategories.map((parent) => {
                            const parentCategories = getCategoriesForParent(parent.parent_name);
                            return (
                                <Accordion
                                    key={parent.id} defaultExpanded
                                    sx={{ mb: 2, boxShadow: 2 }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                            '& .MuiAccordionSummary-expandIconWrapper': { color: 'white' }
                                        }}
                                    >
                                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                            <Box display="flex" alignItems="center" gap={2}>
                                                <FolderOpenIcon />
                                                <Typography variant="h6" fontWeight="bold">
                                                    {parent.parent_name}
                                                </Typography>
                                                <Chip
                                                    label={`${parentCategories.length} categories`}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'rgba(255,255,255,0.2)',
                                                        color: 'white',
                                                        fontWeight: 'bold'
                                                    }}
                                                />
                                            </Box>
                                            <Box display="flex" gap={1} onClick={(e) => e.stopPropagation()}>
                                                <IconButton
                                                    component="span"
                                                    onClick={() => handleOpenDialog('parent', parent)}
                                                    size="small"
                                                    sx={{ color: 'white' }}
                                                >
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton
                                                    onClick={() => handleDelete('parent', parent.id, parent.parent_name)}
                                                    size="small"
                                                    sx={{ color: 'white' }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>

                                            </Box>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ p: 0 }}>
                                        {parentCategories.length === 0 ? (
                                            <Box p={3} textAlign="center">
                                                <CategoryIcon sx={{ fontSize: 60, color: 'grey.300', mb: 2 }} />
                                                <Typography variant="body1" color="text.secondary" mb={2}>
                                                    No categories in this parent category
                                                </Typography>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<AddIcon />}
                                                    onClick={() => {
                                                        setCurrentItem(prev => ({ ...prev, parent_category_name: parent.parent_name }));
                                                        handleOpenDialog('category');
                                                    }}
                                                >
                                                    Add Category
                                                </Button>
                                            </Box>
                                        ) : (
                                            <List>
                                                {parentCategories.map((category) => (
                                                    <ListItem key={category.id} divider
                                                    // secondaryAction={}
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                <Box display="flex" alignItems="center" gap={2}>
                                                                    <CategoryIcon color="primary" />
                                                                    <Typography variant="subtitle1" fontWeight="medium">
                                                                        {category.category_name}
                                                                    </Typography>

                                                                    <Chip
                                                                        label={`Product(s): ${category.product_count}`}
                                                                        size="small"
                                                                        variant="outlined"
                                                                        color="primary"
                                                                        background="secondary"
                                                                    />


                                                                </Box>
                                                            }
                                                        />

                                                        <ListItemSecondaryAction>
                                                            <IconButton
                                                                onClick={() => handleOpenDialog('category', category)}
                                                                color="primary"
                                                                size="small"
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={() => handleDelete('category', category.id, category.category_name)}
                                                                color="error"
                                                                size="small"
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        )}
                                    </AccordionDetails>
                                    <ConfirmDialog
                                        open={deleteDialogOpen}
                                        title={`Delete ${deleteTarget.type === 'parent' ? 'Parent Category' : 'Category'}`}
                                        content={`Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`}
                                        onClose={() => setDeleteDialogOpen(false)}
                                        onConfirm={confirmDelete}
                                        loading={loading}
                                    />

                                </Accordion>
                            );
                        })
                    )}
                </Paper>

                <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                    <DialogTitle
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            px: 3,
                            py: 2,
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={1}>
                            {dialogType === 'parent' ? <FolderOpenIcon /> : <CategoryIcon />}
                            {editMode ? 'Edit' : 'Add New'}{' '}
                            {dialogType === 'parent' ? 'Parent Category' : 'Category'}
                        </Box>
                    </DialogTitle>

                    <DialogContent
                        dividers
                        sx={{
                            px: 3,
                            py: 3,
                        }}
                    >
                        <Stack spacing={3}>
                            {dialogType === 'parent' ? (
                                <TextField
                                    name="parent_name"
                                    label="Parent Category Name"
                                    value={currentItem.parent_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                />
                            ) : (
                                <>
                                    <TextField
                                        name="category_name"
                                        label="Category Name"
                                        value={currentItem.category_name}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                        variant="outlined"
                                    />
                                    <FormControl fullWidth required>
                                        <InputLabel>Parent Category</InputLabel>
                                        <Select
                                            name="parent_category"
                                            value={currentItem.parent_category || ''}
                                            label="Parent Category"
                                            onChange={handleInputChange}
                                        >
                                            {parentCategories.map(parent => (
                                                <MenuItem key={parent.id} value={parent.id}>
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <FolderOpenIcon fontSize="small" />
                                                        {parent.parent_name}
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </>
                            )}
                        </Stack>
                    </DialogContent>

                    <DialogActions
                        sx={{
                            px: 3,
                            py: 2,
                        }}
                    >
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <LoadingButton
                            onClick={handleSave}
                            loading={isSaving}
                            loadingText={editMode ? 'Updating...' : 'Adding...'}
                        >
                            {editMode ? 'Update' : 'Add'} {dialogType === 'parent' ? 'Parent Category' : 'Category'}
                        </LoadingButton>
                    </DialogActions>
                </Dialog>


                {/* Snackbar */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default CategoryManagement;