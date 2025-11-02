import React from "react";
import { formatCurrency, formatDateTime } from "../../utils/formatters";
import "./TransactionRow.css";

const TransactionRow = ({ transaction, onView }) => {
  const isSuccess = transaction.status === "completed";
  const isPending = transaction.status === "pending";

  const getStatusBadgeClass = () => {
    if (isSuccess) return "status-badge-success";
    if (isPending) return "status-badge-pending";
    return "status-badge-canceled";
  };

  const getStatusLabel = () => {
    if (isSuccess) return "Completada";
    if (isPending) return "Pendiente";
    return "Cancelada";
  };

  return (
    <tr className="transaction-row">
      <td className="transaction-cell transaction-id">{transaction.id}</td>
      <td className="transaction-cell">{formatDateTime(transaction.date)}</td>
      <td className="transaction-cell">{transaction.customer}</td>
      <td className="transaction-cell transaction-items">
        {transaction.items.length} item
        {transaction.items.length !== 1 ? "s" : ""}
      </td>
      <td className="transaction-cell transaction-amount">
        {formatCurrency(transaction.amount)}
      </td>
      <td className="transaction-cell">
        <span className={`status-badge ${getStatusBadgeClass()}`}>
          {getStatusLabel()}
        </span>
      </td>
      <td className="transaction-cell transaction-action">
        <button
          onClick={() => onView(transaction)}
          className="action-btn action-view"
          title="Ver detalles"
          aria-label={`Ver detalles de transacción ${transaction.id}`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default TransactionRow;
