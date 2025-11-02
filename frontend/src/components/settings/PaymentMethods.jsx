import React, { useState } from "react";
import { useBusinessContext } from "../../context/BusinessContext";

const PaymentMethods = () => {
  const {
    paymentMethods,
    togglePaymentMethod,
    updatePaymentFee,
    addPaymentMethod,
    removePaymentMethod,
  } = useBusinessContext();
  const [name, setName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addPaymentMethod({ name });
    setName("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Métodos de Pago</h3>

      <form onSubmit={handleAdd} className="flex gap-3 mb-4">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="Nuevo método (ej: Mercado Pago)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white rounded px-4">
          Agregar
        </button>
      </form>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="py-2">Nombre</th>
            <th className="py-2">Comisión (%)</th>
            <th className="py-2">Habilitado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="py-2 font-medium">{m.name}</td>
              <td className="py-2">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="border rounded px-2 py-1 w-24"
                  value={m.feePercent}
                  onChange={(e) => updatePaymentFee(m.id, e.target.value)}
                />
              </td>
              <td className="py-2">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={m.enabled}
                    onChange={() => togglePaymentMethod(m.id)}
                  />
                  {m.enabled ? "Sí" : "No"}
                </label>
              </td>
              <td className="py-2 text-right">
                <button
                  className="text-rose-600 hover:underline"
                  onClick={() => removePaymentMethod(m.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentMethods;
