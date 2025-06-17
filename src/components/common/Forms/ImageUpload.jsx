import { useState } from 'react';
import {
    Box, Typography, Button, TextField, IconButton, Stack, Paper
} from '@mui/material';
import UploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { productService } from '../../../services/productService';

const ProductImageUpload = ({ productId, onSuccess }) => {
    const [images, setImages] = useState([]);
    const [altTexts, setAltTexts] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages(selectedFiles);
        setAltTexts(selectedFiles.map(() => ''));
    };

    const handleAltTextChange = (index, value) => {
        const updatedAltTexts = [...altTexts];
        updatedAltTexts[index] = value;
        setAltTexts(updatedAltTexts);
    };

    const removeImage = (index) => {
        const updatedImages = [...images];
        const updatedAltTexts = [...altTexts];
        updatedImages.splice(index, 1);
        updatedAltTexts.splice(index, 1);
        setImages(updatedImages);
        setAltTexts(updatedAltTexts);
    };

    const handleUpload = async () => {
        if (!images.length) return;

        const formData = new FormData();
        formData.append('product', productId);
        images.forEach((img) => formData.append('images', img));
        altTexts.forEach((alt) => formData.append('alt_texts', alt));

        try {
            setUploading(true);
            const res = await productService.bulkImageUpload(formData)
            setImages([]);
            setAltTexts([]);
            setError(null);
            if (onSuccess) onSuccess(res);
        } catch (err) {
            console.error(err);
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Upload Product Images
            </Typography>

            <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
                sx={{ mb: 2 }}
            >
                Select Images
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                />
            </Button>

            <Stack spacing={2}>
                {images.map((img, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={2}>
                        <Typography variant="body2">{img.name}</Typography>
                        <TextField
                            size="small"
                            label="Alt text"
                            value={altTexts[index]}
                            onChange={(e) => handleAltTextChange(index, e.target.value)}
                            sx={{ flexGrow: 1 }}
                        />
                        <IconButton onClick={() => removeImage(index)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
            </Stack>

            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}

            <Button
                variant="contained"
                onClick={handleUpload}
                disabled={uploading || images.length === 0}
                sx={{ mt: 3 }}
            >
                {uploading ? 'Uploading...' : 'Upload Images'}
            </Button>
        </Paper>
    );
};

export default ProductImageUpload;
