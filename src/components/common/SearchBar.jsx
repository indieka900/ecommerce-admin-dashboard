import React, { forwardRef } from 'react';
import {
    TextField,
    Paper,
    InputAdornment,
    IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';


const SearchBar = forwardRef(({
    value,
    onChange,
    placeholder = 'Search...',
    showClear = true,
    usePaper = true,
    sx = {}
}, ref) => {
    const content = (
        <TextField
            fullWidth
            inputRef={ref}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                    endAdornment: showClear && value ? (
                        <InputAdornment position="end">
                            <IconButton onClick={() => onChange('')} size="small">
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ) : null
                }
            }}
            sx={{ ...sx }}
        />
    );

    return usePaper ? (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
            {content}
        </Paper>
    ) : content;
});

export default SearchBar;
