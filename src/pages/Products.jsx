/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { productService } from '../services/productService';
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
// import { PageHeader } from '../components/products/PageHeader';
import PageHeader from '../components/common/PageHeader';
import ProductFormDialog from '../components/products/ProductFormDialog';
import { getDisplayPrice } from '../hooks/useProductUtils';
import { renderStockStatus, renderRating } from '../utils/productDisplayUtils';


import { useProductFilters } from '../hooks/useProductFilters';
import { useNotification } from '../hooks/useNotification';



const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [isEditting, setisEditting] = useState(false);
    const [loadingProductId, setLoadingProductId] = useState(null);
    const [productImages, setProductImages] = useState([])
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
    const [open_Delete, setOpen_Delete] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedProducts, fetchedCategories, fetchedBrands, fetchedImages] = await Promise.all([
                    productService.getProducts(),
                    productService.getProductCategories(),
                    productService.getProductBrands(),
                    productService.getProductImages(),
                ]);


                setProducts(fetchedProducts);
                setCategories(fetchedCategories);
                setBrands(fetchedBrands);
                setProductImages(fetchedImages)

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

    const filteredProductImages = useMemo(() => {
        if (!selectedProduct) return [];
        return productImages.filter(image => image.product === selectedProduct.id);
    }, [selectedProduct, productImages]);

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
                const res = await productService.updateProduct(selectedProduct.id, data);
                setProducts(prev =>
                    prev.map(p => p.id === selectedProduct.id ? { ...p, ...res } : p)
                );
                showNotification('Product updated successfully!', 'success');
            } else {


                const res = await productService.createProduct(data);
                setProducts(prev => [...prev, res]);
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

    const handleToggleFeatured = async (product) => {
        setLoadingProductId(product.id)
        try {
            await productService.updateProduct(product.id, { featured: !product.featured });
            setProducts(prev => prev.map(p =>
                p.id === product.id
                    ? { ...p, featured: !p.featured }
                    : p
            ));
            toast.success('Product featured status updated');
        } catch (error) {
            toast.error('Failed to update featured status');
            console.error(error);
        } finally {
            setLoadingProductId(null)
        }

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
        setSelectedProduct(product)
        setOpen_Delete(true)
    };

    const handleProductDeleteConfirmed = async () => {
        setLoading(true);
        try {
            await productService.deleteProduct(selectedProduct.id);
            setProducts(products.filter(product => product.id !== selectedProduct.id))
            toast.success('Product deleted successfully');

        } catch (error) {
            toast.error('Failed to delete product. Please try again later.');
            console.error('Error deleting product:', error);
        } finally {
            setLoading(false);
            setSelectedProduct(null)
            setOpen_Delete(false);
        }
    };

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setisEditting(false);
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
    )
}

export default ProductsPage;