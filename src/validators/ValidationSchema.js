import * as Yup from 'yup';

export const validationSchema = Yup.object({
    newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        // .matches(/\d/, 'Password must contain at least one number')
        // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your password')
});

export const PASSWORD_PATTERNS = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /\d/,
    special: /[!@#$%^&*(),.?":{}|<>]/
};