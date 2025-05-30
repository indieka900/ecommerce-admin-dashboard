import {
    Box,
    Typography,
    Button,
    Alert,
    CircularProgress,
    LinearProgress,
    Chip
} from '@mui/material';
import {
    Lock as LockIcon,
    Security as SecurityIcon
} from '@mui/icons-material';
import { calculatePasswordStrength, getPasswordStrengthColor, getPasswordStrengthText } from '../utils/passwordUtils';
import PasswordTextField from './PasswordTextField';

const PasswordFormFields = ({
    formik,
    isSubmitting = false,
    submitButtonText = 'Update Password',
    submittingText = 'Updating Password...',
    showAlert = true,
    alertText = 'Use a strong password with a mix of letters, numbers, and special characters.',
    minPasswordStrength = 3
}) => {
    const passwordStrength = calculatePasswordStrength(formik.values.newPassword);

    return (
        <>
            <PasswordTextField
                name="newPassword"
                label="New Password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.newPassword}
                touched={formik.touched.newPassword}
                autoFocus
            />

            {formik.values.newPassword && (
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ mr: 2 }}>Password Strength:</Typography>
                        <Chip
                            label={getPasswordStrengthText(passwordStrength)}
                            size="small"
                            color={getPasswordStrengthColor(passwordStrength)}
                            variant="outlined"
                        />
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={(passwordStrength.score / 5) * 100}
                        color={getPasswordStrengthColor(passwordStrength)}
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1
                    }}>
                    </Box>
                </Box>
            )}

            <PasswordTextField
                name="confirmPassword"
                label="Confirm New Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.confirmPassword}
                touched={formik.touched.confirmPassword}
            />

            {showAlert && (
                <Alert severity="info" sx={{ mt: 2, mb: 2 }} icon={<SecurityIcon />}>
                    <strong>Security Tips:</strong> {alertText}
                </Alert>
            )}

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={isSubmitting || !formik.isValid || passwordStrength.score < minPasswordStrength}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <LockIcon />}
            >
                {isSubmitting ? submittingText : submitButtonText}
            </Button>
        </>
    );
};

export default PasswordFormFields;