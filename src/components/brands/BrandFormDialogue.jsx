import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Box, FormControlLabel, Checkbox
} from '@mui/material';
import { useState, useEffect } from 'react';

const BrandFormDialog = ({ open, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        brand_title: '',
        logo: '',
        description: '',
        color: '#000000',
        featured: false
    });

    useEffect(() => {
        if (initialData) setFormData(initialData);
        else setFormData({
            brand_title: '',
            logo: '',
            description: '',
            color: '#000000',
            featured: false
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{initialData ? "Edit Brand" : "Add New Brand"}</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <TextField label="Brand Title" name="brand_title" value={formData.brand_title} onChange={handleChange} fullWidth />
                    <TextField label="Logo (Single Letter)" name="logo" value={formData.logo} onChange={handleChange} fullWidth />
                    <TextField label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={2} />
                    <TextField label="Color (Hex)" name="color" value={formData.color} onChange={handleChange} fullWidth />
                    <FormControlLabel
                        control={<Checkbox name="featured" checked={formData.featured} onChange={handleChange} />}
                        label="Featured"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">{initialData ? "Update" : "Create"}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BrandFormDialog;
