import { useState, useEffect, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';

const useProducts = (productService) => {
    // State management
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingProductId, setLoadingProductId] = useState(null);



    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [fetchedProducts, fetchedCategories, fetchedBrands, fetchedImages] = await Promise.all([
                productService.getProducts(),
                productService.getProductCategories(),
                productService.getProductBrands(),
                productService.getProductImages(),
            ]);

            setProducts(fetchedProducts);
            setCategories(fetchedCategories);
            setBrands(fetchedBrands);
            setProductImages(fetchedImages);
            setError(null);
        } catch (err) {
            console.error('Error fetching product data:', err);
            setError(err.message || 'Failed to load product data');
            toast.error(err.message || 'Failed to load product data');
        } finally {
            setLoading(false);
        }
    }, [productService]);

    // Fetch initial data
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const filteredProductImages = useMemo(() => {
        if (!selectedProduct) return [];
        return productImages.filter(image => image.product === selectedProduct.id);
    }, [selectedProduct, productImages]);

    // Product operations
    const createProduct = async (productData) => {
        try {
            const newProduct = await productService.createProduct(productData);
            setProducts(prev => [...prev, newProduct]);
            toast.success('Product added successfully!');
            return newProduct;
        } catch (err) {
            console.error('Error creating product:', err);
            toast.error(err.message || 'Failed to create product');
            throw err;
        }
    };

    const updateProduct = async (productId, productData) => {
        try {
            const updatedProduct = await productService.updateProduct(productId, productData);
            setProducts(prev =>
                prev.map(p => p.id === productId ? { ...p, ...updatedProduct } : p)
            );
            toast.success('Product updated successfully!');
            return updatedProduct;
        } catch (err) {
            console.error('Error updating product:', err);
            toast.error(err.message || 'Failed to update product');
            throw err;
        }
    };

    const deleteProduct = async (productId) => {
        try {
            setLoading(true);
            await productService.deleteProduct(productId);
            setProducts(prev => prev.filter(product => product.id !== productId));
            toast.success('Product deleted successfully');
        } catch (err) {
            console.error('Error deleting product:', err);
            toast.error('Failed to delete product. Please try again later.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const toggleFeatured = async (product) => {
        setLoadingProductId(product.id);
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
            console.error('Error toggling featured status:', error);
        } finally {
            setLoadingProductId(null);
        }
    };

    // Utility functions
    const getProductById = (id) => {
        return products.find(product => product.id === id);
    };

    const refreshProducts = async () => {
        fetchData();
    };

    return {
        // State
        products,
        categories,
        brands,
        productImages,
        selectedProduct,
        setSelectedProduct,
        loading,
        error,
        loadingProductId,
        filteredProductImages,

        // Operations
        createProduct,
        updateProduct,
        deleteProduct,
        toggleFeatured,

        // Utilities
        getProductById,
        refreshProducts,
    };
};

export default useProducts;