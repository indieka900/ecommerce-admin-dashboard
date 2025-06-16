import {
    Paper,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import SearchBar from '../common/SearchBar';

const BlogFilters = ({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    selectedAuthor,
    onAuthorChange,
    categories,
    authors,
    onClearFilters,
}) => {
    const searchInputRef = useRef();

    useEffect(() => {
        searchInputRef.current?.focus();
    }, []);
    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <Typography
                variant="h6"
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
            >
                <FilterAltIcon /> Filters & Search
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid
                    size={{
                        xs: 12,
                        md: 4
                    }}>
                    <SearchBar
                        ref={searchInputRef}
                        value={searchTerm}
                        onChange={onSearchChange}
                        usePaper={false}
                        placeholder="Search blog titles or authors..."
                    />
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            label="Category"
                            onChange={(e) => onCategoryChange(e.target.value)}
                        >
                            <MenuItem value="">All Categories</MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.category}>
                                    {category.category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}>
                    <FormControl fullWidth>
                        <InputLabel>Author</InputLabel>
                        <Select
                            value={selectedAuthor}
                            label="Author"
                            onChange={(e) => onAuthorChange(e.target.value)}
                        >
                            <MenuItem value="">All Authors</MenuItem>
                            {authors.map((author) => (
                                <MenuItem key={author} value={author}>
                                    {author}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        md: 2
                    }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<ClearIcon />}
                        onClick={onClearFilters}
                    >
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default BlogFilters;
