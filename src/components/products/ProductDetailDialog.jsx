import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Grid,
    Chip,
    ImageList,
    ImageListItem,
    IconButton,
    Tooltip, CircularProgress
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import ProductImageUpload from "../common/Forms/ImageUpload";
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import ConfirmDialog from '../blog/DeleteDialog';


export const ProductDetailDialog = ({
    open,
    onEdit,
    onClose,
    product,
    renderStockStatus,
    renderRating,
    getDisplayPrice,
    productImages = [],
}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [deletingImageId, setDeletingImageId] = useState(null);
    const [open_Delete, setOpen_Delete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([])

    useEffect(() => {
        setImages(productImages);
        // setSelectedImage(productImages[0]?.image || null);
    }, [productImages]);

    if (!product) return null;

    // Handle image deletion
    const handleImageDelete = async (id) => {

        setLoading(true);

        try {
            await productService.deleteProductImage(id)
            toast.success('Image deleted successfully');
            const remainingImages = images.filter(img => img.id !== id);
            setImages(remainingImages);
            if (selectedImage.id === id) {
                setSelectedImage(remainingImages.length > 0 ? remainingImages[0].image : null);
            }
        } catch (error) {
            toast.error('Failed to delete image');
            console.error('Error deleting image:', error);
        } finally {
            setDeletingImageId(null);
            setLoading(false);
        }
    };

    const mainImage = selectedImage || product.prod_img;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">{product.title}</Typography>
                    {product.featured && <Chip label="Featured" color="primary" />}
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        {/* Main Image Display */}
                        <Box mb={2}>
                            <img
                                src={mainImage}
                                alt={product.title}
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'contain',
                                    borderRadius: 8,
                                    // border: '1px solid #e0e0e0'
                                }}
                            />
                        </Box>

                        {/* Product Images Gallery */}
                        {images.length > 0 && (
                            <Box mb={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Product Images ({images.length})
                                </Typography>
                                <ImageList cols={4} rowHeight={80} gap={8}>
                                    {images.map((imageObj, index) => (
                                        <ImageListItem
                                            key={imageObj.id || index}
                                            sx={{
                                                cursor: 'pointer',
                                                border: selectedImage === imageObj.image ? '2px solid #04f599' : '1px solid #dbf2f7',
                                                borderRadius: 1,
                                                overflow: 'hidden',
                                                position: 'relative',
                                                '&:hover': {
                                                    opacity: 0.8
                                                },
                                                '&:hover .delete-button': {
                                                    opacity: 1
                                                }
                                            }}
                                        >
                                            <img
                                                src={imageObj.image}
                                                alt={imageObj.alt_text || `${product.title} image ${index + 1}`}
                                                onClick={() => setSelectedImage(imageObj.image)}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                    // backgroundColor: '#f9f9f9'
                                                }}
                                            />

                                            {/* Delete Button Overlay */}
                                            {deletingImageId === (imageObj.id || index) ? (
                                                <CircularProgress
                                                    size={22}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 4,
                                                        right: 4,
                                                        zIndex: 10,
                                                        color: 'error.main',
                                                    }}
                                                />
                                            ) : (
                                                <Tooltip title="Delete Image" style={{ background: 'warning.main' }}>
                                                    <IconButton
                                                        className="delete-button"
                                                        size="small"
                                                        onClick={() => {

                                                            setDeletingImageId(imageObj.id);
                                                            setOpen_Delete(true);
                                                            // e.stopPropagation();
                                                            // handleImageDelete(imageObj);
                                                        }}
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 2,
                                                            right: 2,
                                                            opacity: 0,
                                                            transition: 'opacity 0.2s',
                                                            '&:hover': {
                                                                color: 'error.main',
                                                            },
                                                        }}
                                                    >
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            )}

                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Box>
                        )}

                        {/* Image Upload for Admins */}
                        <Box mt={2}>
                            <ProductImageUpload
                                productId={product.id}
                                onSuccess={(res) => {
                                    setImages(prev => [...prev, ...res.images])
                                    toast.success(res.message);
                                    // You might want to refresh the productImages here
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
                    <ConfirmDialog
                        open={open_Delete}
                        title="Delete image"
                        content="Are you sure you want to delete this image?"
                        onClose={() => {
                            setDeletingImageId(null);
                            setOpen_Delete(false);
                        }}
                        onConfirm={() => {
                            handleImageDelete(deletingImageId);
                            setOpen_Delete(false);
                        }}
                        loading={loading}
                    />
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