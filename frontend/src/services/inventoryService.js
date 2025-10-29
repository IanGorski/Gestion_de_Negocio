import api from './api';

export const inventoryService = {
    getProducts: async (filters = {}) => {
        try {
            const response = await api.get('/products', { params: filters });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createProduct: async (productData) => {
        try {
            const response = await api.post('/products', productData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateProduct: async (id, productData) => {
        try {
            const response = await api.put(`/products/${id}`, productData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            const response = await api.delete(`/products/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getLowStockProducts: async () => {
        try {
            const response = await api.get('/products/low-stock');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getExpiringProducts: async (days = 30) => {
        try {
            const response = await api.get(`/products/expiring?days=${days}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default inventoryService;