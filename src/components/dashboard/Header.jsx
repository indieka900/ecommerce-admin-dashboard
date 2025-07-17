import { Box, Typography, ButtonGroup, Button, IconButton } from '@mui/material';
import { Refresh } from '@mui/icons-material';

const Header = ({ selectedPeriod, handlePeriodChange, refetch }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Analytics Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Comprehensive overview of your e-commerce performance
                </Typography>
            </Box>
            <Box display="flex" gap={2} alignItems="center">
                <ButtonGroup size="small">
                    <Button
                        variant={selectedPeriod === 7 ? 'contained' : 'outlined'}
                        onClick={() => handlePeriodChange(7)}
                    >
                        7 Days
                    </Button>
                    <Button
                        variant={selectedPeriod === 30 ? 'contained' : 'outlined'}
                        onClick={() => handlePeriodChange(30)}
                    >
                        30 Days
                    </Button>
                    <Button
                        variant={selectedPeriod === 90 ? 'contained' : 'outlined'}
                        onClick={() => handlePeriodChange(90)}
                    >
                        90 Days
                    </Button>
                </ButtonGroup>
                <IconButton onClick={refetch} color="primary">
                    <Refresh />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Header;