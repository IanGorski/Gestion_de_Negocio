// API URLs
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// App Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    PAYMENTS: '/payments',
    INVENTORY: '/inventory',
    REPORTS: '/reports',
    SETTINGS: '/settings',
};

// Payment Methods
export const PAYMENT_METHODS = {
    CASH: 'cash',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    TRANSFER: 'transfer',
    DIGITAL_WALLET: 'digital_wallet',
};

// Payment Status
export const PAYMENT_STATUS = {
    COMPLETED: 'completed',
    PENDING: 'pending',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
};

// Stock Levels
export const STOCK_LEVELS = {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    OUT_OF_STOCK: 'out_of_stock',
};

// User Roles
export const USER_ROLES = {
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
    VIEWER: 'viewer',
};

// Date Formats
export const DATE_FORMATS = {
    DISPLAY: 'dd/MM/yyyy',
    API: 'yyyy-MM-dd',
    DATETIME: 'dd/MM/yyyy HH:mm',
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};

export default {
    API_BASE_URL,
    ROUTES,
    PAYMENT_METHODS,
    PAYMENT_STATUS,
    STOCK_LEVELS,
    USER_ROLES,
    DATE_FORMATS,
    PAGINATION,
};