import { Card, CardContent, Typography, Box } from '@mui/material';

const StatCard = ({ value, label, icon, iconColor = '#6366f1' }) => (
    <Card>
        <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        {value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {label}
                    </Typography>
                </Box>
                {icon && icon({
                    sx: { fontSize: 40, opacity: 0.7, color: iconColor }
                })}
            </Box>
        </CardContent>
    </Card>
);

export default StatCard;
