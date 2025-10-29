import api from './api';

export const paymentService = {
    getPayments: async (filters = {}) => {
        try {
            const response = await api.get('/payments', { params: filters });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getPaymentById: async (id) => {
        try {
            const response = await api.get(`/payments/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createPayment: async (paymentData) => {
        try {
            const response = await api.post('/payments', paymentData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updatePayment: async (id, paymentData) => {
        try {
            const response = await api.put(`/payments/${id}`, paymentData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deletePayment: async (id) => {
        try {
            const response = await api.delete(`/payments/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default paymentService;