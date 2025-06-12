import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';

const CategoryDropdown = ({ categories, value, onChange, error, helperText }) => (
    <FormControl fullWidth error={error}>
        <InputLabel>Category</InputLabel>
        <Select
            name="category"
            value={value}
            label="Category"
            onChange={onChange}
        >
            {categories.map((cat) => (
                <MenuItem key={cat.id || cat} value={cat.id || cat}>
                    {cat.category_name || cat}
                </MenuItem>
            ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
);

export default CategoryDropdown;
