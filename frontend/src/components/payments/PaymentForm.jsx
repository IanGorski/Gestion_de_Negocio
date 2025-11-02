import React, { useEffect, useMemo, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { formatCurrency } from "../../utils/formatters";
import mockInventoryService from "../../services/mockInventory";
import mockPaymentsService from "../../services/mockPayments";
import "./PaymentForm.css";

const PaymentForm = ({ onCreated }) => {
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0); // porcentaje
  const [methods, setMethods] = useState([{ type: "Efectivo", amount: 0 }]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({ productId: "", qty: 1, price: 0 });

  useEffect(() => {
    const load = async () => {
      const list = await mockInventoryService.list();
      setProducts(list);
      if (list.length)
        setNewItem({ productId: list[0].id, qty: 1, price: list[0].price });
    };
    load();
  }, []);

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.qty * it.price, 0),
    [items],
  );
  const total = useMemo(
    () => Math.max(0, Math.round(subtotal * (1 - (discount || 0) / 100))),
    [subtotal, discount],
  );
  const paid = useMemo(
    () => methods.reduce((acc, m) => acc + Number(m.amount || 0), 0),
    [methods],
  );
  const balance = useMemo(() => total - paid, [total, paid]);

  const updateNewItemFromProduct = (productId) => {
    const p = products.find((x) => x.id === productId);
    setNewItem((ni) => ({ ...ni, productId, price: p ? p.price : 0 }));
  };

  const addItem = () => {
    const p = products.find((x) => x.id === newItem.productId);
    if (!p) return;
    setItems((prev) => [
      ...prev,
      {
        productId: p.id,
        name: p.name,
        price: Number(newItem.price),
        qty: Number(newItem.qty),
      },
    ]);
    setShowAddItem(false);
  };

  const removeItem = (idx) =>
    setItems((prev) => prev.filter((_, i) => i !== idx));
  const updateQty = (idx, qty) =>
    setItems((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, qty: Number(qty) } : it)),
    );

  const addMethod = () =>
    setMethods((m) => [...m, { type: "Efectivo", amount: 0 }]);
  const removeMethod = (idx) =>
    setMethods((m) => m.filter((_, i) => i !== idx));
  const updateMethod = (idx, field, value) =>
    setMethods((m) =>
      m.map((x, i) =>
        i === idx
          ? { ...x, [field]: field === "amount" ? Number(value) : value }
          : x,
      ),
    );

  const canSubmit =
    items.length > 0 && customer.trim().length > 0 && balance === 0;

  const submit = async () => {
    if (!canSubmit) return;
    const amount = total;
    const txn = {
      customer,
      items,
      amount,
      methods,
      status: "completed",
    };
    const saved = await mockPaymentsService.create(txn);
    setCustomer("");
    setItems([]);
    setDiscount(0);
    setMethods([{ type: "Efectivo", amount: 0 }]);
    onCreated && onCreated(saved);
  };

  return (
    <div className="payment-form-main">
      <div className="payment-form-header">
        <div>
          <h2 className="payment-form-title">Registro de Venta</h2>
          <p className="payment-form-subtitle">
            Registra tus ventas y cobra al cliente
          </p>
        </div>
      </div>

      <div className="payment-form-container">
        {/* Formulario */}
        <div className="payment-form-left">
          {/* Customer & Discount */}
          <div className="payment-form-section">
            <h3 className="form-section-title">Información General</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customer" className="form-label">
                  Cliente
                </label>
                <div className="input-with-icon">
                  <svg
                    className="input-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <input
                    id="customer"
                    type="text"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="Nombre del cliente"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="discount" className="form-label">
                  Descuento (%)
                </label>
                <div className="input-with-icon">
                  <svg
                    className="input-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6m0-6l-6 6M9 9h12a2 2 0 012 2v10a2 2 0 01-2 2H9m0 0a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                  <input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="input-field"
                    placeholder="0%"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowAddItem(true)}
              variant="primary"
              className="add-product-btn"
            >
              + Agregar Producto
            </Button>
          </div>

          {/* Items Table */}
          {items.length > 0 && (
            <div className="payment-form-section">
              <h3 className="form-section-title">Productos ({items.length})</h3>

              <div className="items-table-wrapper">
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, idx) => (
                      <tr key={idx} className="items-table-row">
                        <td className="item-name">{it.name}</td>
                        <td className="item-price">
                          {formatCurrency(it.price)}
                        </td>
                        <td className="item-qty">
                          <input
                            type="number"
                            min="1"
                            value={it.qty}
                            onChange={(e) => updateQty(idx, e.target.value)}
                            className="qty-input"
                          />
                        </td>
                        <td className="item-subtotal">
                          {formatCurrency(it.qty * it.price)}
                        </td>
                        <td className="item-action">
                          <button
                            onClick={() => removeItem(idx)}
                            className="remove-btn"
                            title="Eliminar producto"
                            aria-label={`Eliminar ${it.name}`}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payment Methods */}
          <div className="payment-form-section">
            <div className="section-header">
              <h3 className="form-section-title">Métodos de Pago</h3>
              <Button
                onClick={addMethod}
                variant="ghost"
                className="add-method-btn"
              >
                + Agregar
              </Button>
            </div>

            <div className="methods-list">
              {methods.map((m, idx) => (
                <div key={idx} className="method-row">
                  <select
                    value={m.type}
                    onChange={(e) => updateMethod(idx, "type", e.target.value)}
                    className="input-field method-type"
                  >
                    <option>Efectivo</option>
                    <option>Tarjeta de Crédito</option>
                    <option>Tarjeta de Débito</option>
                    <option>Transferencia</option>
                    <option>Billetera Digital</option>
                  </select>
                  <input
                    type="number"
                    min="0"
                    value={m.amount}
                    onChange={(e) =>
                      updateMethod(idx, "amount", e.target.value)
                    }
                    className="input-field method-amount"
                    placeholder="0.00"
                  />
                  <button
                    onClick={() => removeMethod(idx)}
                    className="remove-method-btn"
                    title="Eliminar método"
                    aria-label={`Eliminar ${m.type}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen Sticky */}
        <div className="payment-summary-sticky">
          <h3 className="summary-title">Resumen</h3>

          <div className="summary-line">
            <span>Subtotal</span>
            <span className="summary-value">{formatCurrency(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className="summary-line discount-line">
              <span>Descuento {discount}%</span>
              <span className="summary-value discount-value">
                -{formatCurrency(subtotal * (discount / 100))}
              </span>
            </div>
          )}

          <div className="summary-divider"></div>

          <div className="summary-line total-line">
            <span>Total a Cobrar</span>
            <span className="summary-value total-value">
              {formatCurrency(total)}
            </span>
          </div>

          <div className="summary-divider"></div>

          <div className="balance-section">
            <h4 className="balance-title">Balance</h4>
            <div
              className={`balance-amount ${balance === 0 ? "balance-zero" : balance > 0 ? "balance-positive" : "balance-negative"}`}
            >
              {balance === 0
                ? "✓ Pagado"
                : balance > 0
                  ? `+${formatCurrency(balance)} Falta`
                  : `${formatCurrency(balance)} Cambio`}
            </div>
          </div>

          <Button
            onClick={submit}
            disabled={!canSubmit}
            variant={canSubmit ? "primary" : "ghost"}
            className="submit-btn"
          >
            {canSubmit ? "✓ Registrar Venta" : "Completa los datos"}
          </Button>
        </div>
      </div>

      {/* Modal agregar item */}
      <Modal isOpen={showAddItem} onClose={() => setShowAddItem(false)}>
        <h3 className="modal-title">Agregar Producto</h3>
        <div className="modal-form-group">
          <div className="form-group">
            <label className="form-label">Producto</label>
            <select
              value={newItem.productId}
              onChange={(e) => updateNewItemFromProduct(e.target.value)}
              className="input-field"
            >
              <option value="">Selecciona un producto</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.sku})
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Precio</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem((ni) => ({ ...ni, price: Number(e.target.value) }))
                }
                className="input-field"
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Cantidad</label>
              <input
                type="number"
                min="1"
                value={newItem.qty}
                onChange={(e) =>
                  setNewItem((ni) => ({ ...ni, qty: Number(e.target.value) }))
                }
                className="input-field"
                placeholder="1"
              />
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <Button variant="ghost" onClick={() => setShowAddItem(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={addItem}>
            Agregar
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentForm;
