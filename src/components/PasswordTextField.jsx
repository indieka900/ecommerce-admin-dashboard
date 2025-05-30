import { useState } from 'react';
import {
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Lock as LockIcon,
} from '@mui/icons-material';

const PasswordTextField = ({
    name,
    label,
    value,
    onChange,
    onBlur,
    error,
    touched,
    autoFocus = false,
    required = true,
    fullWidth = true,
    margin = "normal"
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <TextField
            label={label}
            name={name}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            fullWidth={fullWidth}
            margin={margin}
            required={required}
            autoFocus={autoFocus}
            error={touched && !!error}
            helperText={touched && error}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon color="action" />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
        />
    );
};

export default PasswordTextField;