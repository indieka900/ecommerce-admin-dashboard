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
import CommentItem from '../components/blog/CommentSection';
import BlogCard from '../components/blog/BlogCard';
import BlogFilters from '../components/blog/BlogFilters';
import BlogViewDialog from '../components/blog/BlogViewDialog';
import BlogForm from '../components/blog/BlogForm';


const Blog = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [viewingBlog, setViewingBlog] = useState(null);
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

    const categories = ['Technology', 'Business', 'Corporate', 'Lifestyle', 'Health', 'Education', 'Travel'];

    // Sample initial data
    useEffect(() => {
        

        setBlogs(sampleBlogs);
        setComments(sampleComments);
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
            slug: ''
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
            showSnackbar('Blog deleted successfully');
        }
    };

    const handleSaveBlog = () => {
        if (!blogForm.title || !blogForm.author || !blogForm.content) {
            showSnackbar('Please fill in all required fields', 'error');
            return;
        }

        const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        if (editingBlog) {
            setBlogs(blogs.map(blog =>
                blog.id === editingBlog.id
                    ? { ...blog, ...blogForm, slug }
                    : blog
            ));
            showSnackbar('Blog updated successfully');
        } else {
            const newBlog = {
                id: Math.max(...blogs.map(b => b.id), 0) + 1,
                ...blogForm,
                slug,
                date_posted: new Date().toISOString()
            };
            setBlogs([...blogs, newBlog]);
            showSnackbar('Blog created successfully');
        }

        setOpenDialog(false);
    };

    const handleViewBlog = (blog) => {
        setViewingBlog(blog);
    };

    // Comment Operations
    const handleDeleteComment = (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            setComments(comments.filter(comment => comment.id !== commentId));
            showSnackbar('Comment deleted successfully');
        }
    };

    const toggleComments = (blogId) => {
        setExpandedComments(prev => ({
            ...prev,
            [blogId]: !prev[blogId]
        }));
    };

    const getBlogComments = (blogId) => {
        return comments.filter(comment => comment.blogId === blogId);
    };

    const BlogsTab = () => (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ArticleIcon /> Blog Management
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

            <Grid container spacing={3}>
                {paginatedBlogs.map((blog) => (
                    <Grid
                        key={blog.id}
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
                            commentsCount={getBlogComments(blog.id).length}
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
                const blogComments = getBlogComments(blog.id);
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
                            {blogComments.length > 0 ? (
                                <List>
                                    {blogComments.map((comment) => (
                                        <CommentItem
                                            key={comment.id}
                                            comment={comment}
                                            onDelete={handleDeleteComment}
                                        />
                                    ))}
                                </List>
                            ) : (
                                <Box sx={{ p: 3, textAlign: 'center' }}>
                                    <Typography color="text.secondary">No comments yet</Typography>
                                </Box>
                            )}
                        </Collapse>
                    </Paper>
                );
            })}
        </Box>
    );

    return (
        <Container maxWidth="xl" sx={{ py: 2 }}>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
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
        </Container>
    );
};

export default Blog;