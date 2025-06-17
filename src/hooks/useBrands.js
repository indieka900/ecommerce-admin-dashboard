import { useEffect, useState, useCallback } from "react";
import { productService } from "../services/productService";

export const useBrands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBrands = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedBrands = await productService.getProductBrands();
            setBrands(fetchedBrands);
        } catch (err) {
            console.error('Error fetching brands:', err);
            setError(err.message || "Failed to load brands");
            // Fallback to initial data if API fails
            setBrands([
                { id: 1, brand_title: "Zara", product_count: 2 },
                { id: 2, brand_title: "Nike", product_count: 2 }
            ]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBrands();
    }, [fetchBrands]);

    return { brands, setBrands, loading, error, refetch: fetchBrands };
};
