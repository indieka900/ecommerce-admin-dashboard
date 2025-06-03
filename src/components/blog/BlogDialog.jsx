import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Box } from '@mui/material';

export default function BlogDialog({ open, onClose, onSubmit, formData, onChange }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Create Blog</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <TextField label="Title" name="title" value={formData?.title} onChange={onChange} fullWidth />
                    <TextField label="Author" name="author" value={formData?.author} onChange={onChange} fullWidth />
                    <TextField label="Category" name="category" value={formData?.category} onChange={onChange} fullWidth />
                    <TextField label="Image URL" name="image" value={formData?.image} onChange={onChange} fullWidth />
                    <TextField
                        label="Content"
                        name="content"
                        value={formData?.content}
                        onChange={onChange}
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSubmit} variant="contained">Submit</Button>
            </DialogActions>
        </Dialog>
    );
}