import {
    Box,
    Typography,
    Button
} from '@mui/material';
import { Add } from '@mui/icons-material';

export const PageHeader = ({ title, subtitle, onAddClick, addButtonText = "Add Product" }) => (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {subtitle}
            </Typography>
        </Box>
        <Button
            variant="contained"
            startIcon={<Add />}
            size="large"
            onClick={onAddClick}
            sx={{
                background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                '&:hover': {
                    background: 'linear-gradient(45deg, #5b5fc7, #7c3aed)',
                }
            }}
        >
            {addButtonText}
        </Button>
    </Box>
);