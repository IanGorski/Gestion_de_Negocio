import React, { useState } from "react";
import { subDays, format, parse, isValid } from "date-fns";
import Button from "../common/Button";

const ReportGenerator = ({ onGenerateReport, loading }) => {
  const [reportType, setReportType] = useState("sales");
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
  });

  const handleGenerate = () => {
    if (onGenerateReport) {
      onGenerateReport(reportType, dateRange);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const parsedDate = parse(value, "yyyy-MM-dd", new Date());

    if (isValid(parsedDate)) {
      setDateRange((prev) => ({ ...prev, [name]: parsedDate }));
    } else {
      console.warn(`Fecha inválida ingresada: ${value}`);
    }
  };

  const handleQuickSelect = (days) => {
    setDateRange({
      startDate: subDays(new Date(), days),
      endDate: new Date(),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Generador de Reportes
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Seleccione el tipo de reporte y el rango de fechas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Selector de Tipo de Reporte */}
        <div>
          <label
            htmlFor="reportType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tipo de Reporte
          </label>
          <select
            id="reportType"
            name="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            disabled={loading}
          >
            <option value="sales">📊 Reporte de Ventas</option>
            <option value="products">📦 Análisis de Productos</option>
          </select>
        </div>

        {/* Selector de Fecha de Inicio */}
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Fecha de Inicio
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={
              dateRange.startDate
                ? format(dateRange.startDate, "yyyy-MM-dd")
                : ""
            }
            onChange={handleDateChange}
            max={
              dateRange.endDate ? format(dateRange.endDate, "yyyy-MM-dd") : ""
            }
            className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            disabled={loading}
          />
        </div>

        {/* Selector de Fecha de Fin */}
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Fecha de Fin
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={
              dateRange.endDate ? format(dateRange.endDate, "yyyy-MM-dd") : ""
            }
            onChange={handleDateChange}
            min={
              dateRange.startDate
                ? format(dateRange.startDate, "yyyy-MM-dd")
                : ""
            }
            max={format(new Date(), "yyyy-MM-dd")}
            className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            disabled={loading}
          />
        </div>
      </div>

      {/* Botones de selección rápida */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => handleQuickSelect(7)}
          className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          disabled={loading}
        >
          Últimos 7 días
        </button>
        <button
          onClick={() => handleQuickSelect(30)}
          className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          disabled={loading}
        >
          Últimos 30 días
        </button>
        <button
          onClick={() => handleQuickSelect(90)}
          className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          disabled={loading}
        >
          Últimos 90 días
        </button>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? (
            <>
              <span className="inline-block animate-spin mr-2">⏳</span>
              Generando...
            </>
          ) : (
            <>
              <span className="mr-2">🔍</span>
              Generar Reporte
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReportGenerator;
