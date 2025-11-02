import React, { useState } from 'react';
import ReportGenerator from '../components/reports/ReportGenerator';
import SalesReport from '../components/reports/SalesReport';
import TopProducts from '../components/reports/TopProducts';
import ExportOptions from '../components/reports/ExportOptions';
import Loader from '../components/common/Loader';
import { getSalesReport, getProductsReport } from '../services/reportService';

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [reportType, setReportType] = useState('sales');
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async (type, dateRange) => {
    setLoading(true);
    setReportType(type);
    setReportData(null);

    try {
      let data;
      if (type === 'sales') {
        data = await getSalesReport(dateRange.startDate, dateRange.endDate);
      } else {
        data = await getProductsReport();
      }
      setReportData(data);
    } catch (error) {
      console.error("Error generating report:", error);
      // Aquí se podría mostrar una notificación de error al usuario
    } finally {
      setLoading(false);
    }
  };

  const renderReport = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-64"><Loader /></div>;
    }

    if (!reportData) {
      return <div className="text-center p-8 bg-gray-50 rounded-lg">Seleccione un tipo de reporte y un rango de fechas para comenzar.</div>;
    }

    switch (reportType) {
      case 'sales':
        return <SalesReport data={reportData} />;
      case 'products':
        return <TopProducts data={reportData} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reportes y Análisis</h1>
        <p className="text-gray-600">Visualiza el rendimiento de tu negocio y toma decisiones informadas.</p>
      </header>
      
      <ReportGenerator onGenerateReport={handleGenerateReport} loading={loading} />

      {renderReport()}

      <ExportOptions data={reportData} reportType={reportType} />
    </div>
  );
};

export default Reports;