import { ListItem, ListItemText, IconButton, Tooltip, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentItem = ({ comment, onDelete }) => {
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
        <ListItem
            alignItems="flex-start"
            secondaryAction={
                <Tooltip title="Delete Comment">
                    <IconButton
                        edge="end"
                        onClick={() => onDelete(comment.id)}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            }
        >
            <ListItemText
                primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="subtitle2">{comment.author}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {formatDate(comment.date)}
                        </Typography>
                    </Box>
                }
                secondary={comment.content}
            />
        </ListItem>
    );
};

export default CommentItem;
