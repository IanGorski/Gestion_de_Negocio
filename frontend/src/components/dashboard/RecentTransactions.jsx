import React from "react";
import { FiEye, FiArrowRight } from "react-icons/fi";
import { formatCurrency } from "../../utils/formatters";

const RecentTransactions = ({ transactions, onViewDetails }) => {
    const getStatusBadge = (status) => {
        const statusStyles = {
            completed: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            cancelled: "bg-red-100 text-red-800",
        };

        const statusLabels = {
            completed: "Completada",
            pending: "Pendiente",
            cancelled: "Cancelada",
        };

        return (
            <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}
            >
                {statusLabels[status]}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                    Transacciones Recientes
                </h2>
                <button className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Ver todas
                    <FiArrowRight className="ml-1" size={16} />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                                ID
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                                Fecha
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                                Cliente
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                                Items
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                                Monto
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                                Método
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                                Estado
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                    {transaction.id}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                    {transaction.date}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-900">
                                    {transaction.customer}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                    {transaction.items}
                                </td>
                                <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                                    {formatCurrency(transaction.amount)}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                    {transaction.method}
                                </td>
                                <td className="py-3 px-4">
                                    {getStatusBadge(transaction.status)}
                                </td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => onViewDetails && onViewDetails(transaction)}
                                        className="text-blue-600 hover:text-blue-700 transition-colors"
                                        title="Ver detalles"
                                    >
                                        <FiEye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty state */}
            {transactions.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No hay transacciones recientes</p>
                </div>
            )}
        </div>
    );
};

export default RecentTransactions;
