import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from '@mui/material';

const BlogForm = React.memo(({
    open,
    onClose,
    editingBlog,
    blogForm,
    setBlogForm,
    onSave,
    categories
}) => {
    const [localForm, setLocalForm] = useState(blogForm);

    // Sync local form with props when blogForm changes
    useEffect(() => {
        setLocalForm(blogForm);
    }, [blogForm]);

    // Debounced update to parent state
    const updateParentForm = useCallback(
        debounce((form) => {
            setBlogForm(form);
        }, 300),
        [setBlogForm]
    );

    const handleFieldChange = useCallback((field) => (e) => {
        const newForm = {
            ...localForm,
            [field]: e.target.value
        };
        setLocalForm(newForm);
        updateParentForm(newForm);
    }, [localForm, updateParentForm]);

    // Fixed category change handler
    const handleCategoryChange = useCallback((e) => {
        const newForm = {
            ...localForm,
            category_id: e.target.value
        };
        setLocalForm(newForm);
        updateParentForm(newForm);
    }, [localForm, updateParentForm]);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const newForm = {
                ...localForm,
                image: file
            };
            setLocalForm(newForm);
            setBlogForm(newForm); // Immediate update for file uploads
        }
    }, [localForm, setBlogForm]);

    const imagePreviewUrl = useMemo(() => {
        if (!localForm.image) return null;
        return typeof localForm.image === 'string'
            ? localForm.image
            : URL.createObjectURL(localForm.image);
    }, [localForm.image]);

    const categoryOptions = useMemo(() =>
        categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
                {category.category }
            </MenuItem>
        )), [categories]
    );

    // Clean up object URLs on unmount
    useEffect(() => {
        return () => {
            if (localForm.image && typeof localForm.image === 'object') {
                URL.revokeObjectURL(URL.createObjectURL(localForm.image));
            }
        };
    }, [localForm.image]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: { sx: { borderRadius: 2 } }
            }}
        >
            <DialogTitle>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Title *"
                            value={localForm.title}
                            onChange={handleFieldChange('title')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Author *"
                            value={localForm.author}
                            onChange={handleFieldChange('author')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={localForm.category_id || ''} // Use category_id and provide fallback
                                label="Category"
                                onChange={handleCategoryChange} // Use the fixed handler
                            >
                                
                                {categoryOptions}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                        >
                            {localForm.image ? 'Change Image' : 'Upload Image'}
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Button>
                        {imagePreviewUrl && (
                            <img
                                src={imagePreviewUrl}
                                alt="Preview"
                                style={{ marginTop: 10, maxHeight: 200, borderRadius: 8 }}
                            />
                        )}
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Slug"
                            value={localForm.slug}
                            onChange={handleFieldChange('slug')}
                            helperText="Leave empty to auto-generate from title"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Content *"
                            value={localForm.content}
                            onChange={handleFieldChange('content')}
                            multiline
                            rows={6}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={onSave}>
                    {editingBlog ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default BlogForm;