/**
 * Validation functions
 */

// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Phone validation (Argentina format)
export const isValidPhone = (phone) => {
    const phoneRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
};

// CUIT/CUIL validation (Argentina)
export const isValidCUIT = (cuit) => {
    const cleaned = cuit.replace(/\D/g, '');
    if (cleaned.length !== 11) return false;
    
    const [checkDigit, ...rest] = cleaned.split('').map(Number).reverse();
    const total = rest.reduce((acc, cur, idx) => acc + cur * (2 + (idx % 6)), 0);
    const mod11 = 11 - (total % 11);
    
    if (mod11 === 11) return checkDigit === 0;
    if (mod11 === 10) return false;
    return checkDigit === mod11;
};

// Required field validation
export const isRequired = (value) => {
    if (typeof value === 'string') {
        return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
};

// Min length validation
export const minLength = (value, length) => {
    return value.length >= length;
};

// Max length validation
export const maxLength = (value, length) => {
    return value.length <= length;
};

// Number range validation
export const isInRange = (value, min, max) => {
    const num = Number(value);
    return num >= min && num <= max;
};

// Positive number validation
export const isPositive = (value) => {
    return Number(value) > 0;
};

// URL validation
export const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Password strength validation
export const isStrongPassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

// Date validation
export const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
};

// Future date validation
export const isFutureDate = (date) => {
    return new Date(date) > new Date();
};

export default {
    isValidEmail,
    isValidPhone,
    isValidCUIT,
    isRequired,
    minLength,
    maxLength,
    isInRange,
    isPositive,
    isValidURL,
    isStrongPassword,
    isValidDate,
    isFutureDate,
};