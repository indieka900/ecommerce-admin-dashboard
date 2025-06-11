
export const calculateSellingPrice = (price, discount) => {
    return price - (price * discount / 100);
};

export const getDisplayPrice = (product) => {
    if (product.has_variants && product.min_variant_price && product.max_variant_price) {
        const minPrice = calculateSellingPrice(product.min_variant_price, product.discount);
        const maxPrice = calculateSellingPrice(product.max_variant_price, product.discount);

        if (minPrice === maxPrice) {
            return `Ksh ${minPrice.toLocaleString()}`;
        }
        return `Ksh ${minPrice.toLocaleString()} - Ksh ${maxPrice.toLocaleString()}`;
    }
    return `Ksh ${calculateSellingPrice(product.price, product.discount).toLocaleString()}`;
};
