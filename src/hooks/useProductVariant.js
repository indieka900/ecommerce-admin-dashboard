import { useState, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

const useProductVariants = (productService) => {
    // State management
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [loadingVariantId, setLoadingVariantId] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);

    // Load variants for a specific product
    const loadVariants = useCallback(async (productId) => {
        if (!productId) {
            setVariants([]);
            setSelectedProductId(null);
            return;
        }

        setLoading(true);
        try {
            const data = await productService.getProductVariants(productId);
            setVariants(data);
            setSelectedProductId(productId);
        } catch (error) {
            console.error('Error loading variants:', error);
            toast.error('Failed to load product variants');
            setVariants([]);
            setSelectedProductId(null);
        } finally {
            setLoading(false);
        }
    }, [productService]);

    // Add new variant
    const addVariant = useCallback(async (variantData) => {
        setSubmitting(true);
        try {
            const newVariant = await productService.addProductVariant(variantData);

            // Update local variants state
            setVariants(prev => [...prev, newVariant]);

            toast.success('Variant added successfully!');
            return newVariant;
        } catch (error) {
            console.error('Error adding variant:', error);
            toast.error(error.message || 'Failed to add variant');
            throw error;
        } finally {
            setSubmitting(false);
        }
    }, [productService]);

    // Update existing variant
    const updateVariant = useCallback(async (variantId, variantData) => {
        setSubmitting(true);
        try {
            const updatedVariant = await productService.updateProductVariant(variantId, variantData);

            // Update local variants state
            setVariants(prev => prev.map(v => v.id === variantId ? updatedVariant : v));

            toast.success('Variant updated successfully!');
            return updatedVariant;
        } catch (error) {
            console.error('Error updating variant:', error);
            toast.error(error.message || 'Failed to update variant');
            throw error;
        } finally {
            setSubmitting(false);
        }
    }, [productService]);

    // Delete variant
    const deleteVariant = useCallback(async (variantId, productId) => {
        setLoadingVariantId(variantId);
        setSubmitting(true);
        try {
            await productService.deleteProductVariant(variantId);

            // Update local variants state
            setVariants(prev => prev.filter(v => v.id !== variantId));

            toast.success('Variant deleted successfully!');
        } catch (error) {
            console.error('Error deleting variant:', error);
            toast.error('Failed to delete variant');
            throw error;
        } finally {
            setSubmitting(false);
            setLoadingVariantId(null);
        }
    }, [productService]);

    // Get variant by ID
    const getVariantById = useCallback((variantId) => {
        return variants.find(variant => variant.id === variantId);
    }, [variants]);

    // Get variants summary for a product
    const getVariantsSummary = useCallback((productId) => {
        const productVariants = variants.filter(v => v.product === productId);
        return {
            count: productVariants.length,
            totalStock: productVariants.reduce((sum, v) => sum + (v.stock || 0), 0),
            lowStockCount: productVariants.filter(v => (v.stock || 0) < 10 && (v.stock || 0) > 0).length,
            outOfStockCount: productVariants.filter(v => (v.stock || 0) === 0).length,
            priceRange: productVariants.length > 0 ? {
                min: Math.min(...productVariants.map(v => v.variant_price || 0)),
                max: Math.max(...productVariants.map(v => v.variant_price || 0))
            } : null
        };
    }, [variants]);

    // Memoized computed values for current product
    const currentVariants = useMemo(() => {
        return selectedProductId ? variants.filter(v => v.product === selectedProductId) : [];
    }, [variants, selectedProductId]);

    const hasVariants = useMemo(() => {
        return currentVariants.length > 0;
    }, [currentVariants]);

    const totalStock = useMemo(() => {
        return currentVariants.reduce((sum, variant) => sum + (variant.stock || 0), 0);
    }, [currentVariants]);

    const lowStockVariants = useMemo(() => {
        return currentVariants.filter(variant => (variant.stock || 0) > 0 && (variant.stock || 0) < 10);
    }, [currentVariants]);

    const outOfStockVariants = useMemo(() => {
        return currentVariants.filter(variant => (variant.stock || 0) === 0);
    }, [currentVariants]);

    // Clear variants when switching products
    const clearVariants = useCallback(() => {
        setVariants([]);
        setSelectedProductId(null);
    }, []);

    // Refresh variants for current product
    const refreshVariants = useCallback(() => {
        if (selectedProductId) {
            loadVariants(selectedProductId);
        }
    }, [selectedProductId, loadVariants]);

    return {
        // State
        variants: currentVariants,
        allVariants: variants, // All loaded variants
        loading,
        submitting,
        loadingVariantId,
        selectedProductId,

        // Computed values
        hasVariants,
        totalStock,
        lowStockVariants,
        outOfStockVariants,

        // Operations
        loadVariants,
        addVariant,
        updateVariant,
        deleteVariant,

        // Utilities
        getVariantById,
        getVariantsSummary,
        clearVariants,
        refreshVariants,
    };
};

export default useProductVariants;