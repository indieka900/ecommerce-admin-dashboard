import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import toast from 'react-hot-toast';

const useCategory = () => {
    // State management
    const [parentCategories, setParentCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState('category');
    const [isSaving, setIsSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState({
        type: null,
        id: null,
        name: '',
    });
    const [loading, setLoading] = useState(false);
    const [currentItem, setCurrentItem] = useState({
        id: null,
        category_name: '',
        parent_category_name: '',
        parent_category: '',
        parent_name: ''
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // Fetch initial data
    const fetchData = useCallback(async () => {
        try {
            setLoadingData(true);
            setError(null);

            const [fetchedCategories, fetchedParentsC] = await Promise.all([
                productService.getProductCategories(),
                productService.getParentCategories()
            ]);

            setCategories(fetchedCategories);
            setParentCategories(fetchedParentsC);
        } catch (err) {
            console.error('Fetch data error:', err);
            setError(err.message || "An error occurred while fetching data");
        } finally {
            setLoadingData(false);
        }
    }, []);

    // Initialize data on mount
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Filtered data based on search
    const filteredParentCategories = parentCategories.filter(parent =>
        parent.parent_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCategories = categories.filter(category =>
        category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.parent_category_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get categories for a specific parent
    const getCategoriesForParent = useCallback((parentName) => {
        return filteredCategories.filter(cat => cat.parent_category_name === parentName);
    }, [filteredCategories]);

    // Dialog management
    const handleOpenDialog = useCallback((type, item = null) => {
        setDialogType(type);
        if (item) {
            setCurrentItem(item);
            setEditMode(true);
        } else {
            setCurrentItem({
                id: null,
                category_name: '',
                parent_category: '',
                parent_name: '',
                parent_category_name: ''
            });
            setEditMode(false);
        }
        setDialogOpen(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setDialogOpen(false);
        setCurrentItem({
            id: null,
            category_name: '',
            parent_category: '',
            parent_name: '',
            parent_category_name: ''
        });
        setEditMode(false);
    }, []);

    // Input change handler
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setCurrentItem(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    // Snackbar management
    // const showSnackbar = useCallback((message, severity = 'success') => {
    //     setSnackbar({ open: true, message, severity });
    // }, []);

    const hideSnackbar = useCallback(() => {
        setSnackbar(prev => ({ ...prev, open: false }));
    }, []);

    // Save operations (create/update)
    const handleSave = useCallback(async () => {
        try {
            setIsSaving(true);

            if (dialogType === 'parent') {
                if (!currentItem.parent_name) {
                    toast.error('Parent category name is required');
                    return;
                }

                if (editMode) {
                    // Update parent category
                    const updatedParent = await productService.updateParentCategory(currentItem.id, {
                        parent_name: currentItem.parent_name
                    });

                    setParentCategories(prev => prev.map(parent =>
                        parent.id === currentItem.id ? updatedParent : parent
                    ));
                    toast.success('Parent category updated successfully');
                } else {
                    // Create new parent category
                    const newParent = await productService.addParentCategory({
                        parent_name: currentItem.parent_name
                    });

                    setParentCategories(prev => [...prev, newParent]);
                    toast.success('Parent category added successfully');
                }
            } else {
                // Child category operations
                if (!currentItem.category_name || !currentItem.parent_category) {
                    toast.error('Category name and parent category are required');
                    return;
                }

                if (editMode) {
                    // Update child category
                    const updatedCategory = await productService.updateCategory(currentItem.id, {
                        category_name: currentItem.category_name,
                        parent_category: currentItem.parent_category
                    });

                    setCategories(prev => prev.map(cat =>
                        cat.id === currentItem.id ? updatedCategory : cat
                    ));
                    toast.success('Category updated successfully');
                } else {
                    // Create new child category
                    const newCategory = await productService.addCategory({
                        category_name: currentItem.category_name,
                        parent_category: currentItem.parent_category
                    });

                    setCategories(prev => [...prev, newCategory]);
                    toast.success('Category added successfully');
                }
            }

            handleCloseDialog();
        } catch (error) {
            console.error('Save operation error:', error);

            if (error.response) {
                const message = error.response.data?.message || 'Operation failed';
                toast.error(message);
            } else if (error.request) {
                toast.error('Network error. Please check your connection.');
            } else {
                toast.error('An unexpected error occurred');
            }
        } finally {
            setIsSaving(false);
        }
    }, [dialogType, currentItem, editMode, handleCloseDialog]);

    // Delete operations
    const handleDelete = useCallback((type, id, name) => {
        setDeleteTarget({ type, id, name });
        setDeleteDialogOpen(true);
    }, []);

    const confirmDelete = useCallback(async () => {
        setLoading(true);
        try {
            if (deleteTarget.type === 'parent') {
                // Check if parent has categories
                const hasCategories = categories.some(cat =>
                    cat.parent_category_name === deleteTarget.name
                );

                if (hasCategories) {
                    toast.error('Cannot delete parent category with existing categories');
                    return;
                }

                await productService.deleteParentCategory(deleteTarget.id);
                setParentCategories(prev => prev.filter(parent => parent.id !== deleteTarget.id));
                toast.success('Parent category deleted successfully');
            } else {
                await productService.deleteCategory(deleteTarget.id);
                setCategories(prev => prev.filter(cat => cat.id !== deleteTarget.id));
                toast.success('Category deleted successfully');
            }
        } catch (error) {
            console.error('Delete operation error:', error);
            toast.error(error.response?.data?.message || 'Delete operation failed');
        } finally {
            setLoading(false);
            setDeleteDialogOpen(false);
            setDeleteTarget({ type: null, id: null, name: '' });
        }
    }, [deleteTarget, categories]);

    const cancelDelete = useCallback(() => {
        setDeleteDialogOpen(false);
        setDeleteTarget({ type: null, id: null, name: '' });
    }, []);

    // Search functionality
    const handleSearchChange = useCallback((value) => {
        setSearchTerm(value);
    }, []);

    const clearSearch = useCallback(() => {
        setSearchTerm('');
    }, []);

    // Refresh data
    const refreshData = useCallback(() => {
        fetchData();
    }, [fetchData]);

    // Return all state and handlers
    return {
        // State
        parentCategories,
        categories,
        filteredParentCategories,
        filteredCategories,
        loadingData,
        searchTerm,
        dialogOpen,
        dialogType,
        isSaving,
        editMode,
        error,
        deleteDialogOpen,
        deleteTarget,
        loading,
        currentItem,
        snackbar,

        // Handlers
        handleOpenDialog,
        handleCloseDialog,
        handleInputChange,
        handleSave,
        handleDelete,
        confirmDelete,
        cancelDelete,
        handleSearchChange,
        clearSearch,
        hideSnackbar,
        getCategoriesForParent,
        refreshData,
        fetchData,

        // Utilities
        setCurrentItem,
        setSearchTerm,
        setSnackbar,
        setDeleteDialogOpen
    };
};

export default useCategory;