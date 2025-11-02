import { subDays, format } from 'date-fns';

const generateSalesData = (days) => {
  const sales = [];
  for (let i = 0; i < days; i++) {
    const date = subDays(new Date(), i);
    sales.push({
      date: format(date, 'yyyy-MM-dd'),
      ventas: Math.floor(Math.random() * 5000) + 1000,
      transacciones: Math.floor(Math.random() * 80) + 20,
    });
  }
  return sales.reverse();
};

const topProductsData = [
  { id: 1, nombre: 'Laptop Pro', cantidad: 150, ingresos: 180000 },
  { id: 2, nombre: 'Mouse Gamer', cantidad: 300, ingresos: 15000 },
  { id: 3, nombre: 'Teclado Mecánico', cantidad: 200, ingresos: 26000 },
  { id: 4, nombre: 'Monitor 4K', cantidad: 120, ingresos: 48000 },
  { id: 5, nombre: 'Silla Ergonómica', cantidad: 80, ingresos: 24000 },
];

const salesByCategoryData = [
  { categoria: 'Electrónica', ventas: 250000 },
  { categoria: 'Accesorios', ventas: 80000 },
  { categoria: 'Oficina', ventas: 50000 },
];

const paymentMethodsData = [
  { metodo: 'Tarjeta de Crédito', valor: 45 },
  { metodo: 'Efectivo', valor: 25 },
  { metodo: 'Transferencia', valor: 20 },
  { metodo: 'Billetera Digital', valor: 10 },
];

// =============================================================================
// Funciones del Servicio
// =============================================================================

/**
 * Simula la obtención de un reporte de ventas.
 * @param {Date} startDate - Fecha de inicio.
 * @param {Date} endDate - Fecha de fin.
 * @returns {Promise<Object>} - Datos del reporte de ventas.
 */
export const getSalesReport = async (startDate, endDate) => {
  console.log(`Fetching sales report from ${startDate} to ${endDate}`);
  // En una aplicación real, aquí se haría una llamada a la API.
  const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  const salesData = generateSalesData(Math.max(1, Math.round(days)));

  const totalVentas = salesData.reduce((sum, item) => sum + item.ventas, 0);
  const totalTransacciones = salesData.reduce((sum, item) => sum + item.transacciones, 0);

  await new Promise(resolve => setTimeout(resolve, 500)); // Simular latencia

  return {
    salesOverTime: salesData,
    salesByCategory: salesByCategoryData,
    paymentMethods: paymentMethodsData,
    summary: {
      totalVentas,
      totalTransacciones,
      ticketPromedio: totalVentas / totalTransacciones,
    },
  };
};

/**
 * Simula la obtención de un reporte de productos.
 * @returns {Promise<Object>} - Datos del reporte de productos.
 */
export const getProductsReport = async () => {
  console.log('Fetching products report');
  await new Promise(resolve => setTimeout(resolve, 500)); // Simular latencia
  return {
    topSelling: topProductsData.sort((a, b) => b.cantidad - a.cantidad),
    topRevenue: topProductsData.sort((a, b) => b.ingresos - a.ingresos),
  };
};