import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Box,
    Avatar,
    Chip,
    useTheme,
    useMediaQuery,
    Tooltip,
    IconButton
} from '@mui/material';

import {
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Comment as CommentIcon
} from '@mui/icons-material';

const BlogCard = React.memo(({ blog, onView, onEdit, onDelete, commentsCount }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Card
            sx={{
                // height: '100%',
                // display: 'flex',
                // flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4],
                },
                // minHeight: { xs: 200, sm: 250 },
                // maxHeight: { xs: 300, sm: 350 },

            }}>
            <CardMedia
                component="img"
                height="200"
                image={blog.image}
                alt={blog.title}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Typography
                    gutterBottom
                    variant={isMobile ? "h6" : "h5"}
                    component="h2"
                    sx={{
                        fontWeight: 600,
                        lineHeight: 1.3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                >
                    {blog.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                        {blog.author.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                        {blog.author}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Chip label={blog.category} size="small" color="primary" />
                    <Typography variant="caption" color="text.secondary">
                        {formatDate(blog.date_posted)}
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {blog.content}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Box>
                    <Tooltip title="View Blog">
                        <IconButton onClick={() => onView(blog)} color="info">
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Blog">
                        <IconButton onClick={() => onEdit(blog)} color="primary">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Blog">
                        <IconButton onClick={() => onDelete(blog.id)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CommentIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                        {commentsCount}
                    </Typography>
                </Box>
            </CardActions>
        </Card>
    );
});

export default BlogCard;
