import {
    Container,
    Box,
    Paper,
    Typography,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Skeleton,
    Card,
    CardContent,
    Chip
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const CategoryLoadingSkeleton = () => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ py: 4 }}>
                {/* Header Skeleton */}
                <Box sx={{ mb: 4 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box>
                            <Skeleton variant="text" width={300} height={40} />
                            <Skeleton variant="text" width={450} height={24} />
                        </Box>
                        <Box display="flex" gap={2}>
                            <Skeleton variant="rectangular" width={180} height={36} sx={{ borderRadius: 1 }} />
                            <Skeleton variant="rectangular" width={140} height={36} sx={{ borderRadius: 1 }} />
                        </Box>
                    </Box>
                </Box>

                {/* Search Bar Skeleton */}
                <Box sx={{ mb: 4 }}>
                    <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 1 }} />
                </Box>

                {/* Stats Cards Skeleton */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[1, 2, 3, 4].map((index) => (
                        <Grid
                            key={index}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 3
                            }}>
                            <Card elevation={2}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box>
                                            <Skeleton variant="text" width={60} height={32} />
                                            <Skeleton variant="text" width={120} height={20} />
                                        </Box>
                                        <Skeleton variant="circular" width={40} height={40} />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Main Content Skeleton */}
                <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                        <Skeleton variant="text" width={200} height={32} />
                    </Typography>

                    {/* Parent Categories Skeleton */}
                    {[1, 2, 3].map((parentIndex) => (
                        <Accordion key={parentIndex} defaultExpanded sx={{ mb: 2, boxShadow: 2 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    '& .MuiAccordionSummary-expandIconWrapper': { color: 'white' }
                                }}
                            >
                                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Skeleton
                                            variant="circular"
                                            width={24}
                                            height={24}
                                            sx={{ bgcolor: 'rgba(255,255,255,0.3)' }}
                                        />
                                        <Skeleton
                                            variant="text"
                                            width={180}
                                            height={28}
                                            sx={{ bgcolor: 'rgba(255,255,255,0.3)' }}
                                        />
                                        <Skeleton
                                            variant="rectangular"
                                            width={90}
                                            height={24}
                                            sx={{
                                                borderRadius: '12px',
                                                bgcolor: 'rgba(255,255,255,0.2)'
                                            }}
                                        />
                                    </Box>
                                    <Box display="flex" gap={1}>
                                        <Skeleton
                                            variant="circular"
                                            width={32}
                                            height={32}
                                            sx={{ bgcolor: 'rgba(255,255,255,0.3)' }}
                                        />
                                        <Skeleton
                                            variant="circular"
                                            width={32}
                                            height={32}
                                            sx={{ bgcolor: 'rgba(255,255,255,0.3)' }}
                                        />
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}>
                                <List>
                                    {[1, 2, 3, 4].map((categoryIndex) => (
                                        <ListItem key={categoryIndex} divider>
                                            <ListItemText
                                                primary={
                                                    <Box display="flex" alignItems="center" gap={2}>
                                                        <Skeleton variant="circular" width={24} height={24} />
                                                        <Skeleton variant="text" width={150} height={24} />
                                                        <Skeleton
                                                            variant="rectangular"
                                                            width={100}
                                                            height={24}
                                                            sx={{ borderRadius: '12px' }}
                                                        />
                                                    </Box>
                                                }
                                            />
                                            <Box display="flex" gap={1} ml={2}>
                                                <Skeleton variant="circular" width={32} height={32} />
                                                <Skeleton variant="circular" width={32} height={32} />
                                            </Box>
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Paper>
            </Box>
        </Container>
    );
};

export default CategoryLoadingSkeleton;