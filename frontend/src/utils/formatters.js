import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'ARS') => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

/**
 * Format number
 */
export const formatNumber = (number, decimals = 0) => {
    return new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(number);
};

/**
 * Format date
 */
export const formatDate = (date, formatString = 'dd/MM/yyyy') => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatString, { locale: es });
};

/**
 * Format date and time
 */
export const formatDateTime = (date) => {
    return formatDate(date, 'dd/MM/yyyy HH:mm');
};

/**
 * Format phone number
 */
export const formatPhone = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 2) => {
    return `${formatNumber(value, decimals)}%`;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export default {
    formatCurrency,
    formatNumber,
    formatDate,
    formatDateTime,
    formatPhone,
    formatPercentage,
    formatFileSize,
};