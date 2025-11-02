import React, { useEffect, useState } from "react";
import AlertBadge from "./AlertBadge";
import "./StockAlert.css";
import mockInventoryService from "../../services/mockInventory";

const StockAlert = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const list = await mockInventoryService.lowStock();
      if (mounted) setItems(list);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const getStockPercentage = (current, minimum) => {
    return Math.round((current / minimum) * 100);
  };

  const getAlertType = (current, minimum) => {
    const percentage = getStockPercentage(current, minimum);
    if (percentage <= 25) return "danger";
    if (percentage <= 50) return "warning";
    return "info";
  };

  if (loading) {
    return (
      <div className="stock-alert-container">
        <div className="loading-skeleton"></div>
      </div>
    );
  }

  return (
    <div className="stock-alert-container">
      <div className="stock-alert-header">
        <h2 className="stock-alert-title">🚨 Alertas de Stock Bajo</h2>
        <div className="alert-count-badge">{items.length}</div>
      </div>

      {items.length === 0 ? (
        <div className="empty-state-alert">
          <div className="empty-icon">✅</div>
          <p className="empty-text">
            Todos los productos tienen stock adecuado
          </p>
          <p className="empty-subtext">No hay alertas en este momento</p>
        </div>
      ) : (
        <div className="alerts-list">
          {items.map((product) => {
            const alertType = getAlertType(product.stock, product.minStock);
            const percentage = getStockPercentage(
              product.stock,
              product.minStock,
            );

            return (
              <div
                key={product.id}
                className={`alert-item alert-item--${alertType}`}
              >
                <div className="alert-item-header">
                  <div className="alert-item-product">
                    <div className="product-icon-small">
                      {product.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="alert-item-info">
                      <p className="alert-item-name">{product.name}</p>
                      <p className="alert-item-sku">SKU: {product.sku}</p>
                    </div>
                  </div>
                  <AlertBadge
                    type={alertType}
                    text={`${percentage}% del mínimo`}
                    icon={
                      alertType === "danger"
                        ? "🔴"
                        : alertType === "warning"
                          ? "🟡"
                          : "🔵"
                    }
                    size="sm"
                  />
                </div>

                <div className="alert-item-details">
                  <div className="detail-row">
                    <span className="detail-label">Stock actual:</span>
                    <span className="detail-value">
                      {product.stock} unidades
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Stock mínimo:</span>
                    <span className="detail-value">
                      {product.minStock} unidades
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Diferencia:</span>
                    <span className="detail-value deficit">
                      {product.minStock - product.stock} unidades
                    </span>
                  </div>
                </div>

                <div className="stock-progress-bar">
                  <div
                    className={`progress-fill progress-fill--${alertType}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>

                <div className="alert-actions">
                  <button className="alert-action-btn">📦 Reponer stock</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StockAlert;
