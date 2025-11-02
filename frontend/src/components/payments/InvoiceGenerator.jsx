import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { formatCurrency, formatDateTime } from "../../utils/formatters";

// Este componente escucha un evento global 'generate-invoice'
// y permite descargar un PDF de la transacción recibida.
const InvoiceGenerator = () => {
  const [lastTxn, setLastTxn] = useState(null);

  useEffect(() => {
    const handler = (e) => setLastTxn(e.detail);
    window.addEventListener("generate-invoice", handler);
    return () => window.removeEventListener("generate-invoice", handler);
  }, []);

  const generate = async (txn) => {
    if (!txn) return;
    const { jsPDF } = await import("jspdf");
    await import("jspdf-autotable");
    const doc = new jsPDF();
    // Header
    doc.setFontSize(16);
    doc.text("Comprobante de Venta", 14, 18);
    doc.setFontSize(10);
    doc.text(`ID: ${txn.id}`, 14, 24);
    doc.text(`Fecha: ${formatDateTime(txn.date)}`, 14, 30);
    doc.text(`Cliente: ${txn.customer}`, 14, 36);

    // Items
    const rows = txn.items.map((it) => [
      it.name,
      it.qty,
      formatCurrency(it.price),
      formatCurrency(it.qty * it.price),
    ]);
    // @ts-ignore
    doc.autoTable({
      head: [["Producto", "Cant.", "Precio", "Subtotal"]],
      body: rows,
      startY: 44,
      styles: { fontSize: 10 },
    });

    // Totales y métodos de pago
    let y = doc.lastAutoTable?.finalY || 60;
    doc.setFontSize(12);
    doc.text(`Total: ${formatCurrency(txn.amount)}`, 14, y + 10);
    doc.setFontSize(10);
    doc.text("Métodos de pago:", 14, y + 16);
    txn.methods.forEach((m, i) =>
      doc.text(`- ${m.type}: ${formatCurrency(m.amount)}`, 18, y + 22 + i * 6),
    );

    doc.save(`Comprobante_${txn.id}.pdf`);
  };

  return (
    <div className="mt-4">
      {lastTxn && (
        <Button onClick={() => generate(lastTxn)}>
          Descargar último comprobante
        </Button>
      )}
    </div>
  );
};

export default InvoiceGenerator;
