import React, { useState, useMemo, useCallback } from 'react';
import { 
    List,
    Box, 
    Typography,
    Paper,
    Button,
    useMediaQuery,
    useTheme,
    Divider,
    Container,
} from '@mui/material';
import CommentItem from './CommentItem';
import { Comment as CommentIcon,
    ExpandMore as ExpandMoreIcon
 } from '@mui/icons-material';


// Simple Load More Comment Section
const CommentSection = ({ 
    comments = [], 
    onDelete, 
    loading = false,
    title = "Comments",
    showDeleteButton = true 
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Load more state
    const [visibleCount, setVisibleCount] = useState(isMobile ? 3 : 5);
    const incrementSize = isMobile ? 3 : 5; // Increment size based on device type
    
    // Memoized visible comments
    const visibleComments = useMemo(() => {
        return comments.slice(0, visibleCount);
    }, [comments, visibleCount]);
    
    const hasMore = visibleCount < comments.length;
    const remainingCount = comments.length - visibleCount;
    
    // Load more handler
    const handleLoadMore = useCallback(() => {
        setVisibleCount(prev => Math.min(prev + incrementSize, comments.length));
    }, [incrementSize, comments.length]);
    
    // Reset when comments change
    React.useEffect(() => {
        setVisibleCount(isMobile ? 3 : 5);
    }, [comments.length, isMobile]);
    
    // Memoized delete handler
    const handleDelete = useCallback((commentId) => {
        onDelete?.(commentId);
    }, [onDelete]);

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ py: 2 }}>
                <Paper sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography variant="h6" gutterBottom>
                        Loading comments...
                    </Typography>
                </Paper>
            </Container>
        );
    }

    if (!comments.length) {
        return (
            <Container maxWidth="md" sx={{ py: 2 }}>
                <Paper sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CommentIcon />
                        {title}
                    </Typography>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <CommentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No comments yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Be the first to leave a comment!
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 2 }}>
            <Paper sx={{ 
                p: { xs: 2, sm: 3 },
                bgcolor: 'background.paper',
                borderRadius: 2
            }}>
                {/* Header */}
                <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                >
                    <CommentIcon />
                    {title} ({comments.length})
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* Comments List */}
                <List sx={{ p: 0 }}>
                    {visibleComments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onDelete={handleDelete}
                            showDeleteButton={showDeleteButton}
                        />
                    ))}
                </List>

                {/* Load More Button */}
                {hasMore && (
                    <Box sx={{ textAlign: 'center', mt: 3, pt: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={handleLoadMore}
                            startIcon={<ExpandMoreIcon />}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                textTransform: 'none',
                                fontSize: '0.9rem'
                            }}
                        >
                            Load More Comments ({remainingCount} remaining)
                        </Button>
                    </Box>
                )}

                {/* Status */}
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        display: 'block',
                        textAlign: 'center',
                        mt: 2
                    }}
                >
                    Showing {visibleComments.length} of {comments.length} comments
                </Typography>
            </Paper>
        </Container>
    );
};

export default CommentSection;