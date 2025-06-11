import { useState, useEffect } from 'react';

export const useProductFilters = (products) => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('All');

    useEffect(() => {
        let filtered = products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.brand_name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
            
            return matchesSearch && matchesCategory && matchesBrand;
        });
        
        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, selectedBrand, products]);

    return {
        filteredProducts,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand
    };
};