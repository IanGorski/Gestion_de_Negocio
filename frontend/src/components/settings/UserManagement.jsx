import React, { useState } from "react";
import { useBusinessContext } from "../../context/BusinessContext";

const UserManagement = () => {
  const { users, addUser, updateUser, toggleUserActive, removeUser } =
    useBusinessContext();
  const [form, setForm] = useState({ name: "", email: "", role: "empleado" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    addUser(form);
    setForm({ name: "", email: "", role: "empleado" });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Usuarios del Negocio</h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4"
      >
        <input
          className="border rounded px-3 py-2"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          className="border rounded px-3 py-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <select
          className="border rounded px-3 py-2"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="admin">Administrador</option>
          <option value="empleado">Empleado</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white rounded px-4">
          Agregar
        </button>
      </form>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="py-2">Nombre</th>
            <th className="py-2">Email</th>
            <th className="py-2">Rol</th>
            <th className="py-2">Activo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="py-2 font-medium">{u.name}</td>
              <td className="py-2">{u.email}</td>
              <td className="py-2">
                <select
                  className="border rounded px-2 py-1"
                  value={u.role}
                  onChange={(e) => updateUser(u.id, { role: e.target.value })}
                >
                  <option value="admin">Administrador</option>
                  <option value="empleado">Empleado</option>
                </select>
              </td>
              <td className="py-2">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={u.active}
                    onChange={() => toggleUserActive(u.id)}
                  />
                  {u.active ? "Sí" : "No"}
                </label>
              </td>
              <td className="py-2 text-right">
                <button
                  className="text-rose-600 hover:underline"
                  onClick={() => removeUser(u.id)}
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

export default UserManagement;
