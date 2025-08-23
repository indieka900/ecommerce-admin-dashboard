import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box,
    Chip,
    Button
} from '@mui/material';

const BlogViewDialog = ({ blog, open, onClose, onEdit }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

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
            {blog && (
                <>
                    <DialogTitle sx={{ pb: 1 }}>
                        <Typography variant="h5">{blog.title}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                By {blog.author}
                            </Typography>
                            <Chip label={blog.category} size="small" color="primary" />
                            <Typography variant="body2" color="text.secondary">
                                {formatDate(blog.date_posted)}
                            </Typography>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        {blog.image && (
                            <Box sx={{ mb: 2 }}>
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    style={{
                                        width: '100%',
                                        height: '300px',
                                        objectFit: 'cover',
                                        borderRadius: 8,
                                    }}
                                />
                            </Box>
                        )}
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                            {blog.content}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Close</Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                onClose();
                                onEdit(blog);
                            }}
                        >
                            Edit Blog
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default BlogViewDialog;
