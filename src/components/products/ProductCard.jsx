import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
    IconButton,
    Chip
} from '@mui/material';
import {
    Visibility,
    Edit,
    Star
} from '@mui/icons-material';

export const ProductCard = ({
    product,
    onView,
    onEdit,
    onToggleFeatured,
    renderStockStatus,
    renderRating,
    getDisplayPrice
}) => (
    <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
            boxShadow: 6,
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease-in-out'
        }
    }}>
        <Box position="relative">
            <CardMedia
                component="img"
                height="200"
                image={product.prod_img}
                alt={product.title}
            />
            {product.featured && (
                <Chip
                    label="Featured"
                    color="primary"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        fontWeight: 'bold'
                    }}
                />
            )}
            {product.discount > 0 && (
                <Chip
                    label={`-${product.discount}%`}
                    color="error"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        fontWeight: 'bold'
                    }}
                />
            )}
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h6" component="h3" gutterBottom noWrap>
                {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                {product.brand} • {product.category}
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" color="primary" fontWeight="bold">
                    {getDisplayPrice(product)}
                </Typography>
                {renderRating(product.rating)}
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                {renderStockStatus(product.quantity, product.variants)}
                {product.has_variants && (
                    <Chip
                        label={`${product.variants.length} variants`}
                        size="small"
                        variant="outlined"
                    />
                )}
            </Box>
            <Box display="flex" gap={1}>
                <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => onView(product)}
                >
                    View
                </Button>
                <Button
                    size="small"
                    startIcon={<Edit />}
                    color="primary"
                    onClick={() => onEdit(product)}
                >
                    Edit
                </Button>
                <IconButton
                    size="small"
                    onClick={() => onToggleFeatured(product.id)}
                    color={product.featured ? "warning" : "default"}
                >
                    <Star />
                </IconButton>
            </Box>
        </CardContent>
    </Card>
);