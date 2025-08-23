import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Skeleton,
    Alert,
    AlertTitle,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Avatar
} from '@mui/material';
import {
    Refresh as RefreshIcon,
    Error as ErrorIcon,
    Warning as WarningIcon
} from '@mui/icons-material';

// Loading Skeleton for Stats Cards
const StatsCardsSkeleton = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
        {[1, 2, 3, 4].map((item) => (
            <Grid
                key={item}
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                }}>
                <Card>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                            <Box sx={{ flexGrow: 1 }}>
                                <Skeleton variant="text" width="60%" height={20} />
                                <Skeleton variant="text" width="40%" height={16} />
                            </Box>
                        </Box>
                        <Skeleton variant="text" width="30%" height={32} />
                    </CardContent>
                </Card>
            </Grid>
        ))}
    </Grid>
);

// Loading Skeleton for Filters
const FiltersSkeleton = () => (
    <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
            <Grid
                size={{
                    xs: 12,
                    md: 4
                }}>
                <Skeleton variant="rectangular" height={40} />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    md: 2
                }}>
                <Skeleton variant="rectangular" height={40} />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    md: 2
                }}>
                <Skeleton variant="rectangular" height={40} />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    md: 2
                }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Skeleton variant="rectangular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={40} height={40} />
                </Box>
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    md: 2
                }}>
                <Skeleton variant="rectangular" height={40} />
            </Grid>
        </Grid>
    </Paper>
);

// Loading Skeleton for Table
const ProductTableSkeleton = ({ rows = 10 }) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell><Skeleton variant="text" width="60%" /></TableCell>
                    <TableCell><Skeleton variant="text" width="80%" /></TableCell>
                    <TableCell><Skeleton variant="text" width="70%" /></TableCell>
                    <TableCell><Skeleton variant="text" width="60%" /></TableCell>
                    <TableCell><Skeleton variant="text" width="50%" /></TableCell>
                    <TableCell><Skeleton variant="text" width="70%" /></TableCell>
                    <TableCell><Skeleton variant="text" width="60%" /></TableCell>
                    <TableCell><Skeleton variant="text" width="80%" /></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Array.from(new Array(rows)).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Skeleton variant="rectangular" width={50} height={50} sx={{ mr: 2 }} />
                                <Box>
                                    <Skeleton variant="text" width={120} height={20} />
                                    <Skeleton variant="text" width={80} height={16} />
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell><Skeleton variant="text" width="90%" /></TableCell>
                        <TableCell><Skeleton variant="text" width="60%" /></TableCell>
                        <TableCell><Skeleton variant="text" width="80%" /></TableCell>
                        <TableCell><Skeleton variant="rectangular" width={60} height={24} /></TableCell>
                        <TableCell><Skeleton variant="rectangular" width={80} height={24} /></TableCell>
                        <TableCell>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Skeleton key={star} variant="circular" width={16} height={16} />
                                ))}
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Skeleton variant="circular" width={32} height={32} />
                                <Skeleton variant="circular" width={32} height={32} />
                                <Skeleton variant="circular" width={32} height={32} />
                            </Box>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        {/* Pagination Skeleton */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            <Skeleton variant="text" width={200} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Skeleton variant="text" width={100} />
                <Skeleton variant="rectangular" width={60} height={32} />
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="circular" width={32} height={32} />
            </Box>
        </Box>
    </TableContainer>
);

// Complete Products Page Skeleton
export const ProductsPageSkeleton = () => (
    <Box sx={{ p: 3 }}>
        {/* Page Header Skeleton */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
                <Skeleton variant="text" width={200} height={32} sx={{ mb: 1 }} />
                <Skeleton variant="text" width={300} height={20} />
            </Box>
            <Skeleton variant="rectangular" width={140} height={40} />
        </Box>

        {/* Stats Cards Skeleton */}
        <StatsCardsSkeleton />

        {/* Filters Skeleton */}
        <FiltersSkeleton />

        {/* Table Skeleton */}
        <ProductTableSkeleton />
    </Box>
);

// Error State Component
export const ProductsPageError = ({ error, onRetry }) => (
    <Box sx={{ p: 3 }}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                    Products
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage your product inventory
                </Typography>
            </Box>
        </Box>

        {/* Error Alert */}
        <Alert
            severity="error"
            sx={{ mb: 3 }}
            icon={<ErrorIcon />}
            action={
                onRetry && (
                    <Button
                        color="inherit"
                        size="small"
                        onClick={onRetry}
                        startIcon={<RefreshIcon />}
                    >
                        Retry
                    </Button>
                )
            }
        >
            <AlertTitle>Failed to Load Products</AlertTitle>
            {error || 'An unexpected error occurred while loading the products. Please try again.'}
        </Alert>

        {/* Empty State Illustration */}
        <Paper sx={{ p: 4, textAlign: 'center', }}>
            <Avatar sx={{
                width: 80,
                height: 80,
                margin: '0 auto 16px',
                backgroundColor: 'error.light',
                color: 'error.contrastText'
            }}>
                <WarningIcon sx={{ fontSize: 40 }} />
            </Avatar>

            <Typography variant="h6" gutterBottom>
                Unable to Load Products
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{
                marginBottom: "16px"
            }}>
                We're having trouble connecting to our servers. This might be a temporary issue.
            </Typography>

            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                {onRetry && (
                    <Button
                        variant="contained"
                        startIcon={<RefreshIcon />}
                        onClick={onRetry}
                    >
                        Try Again
                    </Button>
                )}

                <Button
                    variant="outlined"
                    onClick={() => window.location.reload()}
                >
                    Refresh Page
                </Button>
            </Box>
        </Paper>
    </Box>
);

// Usage in your ProductsPage component
export const LoadingAndErrorStates = ({ loading, error, onRetry, children }) => {
    if (loading) {
        return <ProductsPageSkeleton />;
    }

    if (error) {
        return <ProductsPageError error={error} onRetry={onRetry} />;
    }

    return children;
};