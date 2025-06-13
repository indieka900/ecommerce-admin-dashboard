import {
    Paper,
    Grid,
    TextField,
    InputAdornment,
    FormControl,
    FormControlLabel,
    Switch
} from '@mui/material';
import { Search } from '@mui/icons-material';
import CategoryDropdown from './CategoryDropdown';
import BrandDropdown from './BrandDropdown';

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
                    <CategoryDropdown
                        categories={categories}
                        value={selectedCategory}
                        showAllOption={true}
                        onChange={(e) => onCategoryChange(e.target.value)}
                    />

                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <FormControl fullWidth>
                    <BrandDropdown
                        brands={brands}
                        value={selectedBrand}
                        showAllOption={true}
                        onChange={(e) => onBrandChange(e.target.value)}

                    />

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