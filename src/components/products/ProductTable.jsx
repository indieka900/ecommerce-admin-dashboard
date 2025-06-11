import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Chip,
    Avatar,
    Box,
    Typography,
    Stack,
    Tooltip,
    Paper
} from '@mui/material';
import {
    Edit,
    Delete,
    Visibility,
    Star
} from '@mui/icons-material';

export const ProductTable = ({ 
    products, 
    page, 
    rowsPerPage, 
    onChangePage, 
    onChangeRowsPerPage,
    onView,
    onEdit,
    onDelete,
    onToggleFeatured,
    renderStockStatus,
    renderRating,
    getDisplayPrice
}) => (
    <Paper>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Stock</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((product) => (
                        <TableRow key={product.id} hover>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Avatar
                                        src={product.prod_img}
                                        alt={product.title}
                                        sx={{ mr: 2, width: 50, height: 50 }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {product.title}
                                        </Typography>
                                        {product.featured && (
                                            <Chip label="Featured" size="small" color="primary" />
                                        )}
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>{product.brand}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>
                                <Box>
                                    <Typography variant="body2" fontWeight="bold">
                                        {getDisplayPrice(product)}
                                    </Typography>
                                    {product.discount > 0 && (
                                        <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                            Ksh {product.price.toLocaleString()}
                                        </Typography>
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell>
                                {renderStockStatus(product.quantity, product.variants)}
                            </TableCell>
                            <TableCell>
                                {renderRating(product.rating)}
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                    {product.has_variants && (
                                        <Chip 
                                            label={`${product.variants.length} variants`} 
                                            size="small" 
                                            variant="outlined"
                                        />
                                    )}
                                    {product.discount > 0 && (
                                        <Chip 
                                            label={`${product.discount}% OFF`} 
                                            size="small" 
                                            color="error"
                                        />
                                    )}
                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Box display="flex" gap={1}>
                                    <Tooltip title="View Details">
                                        <IconButton 
                                            size="small"
                                            onClick={() => onView(product)}
                                        >
                                            <Visibility />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit Product">
                                        <IconButton size="small" color="primary" onClick={() => onEdit(product)}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Toggle Featured">
                                        <IconButton 
                                            size="small"
                                            onClick={() => onToggleFeatured(product.id)}
                                            color={product.featured ? "warning" : "default"}
                                        >
                                            <Star />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Product">
                                        <IconButton 
                                            size="small" 
                                            color="error"
                                            onClick={() => onDelete(product.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
        />
    </Paper>
);