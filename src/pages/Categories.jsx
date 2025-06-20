import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/Charts/StatsCard'
import SearchBar from '../components/common/SearchBar';
import { formatters } from '../utils/formatters';
import LoadingButton from '../components/ui/LoadingButton';
import {
    Box, Button, Paper, Typography,
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, FormControl,
    InputLabel, Select, MenuItem, IconButton,
    Chip, Accordion, Alert, Grid, List,
    ListItem, ListItemText, ListItemSecondaryAction,
    Container, Stack, AccordionSummary, AccordionDetails
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
import CategoryLoadingSkeleton from '../components/categories/CategorySkelleton';
import useCategory from '../hooks/useCategory';



const CategoryManagement = () => {
    const {
        parentCategories,
        categories,
        filteredParentCategories,
        filteredCategories,
        loadingData,
        searchTerm,
        dialogOpen,
        dialogType,
        isSaving,
        editMode,
        error,
        deleteDialogOpen,
        deleteTarget,
        loading,
        currentItem,
        // snackbar,

        // Handlers
        handleOpenDialog,
        handleCloseDialog,
        handleInputChange,
        handleSave,
        handleDelete,
        confirmDelete,
        getCategoriesForParent,

        // Utilities
        setCurrentItem,
        setSearchTerm,
        // setSnackbar,
        setDeleteDialogOpen,
    } = useCategory();

    if (loadingData) return (
        <CategoryLoadingSkeleton />
    );



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
                {error ? (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                        action={
                            <Button color="inherit" size="small" onClick={{}}>
                                Retry
                            </Button>
                        }
                    >
                        {error}
                    </Alert>
                ) :
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
                }

                {/* Categories Display */}
                <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                        Category Hierarchy
                    </Typography>

                    {error == null && (
                        filteredParentCategories.length === 0 ? (
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
                        ))}
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
                {/* <Snackbar
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
                </Snackbar> */}
            </Box>
        </Container>
    );
};

export default CategoryManagement;