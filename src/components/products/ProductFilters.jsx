import {
    Paper,
    Grid,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch
} from '@mui/material';
import { Search } from '@mui/icons-material';

export const ProductFilters = ({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
    selectedBrand,
    onBrandChange,
    brands,
    viewMode,
    onViewModeChange
}) => (
    <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                    fullWidth
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        label="Category"
                    >
                        {categories.map(category => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select
                        value={selectedBrand}
                        onChange={(e) => onBrandChange(e.target.value)}
                        label="Brand"
                    >
                        {brands.map(brand => (
                            <MenuItem key={brand} value={brand}>
                                {brand}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={viewMode === 'grid'}
                            onChange={(e) => onViewModeChange(e.target.checked ? 'grid' : 'table')}
                        />
                    }
                    label="Grid View"
                />
            </Grid>
        </Grid>
    </Paper>
);