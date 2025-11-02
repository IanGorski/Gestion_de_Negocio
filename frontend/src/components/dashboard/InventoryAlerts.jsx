import React, { useState } from "react";
import { FiAlertTriangle, FiClock, FiArrowRight } from "react-icons/fi";

const InventoryAlerts = ({ alerts }) => {
    const [activeTab, setActiveTab] = useState("lowStock");

    const getLevelColor = (level) => {
        return level === "critical"
            ? "text-red-600 bg-red-100"
            : "text-yellow-600 bg-yellow-100";
    };

    const getLevelIcon = (level) => {
        return level === "critical" ? "border-red-500" : "border-yellow-500";
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                    Alertas de Inventario
                </h2>
                <button className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Ver todas
                    <FiArrowRight className="ml-1" size={16} />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("lowStock")}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === "lowStock"
                            ? "text-blue-600"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                >
                    Stock Bajo
                    {alerts.lowStock.length > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                            {alerts.lowStock.length}
                        </span>
                    )}
                    {activeTab === "lowStock" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("expiring")}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === "expiring"
                            ? "text-blue-600"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                >
                    Por Vencer
                    {alerts.expiringSoon.length > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500 text-white rounded-full">
                            {alerts.expiringSoon.length}
                        </span>
                    )}
                    {activeTab === "expiring" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="space-y-3">
                {activeTab === "lowStock" && (
                    <>
                        {alerts.lowStock.length > 0 ? (
                            alerts.lowStock.map((product) => (
                                <div
                                    key={product.id}
                                    className={`p-4 rounded-lg border-l-4 ${getLevelIcon(product.level)} bg-gray-50`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <FiAlertTriangle
                                                className={getLevelColor(product.level)}
                                                size={20}
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">
                                                    {product.name}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    SKU: {product.sku}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Stock actual:{" "}
                                                    <span className="font-semibold">
                                                        {product.currentStock}
                                                    </span>{" "}
                                                    / Mínimo:{" "}
                                                    <span className="font-semibold">
                                                        {product.minStock}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(product.level)}`}
                                        >
                                            {product.level === "critical" ? "Crítico" : "Advertencia"}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No hay alertas de stock bajo</p>
                            </div>
                        )}
                    </>
                )}

                {activeTab === "expiring" && (
                    <>
                        {alerts.expiringSoon.length > 0 ? (
                            alerts.expiringSoon.map((product) => (
                                <div
                                    key={product.id}
                                    className={`p-4 rounded-lg border-l-4 ${getLevelIcon(product.level)} bg-gray-50`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <FiClock
                                                className={getLevelColor(product.level)}
                                                size={20}
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">
                                                    {product.name}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    SKU: {product.sku}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Vence:{" "}
                                                    <span className="font-semibold">
                                                        {product.expiryDate}
                                                    </span>{" "}
                                                    ({product.daysUntilExpiry} días restantes)
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Stock:{" "}
                                                    <span className="font-semibold">
                                                        {product.currentStock}
                                                    </span>{" "}
                                                    unidades
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(product.level)}`}
                                        >
                                            {product.daysUntilExpiry <= 7 ? "Urgente" : "Próximo"}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">
                                    No hay productos próximos a vencer
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default InventoryAlerts;
