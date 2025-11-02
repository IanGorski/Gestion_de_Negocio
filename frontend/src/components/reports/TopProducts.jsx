import React from "react";
import formatters from "../../utils/formatters";
import Card from "../common/Card";

const ProductTable = ({
  title,
  subtitle,
  products,
  valueKey,
  valueFormatter,
  valueLabel,
}) => (
  <Card title={title} subtitle={subtitle}>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              #
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Producto
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {valueLabel}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 font-semibold">
                  {index + 1}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {product.nombre}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm font-bold text-gray-900">
                  {valueFormatter(product[valueKey])}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

const TopProducts = ({ data }) => {
  if (!data) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow">
        <p className="text-gray-500">
          Seleccione los parámetros y genere un reporte para visualizar los
          datos.
        </p>
      </div>
    );
  }

  const { topSelling, topRevenue } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductTable
          title="Productos Más Vendidos"
          subtitle="Ranking por cantidad de unidades vendidas"
          products={topSelling}
          valueKey="cantidad"
          valueFormatter={(val) => formatters.formatNumber(val)}
          valueLabel="Cantidad Vendida"
        />
        <ProductTable
          title="Productos con Mayores Ingresos"
          subtitle="Ranking por ingresos generados"
          products={topRevenue}
          valueKey="ingresos"
          valueFormatter={formatters.formatCurrency}
          valueLabel="Ingresos Generados"
        />
      </div>
    </div>
  );
};

export default TopProducts;
