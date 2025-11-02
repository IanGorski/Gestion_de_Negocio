import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Button from "../common/Button";
import Modal from "../common/Modal";
import ProductForm from "./ProductForm";
import "./ProductList.css";
import mockInventoryService from "../../services/mockInventory";

const ProductList = () => {
  const [filters, setFilters] = useState({
    q: "",
    category: "all",
    stockLevel: "all",
    orderBy: "name:asc",
  });
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid, table
  const [selectedIds, setSelectedIds] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const list = await mockInventoryService.list(filters);
    setData(list);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const list = await mockInventoryService.list(filters);
      if (mounted) setData(list);
    })();
    return () => {
      mounted = false;
    };
  }, [filters]);

  useEffect(() => {
    const handler = () => {
      mockInventoryService.list(filters).then((list) => setData(list));
    };
    window.addEventListener("refresh-products", handler);
    return () => window.removeEventListener("refresh-products", handler);
  }, [filters]);

  const toggleAll = (checked) =>
    setSelectedIds(checked ? data.map((p) => p.id) : []);
  const toggle = (id) =>
    setSelectedIds((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );

  const remove = async (id) => {
    if (window.confirm("¿Eliminar este producto?")) {
      await mockInventoryService.remove(id);
      load();
    }
  };

  const bulkPriceUp = async () => {
    const percent = Number(prompt("Porcentaje a incrementar (%):", "10"));
    if (!isNaN(percent)) {
      await mockInventoryService.bulkUpdatePrice(selectedIds, percent);
      load();
      setSelectedIds([]);
    }
  };

  const saveEdit = async () => {
    if (!editing) return;
    await mockInventoryService.update(editing.id, editing);
    setEditing(null);
    load();
  };

  return (
    <div className="product-list-container">
      {/* Header y Filtros */}
      <div className="product-list-header">
        <div className="header-top">
          <h2 className="header-title">📦 Gestión de Productos</h2>
          <div className="view-mode-selector">
            <button
              className={`view-mode-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Vista de grid"
            >
              ⊞ Grid
            </button>
            <button
              className={`view-mode-btn ${viewMode === "table" ? "active" : ""}`}
              onClick={() => setViewMode("table")}
              title="Vista de tabla"
            >
              ≡ Tabla
            </button>
          </div>
        </div>

        {/* Controles de filtrado */}
        <div className="filters-grid">
          <input
            className="filter-input"
            placeholder="🔍 Buscar nombre/SKU..."
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
          />
          <select
            className="filter-select"
            value={filters.category}
            onChange={(e) =>
              setFilters((f) => ({ ...f, category: e.target.value }))
            }
          >
            <option value="all">Todas las categorías</option>
            <option value="A">Categoría A</option>
            <option value="B">Categoría B</option>
            <option value="C">Categoría C</option>
          </select>
          <select
            className="filter-select"
            value={filters.stockLevel}
            onChange={(e) =>
              setFilters((f) => ({ ...f, stockLevel: e.target.value }))
            }
          >
            <option value="all">Stock (todos)</option>
            <option value="low">🔴 Bajo</option>
            <option value="medium">🟡 Medio</option>
            <option value="high">🟢 Alto</option>
          </select>
          <select
            className="filter-select"
            value={filters.orderBy}
            onChange={(e) =>
              setFilters((f) => ({ ...f, orderBy: e.target.value }))
            }
          >
            <option value="name:asc">Nombre (A-Z)</option>
            <option value="name:desc">Nombre (Z-A)</option>
            <option value="price:asc">Precio (menor)</option>
            <option value="price:desc">Precio (mayor)</option>
            <option value="stock:asc">Stock (menor)</option>
            <option value="stock:desc">Stock (mayor)</option>
          </select>
          <Button
            onClick={bulkPriceUp}
            disabled={selectedIds.length === 0}
            variant={selectedIds.length > 0 ? "primary" : "disabled"}
          >
            💰 Actualizar precios ({selectedIds.length})
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="product-stats">
        <div className="stat-item">
          <span className="stat-label">Total de productos:</span>
          <span className="stat-value">{data.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Seleccionados:</span>
          <span className="stat-value">{selectedIds.length}</span>
        </div>
      </div>

      {/* Vista Grid */}
      {viewMode === "grid" && (
        <div className="products-grid">
          {data.length > 0 ? (
            data.map((product) => (
              <div key={product.id} className="product-grid-item">
                <ProductCard
                  product={product}
                  onView={() => setEditing(product)}
                  onEdit={() => setEditing(product)}
                  onDelete={() => remove(product.id)}
                />
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>📭 No hay productos que coincidan con los filtros</p>
            </div>
          )}
        </div>
      )}

      {/* Vista Tabla */}
      {viewMode === "table" && (
        <div className="table-view-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th className="table-checkbox">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === data.length && data.length > 0
                    }
                    onChange={(e) => toggleAll(e.target.checked)}
                  />
                </th>
                <th>SKU</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Mínimo</th>
                <th>Vence</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr
                  key={product.id}
                  className={selectedIds.includes(product.id) ? "selected" : ""}
                >
                  <td className="table-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(product.id)}
                      onChange={() => toggle(product.id)}
                    />
                  </td>
                  <td>{product.sku}</td>
                  <td className="table-product-name">{product.name}</td>
                  <td>{product.category}</td>
                  <td className="table-price">${product.price.toFixed(2)}</td>
                  <td className="table-stock">{product.stock}</td>
                  <td>{product.minStock}</td>
                  <td className="table-expiry">
                    {product.expiryDate
                      ? new Date(product.expiryDate).toLocaleDateString("es-ES")
                      : "-"}
                  </td>
                  <td className="table-actions">
                    <button
                      className="action-link"
                      onClick={() => setEditing(product)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="action-link danger"
                      onClick={() => remove(product.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de edición */}
      <Modal isOpen={!!editing} onClose={() => setEditing(null)}>
        {editing && (
          <ProductForm
            product={editing}
            onSave={saveEdit}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default ProductList;
