import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField
} from '@mui/material';
import { useState, useEffect } from 'react';

const BlogCategoryForm = ({ open, onClose, category, onSave }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (category) setName(category.category);
        else setName('');
    }, [category]);

    const handleSubmit = () => {
        if (!name.trim()) return;
        onSave({ category: name }, !!category);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{category ? 'Edit Category' : 'Create Category'}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    {category ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BlogCategoryForm;
