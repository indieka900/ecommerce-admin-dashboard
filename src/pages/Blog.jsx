import { useState, useEffect } from 'react';
import {
    Box,
    Container,
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
    List,
    Divider,
    Pagination,
} from '@mui/material';
import {
    Add as AddIcon,
    Comment as CommentIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Article as ArticleIcon,
    Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { blogService } from '../services/blogService';
import CommentSection from '../components/blog/CommentSection';
import BlogCard from '../components/blog/BlogCard';
import BlogFilters from '../components/blog/BlogFilters';
import BlogViewDialog from '../components/blog/BlogViewDialog';
import BlogForm from '../components/blog/BlogForm';
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

    useEffect(() => {
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

        fetchData();
    }, []);


    // Filter and pagination logic
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || blog.category === selectedCategory;
        const matchesAuthor = !selectedAuthor || blog.author === selectedAuthor;

        return matchesSearch && matchesCategory && matchesAuthor;
    });

    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

    // Get unique authors
    const authors = [...new Set(blogs.map(blog => blog.author))];

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
            category: blog.category,
            image: blog.image,
            content: blog.content,
            slug: blog.slug
        });
        setOpenDialog(true);
    };

    const handleDeleteBlog = (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            setBlogs(blogs.filter(blog => blog.id !== blogId));
            setComments(comments.filter(comment => comment.blogId !== blogId));
            toast.success('Blog deleted successfully');
        }
    };

    const handleSaveBlog = async () => {
        if (!blogForm.title || !blogForm.author || !blogForm.content) {
            showSnackbar('Please fill in all required fields', 'error');
            return;
        }

        try {
            if (editingBlog) {
                const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                // Optionally, update on the server here too:
                await blogService.updateBlog(editingBlog.id, {
                    ...blogForm,
                    slug,
                });

                setBlogs(blogs.map(blog =>
                    blog.id === editingBlog.id
                        ? { ...blog, ...blogForm, slug }
                        : blog
                ));
                toast.success('Blog updated successfully');
            } else {
                await setGlobalLoading('Create-Blog', true, 'Creating blog...');
                const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

                const formData = new FormData();
                formData.append('title', blogForm.title);
                formData.append('author', blogForm.author);
                formData.append('category_id', blogForm.category);
                formData.append('slug', slug);
                formData.append('content', blogForm.content);
                if (blogForm.image instanceof File) {
                    formData.append('image', blogForm.image);
                }

                await blogService.createBlog(formData);
                toast.success('Blog created successfully');
            }

            setOpenDialog(false);
        } catch (error) {
            console.error('Error saving blog:', error);
            toast.error(error?.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            await setGlobalLoading('Create-Blog', false);
        }
    };

    const handleViewBlog = (blog) => {
        setViewingBlog(blog);
    };

    // Comment Operations
    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                setGlobalLoading('Delete-Comment', true, 'Deleting comment...');
                await blogService.deleteComment(commentId);
                setComments(comments.filter(comment => comment.id !== commentId));
                toast.success('Comment deleted successfully');

            } catch (error) {
                toast.error('Failed to delete comment. Please try again later.');
                console.error('Error deleting comment:', error);
            } finally {
                setGlobalLoading('Delete-Comment', false);
            }

        }
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
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ArticleIcon /> Blogs
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateBlog}
                    sx={{ borderRadius: 2 }}
                >
                    Create New Blog
                </Button>
            </Box>

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
                            onDelete={handleDeleteBlog}
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
    );

    const CommentsTab = () => (
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
                            <CommentSection comments={blogComments} onDelete={handleDeleteComment} />
                        </Collapse>
                    </Paper>
                );
            })}
        </Box>
    );

    return (
        <Box sx={{
            minHeight: '100vh',
            my: 0,
        }} >
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <DashboardIcon /> Blog Admin Dashboard
                </Typography>

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