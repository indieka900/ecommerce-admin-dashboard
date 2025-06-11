import { Chip, Box } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

export const renderStockStatus = (quantity, variants) => {
    let totalStock = quantity;
    if (variants && variants.length > 0) {
        totalStock = variants.reduce((sum, variant) => sum + variant.stock, 0);
    }

    if (totalStock === 0) {
        return <Chip label="Out of Stock" color="error" size="small" />;
    } else if (totalStock < 10) {
        return <Chip label="Low Stock" color="warning" size="small" />;
    } else {
        return <Chip label="In Stock" color="success" size="small" />;
    }
};

export const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            i <= rating ?
                <Star key={i} sx={{ fontSize: 16, color: '#ffc107' }} /> :
                <StarBorder key={i} sx={{ fontSize: 16, color: '#e0e0e0' }} />
        );
    }
    return <Box display="flex" alignItems="center">{stars}</Box>;
};
