import { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    IconButton,
    Chip,
    Tabs,
    Tab,
    Grid,
    Snackbar,
    Alert,
    Collapse,
    Divider,
    Pagination,
} from '@mui/material';
import {
    Add as AddIcon,
    Comment as CommentIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { blogService } from '../services/blogService';
import PageHeader from '../components/common/PageHeader';
import CommentSection from '../components/blog/CommentSection';
import BlogCard from '../components/blog/BlogCard';
import BlogFilters from '../components/blog/BlogFilters';
import BlogViewDialog from '../components/blog/BlogViewDialog';
import BlogForm from '../components/blog/BlogForm';
import ConfirmDialog from '../components/blog/DeleteDialog';
import toast from 'react-hot-toast';
import { useGlobalLoading } from '../context/LoadingContext';


const Blog = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [viewingBlog, setViewingBlog] = useState(null);
    const { setLoading: setGlobalLoading } = useGlobalLoading();
    const [expandedComments, setExpandedComments] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Filter and pagination states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedComment, setSelectedComment] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const [blogForm, setBlogForm] = useState({
        title: '',
        author: '',
        category: '',
        image: '',
        content: '',
        slug: ''
    });

    const [open_Delete_Dialog, setOpen_Delete_Dialog] = useState(false);
    const [open_Delete_Comment, setOpen_Delete_Comment] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);


    const fetchData = async () => {
        setGlobalLoading('Blogs-Comments', true, 'Loading blogs and comments...');
        try {
            const [fetchedBlogs, fetchedComments, fetchedCategories] = await Promise.all([
                blogService.getBlogs(),
                blogService.getComments(),
                blogService.getBlogCategories()
            ]);
            setBlogs(fetchedBlogs);
            setComments(fetchedComments);
            setCategories(fetchedCategories);

        } catch (error) {
            toast.error('Failed to fetch blogs or comments. Please try again later.');
        } finally {
            setGlobalLoading('Blogs-Comments', false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const title = blog.title?.toLowerCase() || '';
            const content = blog.content?.toLowerCase() || '';
            const author = blog.author?.toLowerCase() || '';
            const search = searchTerm.toLowerCase();

            const matchesSearch =
                title.includes(search) ||
                content.includes(search) ||
                author.includes(search);

            const matchesCategory = !selectedCategory || blog.category === selectedCategory;
            const matchesAuthor = !selectedAuthor || blog.author === selectedAuthor;

            return matchesSearch && matchesCategory && matchesAuthor;
        });
    }, [blogs, searchTerm, selectedCategory, selectedAuthor]);


    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBlogs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredBlogs.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredBlogs, currentPage, itemsPerPage]);


    const authors = useMemo(() => {
        return [...new Set(blogs.map(blog => blog.author))];
    }, [blogs]);


    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedAuthor('');
        setCurrentPage(1);
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Blog CRUD Operations
    const handleCreateBlog = () => {
        setEditingBlog(null);
        setBlogForm({
            title: '',
            author: '',
            category: '',
            image: '',
            content: '',
            // slug: ''
        });
        setOpenDialog(true);
    };

    const handleEditBlog = (blog) => {
        setEditingBlog(blog);
        setBlogForm({
            title: blog.title,
            author: blog.author,
            category: blog.category || '',
            category_id: blog.category?.id || blog.category_id || '',
            image: blog.image,
            content: blog.content,
            slug: blog.slug
        });
        setOpenDialog(true);
    };


    const handleDeleteConfirmed = async () => {
        setLoadingDelete(true);
        try {
            await blogService.deleteBlog(selectedBlogId);
            setBlogs(prev => prev.filter(blog => blog.id !== selectedBlogId));
            setComments(prev => prev.filter(comment => comment.blogId !== selectedBlogId));
            toast.success('Blog deleted successfully');
        } catch (err) {
            toast.error('Failed to delete blog. Please try again.');
        } finally {
            setLoadingDelete(false);
            setOpen_Delete_Dialog(false);
            setSelectedBlogId(null);
        }
    };


    const confirmDeleteBlog = (blogId) => {
        setSelectedBlogId(blogId);
        setOpen_Delete_Dialog(true);
    };

    const handleSaveBlog = async () => {
        // Validation - include category_id check
        if (!blogForm.title || !blogForm.author || !blogForm.content || !blogForm.category_id) {
            showSnackbar('Please fill in all required fields including category', 'error');
            return;
        }

        try {
            // Generate slug once
            const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            // Create FormData for file upload
            const formData = new FormData();
            formData.append('title', blogForm.title);
            formData.append('author', blogForm.author);
            formData.append('category_id', blogForm.category_id); // Fixed: use category_id
            formData.append('slug', slug);
            formData.append('content', blogForm.content);

            // Only append image if it's a File object
            if (blogForm.image instanceof File) {
                formData.append('image', blogForm.image);
            }

            if (editingBlog) {
                await setGlobalLoading('Update-Blog', true, 'Updating blog...');

                const response = await blogService.updateBlog(editingBlog.id, formData);
                console.log('Blog updated response:', response);

                setBlogs(prev =>
                    prev.map(b => b.id === editingBlog.id ? { ...b, ...response } : b)
                );


                toast.success('Blog updated successfully');
            } else {
                await setGlobalLoading('Create-Blog', true, 'Creating blog...');

                const response = await blogService.createBlog(formData);
                setBlogs(prev => [...prev, response]);

                toast.success('Blog created successfully');
            }

            // Close dialog on success
            setOpenDialog(false);

        } catch (error) {
            console.error('Error saving blog:', error);

            // Extract error message
            const errorMessage = error?.response?.data?.message
                || error?.response?.data?.error
                || 'Something went wrong. Please try again.';

            toast.error(errorMessage);

        } finally {
            await setGlobalLoading('Create-Blog', false);
            await setGlobalLoading('Update-Blog', false);
        }
    };
    const handleViewBlog = (blog) => {
        setViewingBlog(blog);
    };

    // Comment Operations
    const handleCommentDeleteConfirmed = async () => {
        setLoadingDelete(true);
        try {
            await blogService.deleteComment(selectedComment);
            setComments(comments.filter(comment => comment.id !== selectedComment));
            toast.success('Comment deleted successfully');

        } catch (error) {
            toast.error('Failed to delete comment. Please try again later.');
            console.error('Error deleting comment:', error);
        } finally {
            setLoadingDelete(false);
            setSelectedComment(null)
            setOpen_Delete_Comment(false);
        }
    };

    const confirmDeleteComment = (commentId) => {
        setSelectedComment(commentId);
        setOpen_Delete_Comment(true);
    };

    const toggleComments = (blogId) => {
        setExpandedComments(prev => ({
            ...prev,
            [blogId]: !prev[blogId]
        }));
    };

    const getBlogComments = (blogTitle) => {
        return comments.filter(comment => comment.blog === blogTitle);
    };

    const BlogsTab = () => (
        <>
            <Box>

                <BlogFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    selectedAuthor={selectedAuthor}
                    onAuthorChange={setSelectedAuthor}
                    categories={categories}
                    authors={authors}
                    onClearFilters={handleClearFilters}
                />

                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Showing {paginatedBlogs.length} of {filteredBlogs.length} blogs
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {paginatedBlogs.map((blog) => (
                        <Grid
                            key={blog.id}
                            sx={{
                                pl: 0,
                            }}
                            size={{
                                xs: 12,
                                md: 6,
                                lg: 4
                            }}>
                            <BlogCard
                                blog={blog}
                                onView={handleViewBlog}
                                onEdit={handleEditBlog}
                                onDelete={confirmDeleteBlog}
                                commentsCount={getBlogComments(blog.title).length}
                            />
                        </Grid>
                    ))}
                </Grid>

                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                        />
                    </Box>
                )}
            </Box>
            <ConfirmDialog
                open={open_Delete_Dialog}
                title="Delete Blog"
                content="Are you sure you want to delete this blog? This action cannot be undone."
                onClose={() => setOpen_Delete_Dialog(false)}
                onConfirm={handleDeleteConfirmed}
                loading={loadingDelete}
            />
        </>
    );

    const CommentsTab = () => (
        <>
            <Box>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <CommentIcon /> Comments Management
                </Typography>

                {blogs.map((blog) => {
                    const blogComments = getBlogComments(blog.title);
                    const isExpanded = expandedComments[blog.id];

                    return (
                        <Paper key={blog.id} sx={{ mb: 2 }}>
                            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography variant="h6">{blog.title}</Typography>
                                    <Chip
                                        label={`${blogComments.length} comments`}
                                        size="small"
                                        color={blogComments.length > 0 ? "primary" : "default"}
                                    />
                                </Box>
                                <IconButton onClick={() => toggleComments(blog.id)}>
                                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                            </Box>

                            <Collapse in={isExpanded}>
                                <Divider />
                                <CommentSection comments={blogComments} onDelete={confirmDeleteComment} />
                            </Collapse>
                        </Paper>
                    );
                })}
            </Box>
            <ConfirmDialog
                open={open_Delete_Comment}
                title="Delete Comment"
                content="Are you sure you want to delete this comment?"
                onClose={() => setOpen_Delete_Comment(false)}
                onConfirm={handleCommentDeleteConfirmed}
                loading={loadingDelete}
            />
        </>

    );

    return (
        <Box container sx={{
            minHeight: '100vh',
            m: 0,
            padding: 0,
            margin: 0
        }} >
            <PageHeader
                title="Blogs Management"
                subtitle="Manage Your Blogs and Comments"
                actions={[
                    {
                        label: 'Add Parent Category',
                        icon: <AddIcon />,
                        onClick: () => handleCreateBlog(),
                    },
                ]}
            />

            <Paper sx={{ p: 3, mb: 3 }}>

                <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                    <Tab label="Blogs" />
                    <Tab label="Comments" />
                </Tabs>

                {activeTab === 0 && <BlogsTab />}
                {activeTab === 1 && <CommentsTab />}
            </Paper>

            <BlogForm
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                editingBlog={editingBlog}
                blogForm={blogForm}
                setBlogForm={setBlogForm}
                onSave={handleSaveBlog}
                categories={categories}
            />

            <BlogViewDialog
                blog={viewingBlog}
                open={!!viewingBlog}
                onClose={() => setViewingBlog(null)}
                onEdit={handleEditBlog}
            />



            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Blog;