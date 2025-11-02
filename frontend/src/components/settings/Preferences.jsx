import React from "react";
import { useBusinessContext } from "../../context/BusinessContext";

const Preferences = () => {
  const { preferences, updatePreferences } = useBusinessContext();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("notif.")) {
      const key = name.split(".")[1];
      updatePreferences({
        notifications: {
          ...preferences.notifications,
          [key]: type === "checkbox" ? checked : value,
        },
      });
      return;
    }
    updatePreferences({ [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Preferencias</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Moneda</label>
          <select
            name="currency"
            value={preferences.currency}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="ARS">ARS - Peso Argentino</option>
            <option value="USD">USD - Dólar</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Formato de fecha
          </label>
          <select
            name="dateFormat"
            value={preferences.dateFormat}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="yyyy-MM-dd">yyyy-MM-dd</option>
            <option value="dd/MM/yyyy">dd/MM/yyyy</option>
            <option value="MM/dd/yyyy">MM/dd/yyyy</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Idioma</label>
          <select
            name="language"
            value={preferences.language}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
          </select>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="font-medium mb-2">Notificaciones</p>
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            name="notif.inventoryAlerts"
            checked={preferences.notifications.inventoryAlerts}
            onChange={handleChange}
          />
          Alertas de inventario
        </label>
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            name="notif.paymentAlerts"
            checked={preferences.notifications.paymentAlerts}
            onChange={handleChange}
          />
          Alertas de pagos
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="notif.reportEmails"
            checked={preferences.notifications.reportEmails}
            onChange={handleChange}
          />
          Envío de reportes por email
        </label>
      </div>
    </div>
  );
};

export default Preferences;
