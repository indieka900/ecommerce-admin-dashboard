import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Grid,
    Chip
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import ProductImageUpload from "../common/Forms/ImageUpload";
import toast from 'react-hot-toast';

export const ProductDetailDialog = ({
    open,
    onEdit,
    onClose,
    product,
    renderStockStatus,
    renderRating,
    getDisplayPrice
}) => {
    if (!product) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">{product.title}</Typography>
                    {product.featured && <Chip label="Featured" color="primary" />}
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <img
                            src={product.prod_img}
                            alt={product.title}
                            style={{ width: '100%', borderRadius: 8 }}
                        />

                        {/* ✅ Image Upload for Admins */}
                        <Box mt={2}>
                            <ProductImageUpload
                                productId={product.id}
                                onSuccess={(res) => {
                                    // Optional: refresh product data
                                    toast.success(res.message)
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6" gutterBottom>Product Details</Typography>

                        <Box mb={2}>
                            <Typography variant="body2" color="text.secondary">Brand</Typography>
                            <Typography variant="body1">{product.brand_name}</Typography>
                        </Box>

                        <Box mb={2}>
                            <Typography variant="body2" color="text.secondary">Category</Typography>
                            <Typography variant="body1">{product.category_name}</Typography>
                        </Box>

                        <Box mb={2}>
                            <Typography variant="body2" color="text.secondary">Price</Typography>
                            <Typography variant="h6" color="primary">
                                {getDisplayPrice(product)}
                            </Typography>
                        </Box>

                        <Box mb={2}>
                            <Typography variant="body2" color="text.secondary">Stock Status</Typography>
                            {renderStockStatus(product.quantity, product.variants)}
                        </Box>

                        <Box mb={2}>
                            <Typography variant="body2" color="text.secondary">Rating</Typography>
                            {renderRating(product.rating)}
                        </Box>

                        <Box mb={2}>
                            <Typography variant="body2" color="text.secondary">Description</Typography>
                            <Typography variant="body1">{product.description}</Typography>
                        </Box>

                        {product.has_variants && product.variants.length > 0 && (
                            <Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Product Variants
                                </Typography>
                                {product.variants.map(variant => (
                                    <Box key={variant.id} display="flex" justifyContent="space-between" alignItems="center" py={1}>
                                        <Typography variant="body2">
                                            {variant.size} - {variant.color}
                                        </Typography>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Typography variant="body2" fontWeight="bold">
                                                Ksh {variant.variant_price.toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Stock: {variant.stock}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button variant="contained" startIcon={<Edit />} onClick={() => onEdit(product)}>
                    Edit Product
                </Button>
            </DialogActions>
        </Dialog>
    );
};
