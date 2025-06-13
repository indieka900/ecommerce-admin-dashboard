import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';

const CategoryDropdown = ({
    categories,
    value,
    onChange,
    error,
    helperText,
    showAllOption = false // New prop to control "All" option visibility
}) => (
    <FormControl fullWidth error={error}>
        <InputLabel>Category</InputLabel>
        <Select
            name="category"
            value={value}
            label="Category"
            onChange={onChange}
        >
            {/* Conditionally render "All" option with "All" as the value */}
            {showAllOption && (
                <MenuItem value="All">
                    All
                </MenuItem>
            )}
            {categories
                .map((cat) => (
                    <MenuItem key={cat.id || cat} value={cat.id || cat}>
                        {cat.category_name || cat} {cat.parent_category ? (`for ${cat.parent_category}`) : ''}
                    </MenuItem>
                ))
            }
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
);

export default CategoryDropdown;