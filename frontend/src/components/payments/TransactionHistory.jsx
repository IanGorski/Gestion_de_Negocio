import React, { useEffect, useMemo, useState } from "react";
import { formatCurrency, formatDateTime } from "../../utils/formatters";
import Button from "../common/Button";
import Modal from "../common/Modal";
import TransactionRow from "./TransactionRow";
import mockPaymentsService from "../../services/mockPayments";
import "./TransactionHistory.css";

const PAGE_SIZE = 10;

const TransactionHistory = () => {
  const [filters, setFilters] = useState({ method: "all", status: "all" });
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const list = await mockPaymentsService.list(filters);
      if (mounted) {
        setData(list);
        setPage(1);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [filters]);

  useEffect(() => {
    const handler = () => {
      mockPaymentsService.list(filters).then((list) => {
        setData(list);
        setPage(1);
      });
    };
    window.addEventListener("refresh-transactions", handler);
    return () => window.removeEventListener("refresh-transactions", handler);
  }, [filters]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  return (
    <div className="transaction-history-container">
      <div className="transaction-history-header">
        <div>
          <h2 className="transaction-history-title">
            Historial de Transacciones
          </h2>
          <p className="transaction-history-subtitle">Últimas operaciones</p>
        </div>
      </div>

      <div className="transaction-filters">
        <div className="filter-row">
          <input
            className="input-field filter-input"
            type="date"
            value={filters.from || ""}
            onChange={(e) =>
              setFilters((f) => ({ ...f, from: e.target.value }))
            }
            placeholder="Desde"
          />
          <input
            className="input-field filter-input"
            type="date"
            value={filters.to || ""}
            onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
            placeholder="Hasta"
          />
          <input
            className="input-field filter-input"
            type="number"
            placeholder="Monto mín"
            value={filters.minAmount || ""}
            onChange={(e) =>
              setFilters((f) => ({ ...f, minAmount: e.target.value }))
            }
          />
          <input
            className="input-field filter-input"
            type="number"
            placeholder="Monto máx"
            value={filters.maxAmount || ""}
            onChange={(e) =>
              setFilters((f) => ({ ...f, maxAmount: e.target.value }))
            }
          />
        </div>
        <div className="filter-row">
          <select
            className="input-field filter-input"
            value={filters.method}
            onChange={(e) =>
              setFilters((f) => ({ ...f, method: e.target.value }))
            }
          >
            <option value="all">Método (todos)</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
            <option value="Tarjeta de Débito">Tarjeta de Débito</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Billetera Digital">Billetera Digital</option>
          </select>
          <select
            className="input-field filter-input"
            value={filters.status}
            onChange={(e) =>
              setFilters((f) => ({ ...f, status: e.target.value }))
            }
          >
            <option value="all">Estado (todos)</option>
            <option value="completed">Completada</option>
            <option value="pending">Pendiente</option>
            <option value="canceled">Cancelada</option>
          </select>
          <input
            className="input-field filter-input"
            placeholder="Buscar por ID"
            value={filters.q || ""}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
          />
        </div>
      </div>

      <div className="transaction-table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr className="table-header">
              <th>ID</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Items</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onView={setSelected}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="transaction-pagination">
        <div className="pagination-info">{data.length} resultados</div>
        <div className="pagination-controls">
          <Button
            className="pagination-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← Anterior
          </Button>
          <div className="pagination-indicator">
            Página {page} / {Math.max(1, Math.ceil(data.length / PAGE_SIZE))}
          </div>
          <Button
            className="pagination-btn"
            onClick={() =>
              setPage((p) =>
                Math.min(Math.ceil(data.length / PAGE_SIZE) || 1, p + 1),
              )
            }
            disabled={page >= Math.ceil(data.length / PAGE_SIZE)}
          >
            Siguiente →
          </Button>
        </div>
      </div>

      {/* Details modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="transaction-modal">
            <h3 className="modal-title">Transacción {selected.id}</h3>
            <p className="modal-subtitle">
              {formatDateTime(selected.date)} - {selected.customer}
            </p>

            <div className="modal-section">
              <h4 className="modal-section-title">Items</h4>
              <div className="modal-table-wrapper">
                <table className="modal-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.items.map((it, i) => (
                      <tr key={i}>
                        <td>{it.name}</td>
                        <td>{formatCurrency(it.price)}</td>
                        <td>{it.qty}</td>
                        <td>{formatCurrency(it.qty * it.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modal-section">
              <h4 className="modal-section-title">Métodos de pago</h4>
              <div className="payment-methods">
                {selected.methods.map((m, i) => (
                  <div key={i} className="payment-method-item">
                    <span>{m.type}</span>
                    <span className="method-amount">
                      {formatCurrency(m.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-total">
              <span>Total:</span>
              <span>{formatCurrency(selected.amount)}</span>
            </div>

            <div className="modal-actions">
              <Button
                variant="primary"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("generate-invoice", { detail: selected }),
                  )
                }
              >
                Generar comprobante
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TransactionHistory;
