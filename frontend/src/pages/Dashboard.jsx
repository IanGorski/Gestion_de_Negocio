import React, { useState, useEffect, lazy, Suspense } from 'react';
import { FiDollarSign, FiShoppingCart, FiPackage, FiTrendingUp } from 'react-icons/fi';
import StatsCard from '../components/dashboard/StatsCard';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import InventoryAlerts from '../components/dashboard/InventoryAlerts';
import Skeleton from '../components/common/Skeleton';
import mockDashboardService from '../services/mockData';

// Lazy load para optimizar bundle inicial
const SalesChart = lazy(() => import('../components/dashboard/SalesChart'));

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [salesData, setSalesData] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [alerts, setAlerts] = useState({ lowStock: [], expiringSoon: [] });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            // Cargar todos los datos en paralelo
            const [statsData, salesChartData, transactionsData, alertsData] = await Promise.all([
                mockDashboardService.getStats(),
                mockDashboardService.getSalesChart(),
                mockDashboardService.getRecentTransactions(),
                mockDashboardService.getInventoryAlerts()
            ]);

            setStats(statsData);
            setSalesData(salesChartData);
            setTransactions(transactionsData);
            setAlerts(alertsData);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewTransactionDetails = (transaction) => {
        console.log('Ver detalles de:', transaction);
        // Aquí se implementaría la lógica para abrir un modal con detalles
    };

    if (loading) {
        return (
            <div className="p-6 space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
                </div>
                <Skeleton className="h-80 w-full" />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Ventas del Día"
                    value={stats.salesToday.value}
                    change={stats.salesToday.change}
                    trend={stats.salesToday.trend}
                    icon={FiDollarSign}
                    type="currency"
                />
                <StatsCard
                    title="Ingresos Totales"
                    value={stats.totalRevenue.value}
                    change={stats.totalRevenue.change}
                    trend={stats.totalRevenue.trend}
                    icon={FiTrendingUp}
                    type="currency"
                />
                <StatsCard
                    title="Stock Bajo"
                    value={stats.lowStock.value}
                    change={stats.lowStock.change}
                    trend={stats.lowStock.trend}
                    icon={FiPackage}
                    type="number"
                />
                <StatsCard
                    title="Transacciones"
                    value={stats.transactions.value}
                    change={stats.transactions.change}
                    trend={stats.transactions.trend}
                    icon={FiShoppingCart}
                    type="number"
                />
            </div>

            {/* Sales Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Suspense fallback={<Skeleton className="h-80 w-full rounded-lg" />}>
                        <SalesChart data={salesData} />
                    </Suspense>
                </div>

                {/* Inventory Alerts */}
                <div className="lg:col-span-1">
                    <InventoryAlerts alerts={alerts} />
                </div>
            </div>

            {/* Recent Transactions */}
            <div>
                <RecentTransactions 
                    transactions={transactions}
                    onViewDetails={handleViewTransactionDetails}
                />
            </div>
        </div>
    );
};

export default Dashboard;