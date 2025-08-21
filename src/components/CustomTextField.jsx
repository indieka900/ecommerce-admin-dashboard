import { TextField, InputAdornment } from '@mui/material';

const CustomTextField = ({
    register,
    name,
    label,
    icon: Icon,
    disabled = false,
    error = false,
    helperText = '',
    type = 'text',
    multiline = false,
    rows = 1,
    fullWidth = true,
    ...otherProps
}) => {
    const registrationProps = register ? register(name) : {};
    
    const fieldProps = {
        ...registrationProps,
        name: name,
        id: name, 
    };

    return (
        <TextField
            {...fieldProps}
            label={label}
            type={type}
            fullWidth={fullWidth}
            multiline={multiline}
            rows={multiline ? rows : undefined}
            disabled={disabled}
            error={error}
            helperText={helperText}
            // sx={{
            //     '& .MuiInputLabel-root': {
            //         color: 'rgba(255, 255, 255, 0.7)'
            //     },
            //     '& .MuiOutlinedInput-root': {
            //         color: 'white',
            //         '& fieldset': {
            //             borderColor: 'rgba(255, 255, 255, 0.09)'
            //         },
            //         '&:hover fieldset': {
            //             borderColor: 'rgba(255, 255, 255, 0.5)'
            //         },
            //         '&.Mui-focused fieldset': {
            //             borderColor: 'primary.main'
            //         }
            //     },
            //     '& .MuiFormHelperText-root': {
            //         color: error ? '#f44336' : 'rgba(255, 255, 255, 0.6)'
            //     }
            // }}
            {...otherProps}
            slotProps={{
                input: {
                    startAdornment: Icon && (
                        <InputAdornment position="start">
                            <Icon sx={{ color: 'primary' }} />
                        </InputAdornment>
                    ),
                }
            }}
        />
    );
};

export default CustomTextField;