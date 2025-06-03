import React, { useCallback } from 'react';
import {
    ListItem,
    ListItemText,
    IconButton,
    Tooltip,
    Box,
    Typography,
    Avatar,
    Chip,
    useMediaQuery,
    useTheme,
    Fade
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Language as LanguageIcon
} from '@mui/icons-material';

const CommentItem = React.memo(({ comment, onDelete, showDeleteButton = true }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const formatDate = useCallback((dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }, []);

    const getInitials = useCallback((name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }, []);

    const handleDelete = useCallback(() => {
        onDelete(comment.id);
    }, [onDelete, comment.id]);

    return (
        <Fade in timeout={300}>
            <ListItem
                alignItems="flex-start"
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    mb: { xs: 1, sm: 1.5 },
                    bgcolor: 'background.paper',
                    p: { xs: 1.5, sm: 2 },
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        bgcolor: 'action.hover',
                        transform: 'translateY(-1px)',
                        boxShadow: 2,
                    },
                    // Better mobile layout
                    ...(isMobile && {
                        flexDirection: 'column',
                        alignItems: 'stretch',
                    }),
                }}
                secondaryAction={
                    showDeleteButton && !isMobile && (
                        <Tooltip title="Delete comment" arrow>
                            <IconButton
                                edge="end"
                                aria-label="delete comment"
                                onClick={handleDelete}
                                color="error"
                                size="small"
                                sx={{
                                    opacity: 0.7,
                                    transition: 'opacity 0.2s',
                                    '&:hover': { opacity: 1 }
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )
                }
            >
                {isMobile ? (
                    // Mobile Layout - Stacked
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 1
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: 'primary.main',
                                        width: 32,
                                        height: 32,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    {getInitials(comment.full_name)}
                                </Avatar>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    {comment.full_name}
                                </Typography>
                            </Box>

                            {showDeleteButton && (
                                <IconButton
                                    onClick={handleDelete}
                                    color="error"
                                    size="small"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>

                        <Typography
                            variant="body2"
                            sx={{
                                mb: 1,
                                lineHeight: 1.5,
                                wordBreak: 'break-word'
                            }}
                        >
                            {comment.text}
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 1
                        }}>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.75rem' }}
                            >
                                {comment.email}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {comment.website && (
                                    <Tooltip title={`Visit ${comment.website}`} arrow>
                                        <IconButton
                                            size="small"
                                            href={comment.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ p: 0.25 }}
                                        >
                                            <LanguageIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                <Chip
                                    label={formatDate(comment.added_at)}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        height: 18,
                                        fontSize: '0.7rem',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    // Desktop Layout - Side by side
                    <>
                        <Avatar
                            sx={{
                                mr: 2,
                                bgcolor: 'primary.main',
                                width: 40,
                                height: 40
                            }}
                        >
                            {getInitials(comment.full_name)}
                        </Avatar>

                        <ListItemText
                            primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Typography
                                        variant="subtitle2"
                                        component="span"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {comment.full_name}
                                    </Typography>

                                    {comment.website && (
                                        <Tooltip title={`Visit ${comment.website}`} arrow>
                                            <IconButton
                                                size="small"
                                                href={comment.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ p: 0.5 }}
                                            >
                                                <LanguageIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    )}

                                    <Chip
                                        label={formatDate(comment.added_at)}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            height: 20,
                                            fontSize: '0.75rem',
                                            ml: 'auto'
                                        }}
                                    />
                                </Box>
                            }
                            secondary={
                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="text.primary"
                                        sx={{
                                            mt: 1,
                                            lineHeight: 1.5,
                                            wordBreak: 'break-word'
                                        }}
                                    >
                                        {comment.text}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ mt: 0.5, display: 'block' }}
                                    >
                                        {comment.email}
                                    </Typography>
                                </Box>
                            }
                        />
                    </>
                )}
            </ListItem>
        </Fade>
    );
});

export default CommentItem;