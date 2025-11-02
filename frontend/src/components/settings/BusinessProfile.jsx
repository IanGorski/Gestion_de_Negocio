import React, { useRef } from "react";
import { useBusinessContext } from "../../context/BusinessContext";

const BusinessProfile = () => {
  const { businessInfo, updateBusinessInfo } = useBusinessContext();
  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateBusinessInfo({ [name]: type === "checkbox" ? checked : value });
  };

  const handleLogo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateBusinessInfo({ logo: reader.result });
    reader.readAsDataURL(file);
  };

  const handleHourChange = (idx, key, value) => {
    const hours = [...businessInfo.hours];
    hours[idx] = { ...hours[idx], [key]: value };
    updateBusinessInfo({ hours });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Perfil del Negocio</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Nombre</label>
          <input
            name="name"
            value={businessInfo.name}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={businessInfo.email}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
          <input
            name="phone"
            value={businessInfo.phone}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Dirección</label>
          <input
            name="address"
            value={businessInfo.address}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">CUIT/RUT</label>
          <input
            name="taxId"
            value={businessInfo.taxId}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Logo</label>
          <div className="flex items-center gap-3">
            {businessInfo.logo && (
              <img
                src={businessInfo.logo}
                alt="logo"
                className="w-12 h-12 rounded object-cover border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleLogo}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-medium mb-2">Horarios de atención</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {businessInfo.hours.map((h, idx) => (
            <div key={h.day} className="flex items-center gap-2">
              <span className="w-24 text-sm text-gray-600">{h.day}</span>
              <label className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Cerrado</span>
                <input
                  type="checkbox"
                  checked={h.closed}
                  onChange={(e) =>
                    handleHourChange(idx, "closed", e.target.checked)
                  }
                />
              </label>
              {!h.closed && (
                <>
                  <input
                    type="time"
                    value={h.open}
                    onChange={(e) =>
                      handleHourChange(idx, "open", e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="time"
                    value={h.close}
                    onChange={(e) =>
                      handleHourChange(idx, "close", e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
