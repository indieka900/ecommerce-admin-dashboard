import { useState } from 'react';
import { productService } from '../services/productService';
import useProducts from '../hooks/useProducts';
import { LoadingAndErrorStates } from '../components/products/ProductSkelleton';

import {
    Box,
    Grid,
    Snackbar,
    Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ConfirmDialog from '../components/blog/DeleteDialog';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductCard } from '../components/products/ProductCard';
import { ProductTable } from '../components/products/ProductTable';
import { ProductStatsCards } from '../components/products/ProductStatsCards';
import { ProductDetailDialog } from '../components/products/ProductDetailDialog';
import PageHeader from '../components/common/PageHeader';
import ProductFormDialog from '../components/products/ProductFormDialog';
import { getDisplayPrice } from '../hooks/useProductUtils';
import { renderStockStatus, renderRating } from '../utils/productDisplayUtils';

import { useProductFilters } from '../hooks/useProductFilters';
import { useNotification } from '../hooks/useNotification';

const ProductsPage = () => {
    const [isEditting, setisEditting] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [viewMode, setViewMode] = useState('table');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [addProdDialogue, setaddProdDialogue] = useState(false);
    const [open_Delete, setOpen_Delete] = useState(false);

    // Product hook
    const {
        products,
        categories,
        brands,
        selectedProduct,
        setSelectedProduct,
        loading,
        error,
        loadingProductId,
        filteredProductImages,
        createProduct,
        updateProduct,
        deleteProduct,
        toggleFeatured,
        // getProductById,
        refreshProducts,
    } = useProducts(productService);

    // Filters hook
    const {
        filteredProducts,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand
    } = useProductFilters(products);

    // Notification hook
    const { snackbar, hideNotification } = useNotification();

    // Event handlers
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDialogClose = () => {
        setaddProdDialogue(false);
        setSelectedProduct(null);
        setisEditting(false);
    };

    const handleFormSubmit = async (data) => {
        try {
            if (selectedProduct) {
                await updateProduct(selectedProduct.id, data);
            } else {
                await createProduct(data);
            }
            handleDialogClose();
        } catch (err) {
            console.error('Form submission error:', err);
        }
    };

    const handleToggleFeatured = async (product) => {
        await toggleFeatured(product);
    };

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setisEditting(true);
        setaddProdDialogue(true);
    };

    const handleDeleteProduct = (product) => {
        setSelectedProduct(product);
        setOpen_Delete(true);
    };

    const handleProductDeleteConfirmed = async () => {
        if (!selectedProduct) return;

        try {
            await deleteProduct(selectedProduct.id);
            setOpen_Delete(false);
            setSelectedProduct(null);
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setisEditting(false);
        setaddProdDialogue(true);
    };

    // const handleViewModeChange = (mode) => {
    //     setViewMode(mode);
    // };

    return (
        <LoadingAndErrorStates
            loading={loading}
            error={error}
            onRetry={refreshProducts}>
            <Box>
                {/* Header */}

                <PageHeader
                    title="Product Management"
                    subtitle="Manage your product inventory"
                    actions={[
                        {
                            label: 'Add Product',
                            icon: <AddIcon />,
                            onClick: () => handleAddProduct(),
                        },
                    ]}
                />


                {/* Stats Cards */}
                <ProductStatsCards
                    products={products}
                    categories={categories}
                />

                {/* Filters */}
                <ProductFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    categories={categories}
                    selectedBrand={selectedBrand}
                    onBrandChange={setSelectedBrand}
                    brands={brands}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                />

                {/* Products Display */}
                {viewMode === 'table' ? (
                    <ProductTable
                        products={filteredProducts}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        onView={handleViewProduct}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                        onToggleFeatured={handleToggleFeatured}
                        loadingProductId={loadingProductId}
                        renderStockStatus={renderStockStatus}
                        renderRating={renderRating}
                        getDisplayPrice={getDisplayPrice}
                    />
                ) : (
                    <Grid container spacing={3}>
                        {filteredProducts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => (
                                <Grid
                                    key={product.id}
                                    size={{
                                        xs: 12,
                                        sm: 6,
                                        md: 4,
                                        lg: 3
                                    }}>
                                    <ProductCard
                                        product={product}
                                        onView={handleViewProduct}
                                        onEdit={handleEditProduct}
                                        onToggleFeatured={handleToggleFeatured}
                                        loadingProductId={loadingProductId}
                                        renderStockStatus={renderStockStatus}
                                        renderRating={renderRating}
                                        getDisplayPrice={getDisplayPrice}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                )}

                {/* Product Detail Dialog */}
                <ProductDetailDialog
                    open={dialogOpen}
                    onEdit={handleEditProduct}
                    onClose={() => setDialogOpen(false)}
                    product={selectedProduct}
                    renderStockStatus={renderStockStatus}
                    renderRating={renderRating}
                    getDisplayPrice={getDisplayPrice}
                    productImages={filteredProductImages}
                />

                <ProductFormDialog
                    open={addProdDialogue}
                    onClose={handleDialogClose}
                    onSubmit={handleFormSubmit}
                    initialData={selectedProduct}
                    categories={categories}
                    brands={brands}
                    isEditing={isEditting}
                />

                <ConfirmDialog
                    open={open_Delete}
                    title="Delete Product"
                    content="Are you sure you want to delete this product?"
                    onClose={() => setOpen_Delete(false)}
                    onConfirm={handleProductDeleteConfirmed}
                    loading={loading}
                />

                {/* Snackbar for notifications */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={hideNotification}
                >
                    <Alert severity={snackbar.severity} onClose={hideNotification}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </LoadingAndErrorStates>

    );
}

export default ProductsPage;