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

const BlogForm = ({
    open,
    onClose,
    editingBlog,
    blogForm,
    setBlogForm,
    onSave,
    categories
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{ sx: { borderRadius: 2 } }}
        >
            <DialogTitle>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Title *"
                            value={blogForm.title}
                            onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6
                        }}>
                        <TextField
                            fullWidth
                            label="Author *"
                            value={blogForm.author}
                            onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                        />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6
                        }}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={blogForm.category}
                                label="Category"
                                onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                        >
                            {blogForm.image ? 'Change Image' : 'Upload Image'}
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setBlogForm({ ...blogForm, image: file });
                                    }
                                }}
                            />
                        </Button>
                        {blogForm.image && typeof blogForm.image === 'object' && (
                            <img
                                src={URL.createObjectURL(blogForm.image)}
                                alt="Preview"
                                style={{ marginTop: 10, maxHeight: 200, borderRadius: 8 }}
                            />
                        )}
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Slug"
                            value={blogForm.slug}
                            onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                            helperText="Leave empty to auto-generate from title"
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Content *"
                            value={blogForm.content}
                            onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
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
};

export default BlogForm;
