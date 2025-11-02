/**
 * Datos mock 
 * Respuestas simuladas de API para desarrollo y pruebas
 */

// Estadísticas generales del negocio
export const mockStats = {
    salesToday: {
        value: 245000,
        change: 12.5,
        trend: 'up'
    },
    totalRevenue: {
        value: 1850000,
        change: 8.3,
        trend: 'up'
    },
    lowStock: {
        value: 15,
        change: -5.2,
        trend: 'down'
    },
    transactions: {
        value: 48,
        change: 15.8,
        trend: 'up'
    }
};

// Datos para gráfico de ventas diarias (últimos 7 días)
export const mockSalesChartData = [
    { date: '25/10', sales: 185000, orders: 32 },
    { date: '26/10', sales: 220000, orders: 38 },
    { date: '27/10', sales: 195000, orders: 35 },
    { date: '28/10', sales: 240000, orders: 42 },
    { date: '29/10', sales: 210000, orders: 37 },
    { date: '30/10', sales: 265000, orders: 45 },
    { date: '31/10', sales: 245000, orders: 48 }
];

// Datos para gráfico de productos más vendidos
export const mockTopProductsData = [
    { name: 'Producto A', sales: 125, revenue: 625000 },
    { name: 'Producto B', sales: 98, revenue: 490000 },
    { name: 'Producto C', sales: 87, revenue: 435000 },
    { name: 'Producto D', sales: 75, revenue: 375000 },
    { name: 'Producto E', sales: 62, revenue: 310000 }
];

// Datos para gráfico de métodos de pago
export const mockPaymentMethodsData = [
    { name: 'Efectivo', value: 35, amount: 875000 },
    { name: 'Tarjeta de Crédito', value: 30, amount: 750000 },
    { name: 'Tarjeta de Débito', value: 20, amount: 500000 },
    { name: 'Transferencia', value: 10, amount: 250000 },
    { name: 'Billetera Digital', value: 5, amount: 125000 }
];

// Transacciones recientes
export const mockRecentTransactions = [
    {
        id: 'TXN-001',
        date: '31/10/2025 14:30',
        customer: 'Cliente 1',
        items: 3,
        amount: 45000,
        method: 'Efectivo',
        status: 'completed'
    },
    {
        id: 'TXN-002',
        date: '31/10/2025 13:15',
        customer: 'Cliente 2',
        items: 1,
        amount: 22000,
        method: 'Tarjeta de Crédito',
        status: 'completed'
    },
    {
        id: 'TXN-003',
        date: '31/10/2025 12:45',
        customer: 'Cliente 3',
        items: 5,
        amount: 67500,
        method: 'Transferencia',
        status: 'completed'
    },
    {
        id: 'TXN-004',
        date: '31/10/2025 11:20',
        customer: 'Cliente 4',
        items: 2,
        amount: 38000,
        method: 'Tarjeta de Débito',
        status: 'completed'
    },
    {
        id: 'TXN-005',
        date: '31/10/2025 10:55',
        customer: 'Cliente 5',
        items: 4,
        amount: 52000,
        method: 'Efectivo',
        status: 'completed'
    },
    {
        id: 'TXN-006',
        date: '31/10/2025 10:30',
        customer: 'Cliente 6',
        items: 1,
        amount: 18500,
        method: 'Billetera Digital',
        status: 'pending'
    },
    {
        id: 'TXN-007',
        date: '31/10/2025 09:40',
        customer: 'Cliente 7',
        items: 3,
        amount: 41000,
        method: 'Efectivo',
        status: 'completed'
    },
    {
        id: 'TXN-008',
        date: '31/10/2025 09:15',
        customer: 'Cliente 8',
        items: 2,
        amount: 29000,
        method: 'Tarjeta de Crédito',
        status: 'completed'
    },
    {
        id: 'TXN-009',
        date: '31/10/2025 08:50',
        customer: 'Cliente 9',
        items: 6,
        amount: 78000,
        method: 'Transferencia',
        status: 'completed'
    },
    {
        id: 'TXN-010',
        date: '31/10/2025 08:20',
        customer: 'Cliente 10',
        items: 1,
        amount: 15000,
        method: 'Tarjeta de Débito',
        status: 'completed'
    }
];

// Alertas de inventario
export const mockInventoryAlerts = {
    lowStock: [
        {
            id: 1,
            name: 'Producto X',
            sku: 'PRD-001',
            currentStock: 5,
            minStock: 20,
            category: 'Categoría A',
            level: 'critical'
        },
        {
            id: 2,
            name: 'Producto Y',
            sku: 'PRD-002',
            currentStock: 12,
            minStock: 30,
            category: 'Categoría B',
            level: 'warning'
        },
        {
            id: 3,
            name: 'Producto Z',
            sku: 'PRD-003',
            currentStock: 8,
            minStock: 25,
            category: 'Categoría C',
            level: 'critical'
        }
    ],
    expiringSoon: [
        {
            id: 4,
            name: 'Producto W',
            sku: 'PRD-004',
            expiryDate: '2025-11-05',
            daysUntilExpiry: 5,
            currentStock: 25,
            category: 'Categoría A',
            level: 'critical'
        },
        {
            id: 5,
            name: 'Producto V',
            sku: 'PRD-005',
            expiryDate: '2025-11-15',
            daysUntilExpiry: 15,
            currentStock: 40,
            category: 'Categoría B',
            level: 'warning'
        }
    ]
};

// Función para simular delay de API
export const mockApiDelay = (ms = 800) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Servicio mock para obtener datos del dashboard
export const mockDashboardService = {
    getStats: async () => {
        await mockApiDelay();
        return mockStats;
    },
    
    getSalesChart: async (days = 7) => {
        await mockApiDelay();
        return mockSalesChartData.slice(-days);
    },
    
    getTopProducts: async (limit = 5) => {
        await mockApiDelay();
        return mockTopProductsData.slice(0, limit);
    },
    
    getPaymentMethods: async () => {
        await mockApiDelay();
        return mockPaymentMethodsData;
    },
    
    getRecentTransactions: async (limit = 10) => {
        await mockApiDelay();
        return mockRecentTransactions.slice(0, limit);
    },
    
    getInventoryAlerts: async () => {
        await mockApiDelay();
        return mockInventoryAlerts;
    }
};

export default mockDashboardService;
