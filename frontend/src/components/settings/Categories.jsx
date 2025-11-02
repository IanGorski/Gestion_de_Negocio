import React, { useState } from "react";
import { useBusinessContext } from "../../context/BusinessContext";

const Categories = () => {
  const { categories, addCategory, updateCategory, removeCategory } =
    useBusinessContext();
  const [form, setForm] = useState({ name: "", color: "#3b82f6", icon: "📦" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addCategory(form);
    setForm({ name: "", color: "#3b82f6", icon: "📦" });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Categorías</h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4"
      >
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <input
          type="color"
          title="Color"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
          className="border rounded px-3 py-2 h-10"
        />
        <input
          type="text"
          placeholder="Icono (emoji o nombre)"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2"
        >
          Agregar
        </button>
      </form>

      <ul className="divide-y">
        {categories.map((c) => (
          <li key={c.id} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <span className="text-xl" title="icono">
                {c.icon}
              </span>
              <span className="font-medium">{c.name}</span>
              <span
                className="inline-block w-5 h-5 rounded"
                style={{ backgroundColor: c.color }}
                title={c.color}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() =>
                  updateCategory(c.id, {
                    name: prompt("Nuevo nombre", c.name) || c.name,
                  })
                }
              >
                Renombrar
              </button>
              <button
                className="text-sm text-rose-600 hover:underline"
                onClick={() => removeCategory(c.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
