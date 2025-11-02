import React, { useMemo, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";

const SalesChart = ({ data }) => {
    const [timeRange, setTimeRange] = useState("7d");

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const salesValue = payload[0]?.value ?? "N/A";
            const ordersValue = payload[1]?.value ?? "N/A";

            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-800 mb-2">{label}</p>
                    <p className="text-sm text-blue-600">
                        Ventas:{" "}
                        <span className="font-bold">{formatCurrency(salesValue)}</span>
                    </p>
                    <p className="text-sm text-green-600">
                        Pedidos: <span className="font-bold">{ordersValue}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    // Preparar datos con línea de promedio estable para evitar dataKeys inexistentes
    const chartData = useMemo(() => {
        if (!Array.isArray(data) || data.length === 0) return [];
        const avg = Math.round(
            data.reduce((acc, d) => acc + (Number(d.sales) || 0), 0) / data.length
        );
        return data.map((d) => ({ ...d, average: avg }));
    }, [data]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Ventas Diarias</h2>

                {/* Selector rango de tiempo */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setTimeRange("7d")}
                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${timeRange === "7d"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        7 días
                    </button>
                    <button
                        onClick={() => setTimeRange("30d")}
                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${timeRange === "30d"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        30 días
                    </button>
                </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="date"
                        stroke="#6b7280"
                        style={{ fontSize: "12px" }}
                        interval={5} // Mostrar etiquetas en intervalos más amplios
                    />
                    <YAxis
                        stroke="#6b7280"
                        style={{ fontSize: "12px" }}
                        tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: "14px" }} iconType="line" />
                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Ventas"
                    />
                    <Line
                        type="linear"
                        dataKey="average" 
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Promedio"
                        dot={false} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;
