import { PASSWORD_PATTERNS } from "../validators/ValidationSchema";

export const calculatePasswordStrength = (password) => {
    if (!password) return { score: 0, checks: {} };
    const checks = {
        length: password.length >= 6,
        uppercase: PASSWORD_PATTERNS.uppercase.test(password),
        lowercase: PASSWORD_PATTERNS.lowercase.test(password),
        number: PASSWORD_PATTERNS.number.test(password),
        special: PASSWORD_PATTERNS.special.test(password)
    };
    return {
        score: Object.values(checks).filter(Boolean).length,
        checks
    };
};

export const getPasswordStrengthColor = (passwordStrength) => {
    if (passwordStrength.score <= 2) return 'error';
    if (passwordStrength.score <= 3) return 'warning';
    if (passwordStrength.score <= 4) return 'info';
    return 'success';
};

export const getPasswordStrengthText = (passwordStrength) => {
    if (passwordStrength.score <= 2) return 'Weak';
    if (passwordStrength.score <= 3) return 'Fair';
    if (passwordStrength.score <= 4) return 'Good';
    return 'Strong';
};