import api from './api';

export const reportService = {
    getSalesReport: async (filters = {}) => {
        try {
            const response = await api.get('/reports/sales', { params: filters });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getProductsReport: async (filters = {}) => {
        try {
            const response = await api.get('/reports/products', { params: filters });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getInventoryReport: async (filters = {}) => {
        try {
            const response = await api.get('/reports/inventory', { params: filters });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    exportReport: async (reportType, format, filters = {}) => {
        try {
            const response = await api.get(`/reports/${reportType}/export`, {
                params: { ...filters, format },
                responseType: 'blob',
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getDashboardStats: async () => {
        try {
            const response = await api.get('/reports/dashboard');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default reportService;