import React, { useState } from "react";
import Button from "../common/Button";
import { format } from "date-fns";

const ExportOptions = ({ data, reportType }) => {
  const [busy, setBusy] = useState(false);
  if (!data) return null;

  const handleExportCSV = async () => {
    try {
      setBusy(true);
      const Papa = (await import("papaparse")).default;
      let csvData, filename;

      if (reportType === "sales") {
        csvData = data.salesOverTime;
        filename = `reporte_ventas_${format(new Date(), "yyyy-MM-dd")}.csv`;
      } else {
        csvData = data.topSelling;
        filename = `reporte_productos_${format(new Date(), "yyyy-MM-dd")}.csv`;
      }

      const csv = Papa.unparse(csvData);
      const blob = new Blob(["\ufeff" + csv], {
        type: "text/csv;charset=utf-8;",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al exportar CSV:", error);
      alert("Error al exportar el archivo CSV");
    } finally {
      setBusy(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      setBusy(true);
      const { jsPDF } = await import("jspdf");
      await import("jspdf-autotable");
      const doc = new jsPDF();
      let title, head, body, filename;

      // Configurar fuentes y colores
      doc.setFontSize(18);
      doc.setTextColor(31, 41, 55);

      if (reportType === "sales") {
        title = "Reporte de Ventas";
        head = [["Fecha", "Ventas", "Transacciones"]];
        body = data.salesOverTime.map((d) => [
          d.date,
          `$${d.ventas.toLocaleString()}`,
          d.transacciones,
        ]);
        filename = `reporte_ventas_${format(new Date(), "yyyy-MM-dd")}.pdf`;

        // Agregar resumen
        doc.text(title, 14, 20);
        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128);
        doc.text(`Generado: ${format(new Date(), "dd/MM/yyyy HH:mm")}`, 14, 28);

        // Agregar información resumida
        doc.setFontSize(12);
        doc.setTextColor(31, 41, 55);
        doc.text(
          `Ventas Totales: $${data.summary.totalVentas.toLocaleString()}`,
          14,
          38,
        );
        doc.text(`Transacciones: ${data.summary.totalTransacciones}`, 14, 45);
        doc.text(
          `Ticket Promedio: $${data.summary.ticketPromedio.toFixed(2)}`,
          14,
          52,
        );

        doc.autoTable({
          startY: 60,
          head: head,
          body: body,
          theme: "grid",
          headStyles: { fillColor: [59, 130, 246] },
          alternateRowStyles: { fillColor: [249, 250, 251] },
        });
      } else {
        title = "Análisis de Productos";
        head = [["#", "Producto", "Cantidad Vendida", "Ingresos"]];
        body = data.topSelling.map((p, idx) => [
          idx + 1,
          p.nombre,
          p.cantidad,
          `$${p.ingresos.toLocaleString()}`,
        ]);
        filename = `reporte_productos_${format(new Date(), "yyyy-MM-dd")}.pdf`;

        doc.text(title, 14, 20);
        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128);
        doc.text(`Generado: ${format(new Date(), "dd/MM/yyyy HH:mm")}`, 14, 28);

        doc.autoTable({
          startY: 35,
          head: head,
          body: body,
          theme: "grid",
          headStyles: { fillColor: [59, 130, 246] },
          alternateRowStyles: { fillColor: [249, 250, 251] },
        });
      }

      doc.save(filename);
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      alert("Error al exportar el archivo PDF");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Opciones de Exportación
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Descarga el reporte en el formato que prefieras
          </p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleExportCSV} variant="secondary" disabled={busy}>
            <span className="mr-2">📊</span>
            Exportar CSV
          </Button>
          <Button onClick={handleExportPDF} variant="secondary" disabled={busy}>
            <span className="mr-2">📄</span>
            Exportar PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;
