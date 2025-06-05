import { useEffect, useState, useMemo } from 'react';
import {
    Box, Paper, Typography, Button, Snackbar, Alert,
    Table, TableHead, TableBody, TableRow,
    TableCell, TableContainer, IconButton
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Category as CategoryIcon, Add as AddIcon } from '@mui/icons-material';
import toast from 'react-hot-toast';

import { blogService } from '../services/blogService';
import ConfirmDialog from '../components/blog/DeleteDialog';
import BlogCategoryForm from '../components/blog/BlogCategoryForm'; 

const BlogCategories = () => {
    const [categories, setCategories] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const fetchCategories = async () => {
        try {
            const res = await blogService.getBlogCategories();
            setCategories(res);
        } catch (err) {
            toast.error('Failed to fetch categories');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreateCategory = () => {
        setEditingCategory(null);
        setOpenForm(true);
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setOpenForm(true);
    };

    const handleDeleteConfirmed = async () => {
        setLoadingDelete(true);
        try {
            await blogService.deleteCategory(selectedCategoryId);
            setCategories(prev => prev.filter(cat => cat.id !== selectedCategoryId));
            toast.success('Category deleted');
        } catch {
            toast.error('Failed to delete category');
        } finally {
            setLoadingDelete(false);
            setDeleteDialogOpen(false);
            setSelectedCategoryId(null);
        }
    };

    const handleSaveCategory = async (data, isEdit) => {
        try {
            if (isEdit) {
                const updated = await blogService.updateCategory(editingCategory.id, data);
                setCategories(prev => prev.map(cat => cat.id === updated.id ? updated : cat));
                toast.success('Category updated');
            } else {
                const created = await blogService.createCategory(data);
                setCategories(prev => [...prev, created]);
                toast.success('Category created');
            }
            setOpenForm(false);
        } catch (err) {
            toast.error('Failed to save category');
        }
    };

    const handleDeleteClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setDeleteDialogOpen(true);
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <CategoryIcon /> Blog Category Management
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateCategory}
                    sx={{ borderRadius: 2, mb: 2 }}
                >
                    Create New Category
                </Button>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Category Name</TableCell>
                                <TableCell>Number of Blogs</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category, index) => (
                                <TableRow key={category.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{category.category}</TableCell>
                                    <TableCell>{category.category}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleEditCategory(category)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteClick(category.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>

            <BlogCategoryForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                category={editingCategory}
                onSave={handleSaveCategory}
            />

            <ConfirmDialog
                open={deleteDialogOpen}
                title="Delete Category"
                content="Are you sure you want to delete this category?"
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteConfirmed}
                loading={loadingDelete}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default BlogCategories;
