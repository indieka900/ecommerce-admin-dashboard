import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';

const BrandDropdown = ({ brands, value, onChange, error, helperText }) => (
    <FormControl fullWidth error={error}>
        <InputLabel>Brand</InputLabel>
        <Select
            name="brand"
            value={value}
            label="Brand"
            onChange={onChange}
        >
            {brands.map((brand) => (
                <MenuItem key={brand.id || brand} value={brand.id || brand}>
                    {brand.brand_title || brand}
                </MenuItem>
            ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
);

export default BrandDropdown;
