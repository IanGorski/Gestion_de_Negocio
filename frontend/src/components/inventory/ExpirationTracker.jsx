import React, { useEffect, useState } from "react";
import "./ExpirationTracker.css";
import mockInventoryService from "../../services/mockInventory";

const ExpirationTracker = () => {
  const [days, setDays] = useState(30);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async (d) => {
    setLoading(true);
    const list = await mockInventoryService.expiring(d);
    setItems(list);
    setLoading(false);
  };

  useEffect(() => {
    load(days);
  }, [days]);

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (daysLeft) => {
    if (daysLeft < 0) return "expired";
    if (daysLeft <= 3) return "critical";
    if (daysLeft <= 7) return "warning";
    return "caution";
  };

  const getStatusColor = (status) => {
    const colors = {
      expired: { bg: "#fee2e2", text: "#991b1b", border: "#dc2626" },
      critical: { bg: "#fef3c7", text: "#92400e", border: "#f59e0b" },
      warning: { bg: "#dbeafe", text: "#1e40af", border: "#0284c7" },
      caution: { bg: "#e0f2fe", text: "#075985", border: "#0ea5e9" },
    };
    return colors[status] || colors.caution;
  };

  if (loading) {
    return (
      <div className="expiration-tracker-container">
        <div className="loading-skeleton"></div>
      </div>
    );
  }

  return (
    <div className="expiration-tracker-container">
      <div className="tracker-header">
        <h2 className="tracker-title">⏰ Productos Próximos a Vencer</h2>
        <select
          className="days-selector"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        >
          <option value={7}>7 días</option>
          <option value={15}>15 días</option>
          <option value={30}>30 días</option>
          <option value={60}>60 días</option>
        </select>
      </div>

      {items.length === 0 ? (
        <div className="empty-state-tracker">
          <div className="empty-icon-tracker">🎉</div>
          <p className="empty-text-tracker">Sin productos próximos a vencer</p>
          <p className="empty-subtext-tracker">
            Todos los productos tienen fechas de vencimiento adecuadas
          </p>
        </div>
      ) : (
        <div className="tracker-timeline">
          {items.map((product, index) => {
            const daysLeft = getDaysUntilExpiry(product.expiryDate);
            const status = getExpiryStatus(daysLeft);
            const colors = getStatusColor(status);
            const expiryDate = new Date(product.expiryDate);
            const progressPercent = Math.max(
              0,
              Math.min(100, ((days - daysLeft) / days) * 100),
            );

            return (
              <div
                key={product.id}
                className="timeline-item"
                style={{ "--item-color": colors.border }}
              >
                {/* Conectores */}
                {index < items.length - 1 && (
                  <div className="timeline-connector"></div>
                )}

                {/* Punto de la línea */}
                <div
                  className={`timeline-dot timeline-dot--${status}`}
                  style={{ backgroundColor: colors.border }}
                ></div>

                {/* Contenido */}
                <div className="timeline-content">
                  <div
                    className="content-card"
                    style={{ borderLeftColor: colors.border }}
                  >
                    <div className="content-header">
                      <div className="product-info-expiry">
                        <h3 className="product-name-expiry">{product.name}</h3>
                        <p className="product-sku-expiry">SKU: {product.sku}</p>
                      </div>
                      <div
                        className="status-badge"
                        style={{ ...colors, color: colors.text }}
                      >
                        <span className="status-label">
                          {daysLeft < 0 ? "❌ VENCIDO" : `${daysLeft} días`}
                        </span>
                      </div>
                    </div>

                    <div className="content-details">
                      <div className="detail-item">
                        <span className="detail-icon">📅</span>
                        <span className="detail-text">
                          Vence: {expiryDate.toLocaleDateString("es-ES")}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">📦</span>
                        <span className="detail-text">
                          Stock: {product.stock} unidades
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="progress-container">
                      <div className="progress-background">
                        <div
                          className={`progress-bar progress-bar--${status}`}
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      <span className="progress-label">
                        {Math.round(progressPercent)}%
                      </span>
                    </div>

                    <div className="content-actions">
                      <button className="action-button action-view">
                        👁️ Ver
                      </button>
                      <button className="action-button action-edit">
                        ✏️ Editar
                      </button>
                      <button className="action-button action-dispose">
                        🗑️ Descartar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExpirationTracker;
