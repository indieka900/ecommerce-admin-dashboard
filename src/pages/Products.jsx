/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import {
    Box,
    Grid,
    Snackbar,
    Alert
} from '@mui/material';

import { ProductFilters } from '../components/products/ProductFilters';
import { ProductCard } from '../components/products/ProductCard';
import { ProductTable } from '../components/products/ProductTable';
import { ProductStatsCards } from '../components/products/ProductStatsCards';
import { ProductDetailDialog } from '../components/products/ProductDetailDialog';
import { PageHeader } from '../components/products/PageHeader';
import ProductFormDialog from '../components/products/ProductFormDialog';
import { getDisplayPrice } from '../hooks/useProductUtils';
import { renderStockStatus, renderRating } from '../utils/productDisplayUtils';


import { useProductFilters } from '../hooks/useProductFilters';
import { useNotification } from '../hooks/useNotification';



const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [viewMode, setViewMode] = useState('table');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [addProdDialogue, setaddProdDialogue] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedProducts, fetchedCategories, fetchedBrands] = await Promise.all([
                    productService.getProducts(),
                    productService.getProductCategories(),
                    productService.getProductBrands()
                ]);
                console.log("Fetching Products......");

                setProducts(fetchedProducts);
                setCategories(["All", ...fetchedCategories]);
                setBrands(["All", ...fetchedBrands]);
            } catch (err) {
                console.error(err);
                setError(err.message || "An error occurred");
                showNotification(err.message || "Failed to load product data", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const {
        filteredProducts,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand
    } = useProductFilters(products);
    const { snackbar, showNotification, hideNotification } = useNotification();

    // Event handlers
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleDialogClose = () => {
        setaddProdDialogue(false);
        setSelectedProduct(null);
    };

    const handleFormSubmit = async (data) => {
        console.log(data);
        try {
            if (selectedProduct) {
                await productService.updateProduct(selectedProduct.id, data);
                showNotification('Product updated successfully!', 'success');
            } else {
                
                
                await productService.createProduct(data);
                showNotification('Product added successfully!', 'success');
            }

            handleDialogClose();
            // fetchData();
        } catch (err) {
            console.error(err);
            showNotification(err.message || 'Failed to save product', 'error');
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleToggleFeatured = (productId) => {
        setProducts(prev => prev.map(product =>
            product.id === productId
                ? { ...product, featured: !product.featured }
                : product
        ));
        showNotification('Product featured status updated');
    };

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    };

    const handleDeleteProduct = (productId) => {
        setProducts(prev => prev.filter(product => product.id !== productId));
        showNotification('Product deleted successfully');
    };

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setaddProdDialogue(true);
    };

    return (loading ? (
        <Box>Loading products...</Box>
    ) : error ? (
        <Alert severity="error">{error}</Alert>
    ) :
        <Box>
            {/* Header */}
            <PageHeader
                title="Products"
                subtitle="Manage your product inventory"
                onAddClick={handleAddProduct}
                addButtonText="Add Product"
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
                onClose={() => setDialogOpen(false)}
                product={selectedProduct}
                renderStockStatus={renderStockStatus}
                renderRating={renderRating}
                getDisplayPrice={getDisplayPrice}
            />

            <ProductFormDialog
                open={addProdDialogue}
                onClose={handleDialogClose}
                onSubmit={handleFormSubmit}
                initialData={selectedProduct}
                categories={categories}
                brands={brands}
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
    )
}

export default ProductsPage;