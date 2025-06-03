import { 
    ListItem, 
    ListItemText, 
    IconButton, 
    Tooltip, 
    Box, 
    Typography,
    Avatar,
    Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LanguageIcon from '@mui/icons-material/Language';

const CommentItem = ({ comment, onDelete, showDeleteButton = true }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Generate initials for avatar
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                mb: 1,
                bgcolor: 'background.paper',
                '&:hover': {
                    bgcolor: 'action.hover',
                },
            }}
            secondaryAction={
                showDeleteButton && (
                    <Tooltip title="Delete comment" arrow>
                        <IconButton
                            edge="end"
                            aria-label="delete comment"
                            onClick={() => onDelete(comment.id)}
                            color="error"
                            size="small"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                )
            }
        >
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
        </ListItem>
    );
};

export default CommentItem;