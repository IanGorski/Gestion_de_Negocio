import React from "react";
import { formatCurrency } from "../../utils/formatters";
import "./ProductCard.css";

const ProductCard = ({ product, onEdit, onDelete, onView }) => {
  // Determinar estado de stock
  const isLowStock = product.stock <= product.minStock;
  const isOutOfStock = product.stock === 0;

  // Determinar alerta de vencimiento
  const expiryDate = product.expiryDate ? new Date(product.expiryDate) : null;
  const daysUntilExpiry = expiryDate
    ? Math.floor((expiryDate - new Date()) / (1000 * 60 * 60 * 24))
    : null;
  const isExpiringSoon =
    daysUntilExpiry && daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  const isExpired = daysUntilExpiry && daysUntilExpiry <= 0;

  const getStockBadgeClass = () => {
    if (isOutOfStock) return "stock-badge-danger";
    if (isLowStock) return "stock-badge-warning";
    return "stock-badge-success";
  };

  const getStockLabel = () => {
    if (isOutOfStock) return "Sin Stock";
    if (isLowStock) return "Bajo Stock";
    return "En Stock";
  };

  return (
    <div className="product-card">
      {/* Header con gradiente */}
      <div className="product-card-header">
        <div className="product-icon">{product.name[0]}</div>
        <div className="product-header-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-sku">SKU: {product.sku}</p>
        </div>
      </div>

      {/* Badges de estado */}
      <div className="product-badges">
        <span className={`stock-badge ${getStockBadgeClass()}`}>
          {getStockLabel()}
        </span>
        {isExpired && <span className="expiry-badge-expired">🔴 Vencido</span>}
        {isExpiringSoon && (
          <span className="expiry-badge-warning">⚠️ Vence pronto</span>
        )}
      </div>

      {/* Información principal */}
      <div className="product-info">
        <div className="info-row">
          <span className="info-label">Categoría</span>
          <span className="info-value">{product.category}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Precio</span>
          <span className="info-value price">
            {formatCurrency(product.price)}
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">Stock</span>
          <span className="info-value">
            {product.stock} / {product.minStock} mín
          </span>
        </div>
        {expiryDate && (
          <div className="info-row">
            <span className="info-label">Vence</span>
            <span className="info-value">
              {expiryDate.toLocaleDateString()}
              {daysUntilExpiry && ` (${daysUntilExpiry}d)`}
            </span>
          </div>
        )}
      </div>

      {/* Acciones */}
      <div className="product-actions">
        <button
          onClick={() => onView(product)}
          className="action-btn action-view"
          title="Ver detalles"
        >
          👁️
        </button>
        <button
          onClick={() => onEdit(product)}
          className="action-btn action-edit"
          title="Editar"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="action-btn action-delete"
          title="Eliminar"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
