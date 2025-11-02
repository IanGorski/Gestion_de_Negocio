import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiDollarSign,
  FiPackage,
  FiBarChart2,
  FiSettings,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { useAuthContext } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuthContext();
  const menuItems = [
    { path: "/dashboard", icon: FiHome, label: "Dashboard" },
    { path: "/payments", icon: FiDollarSign, label: "Pagos" },
    { path: "/inventory", icon: FiPackage, label: "Inventario" },
    { path: "/reports", icon: FiBarChart2, label: "Reportes" },
    { path: "/settings", icon: FiSettings, label: "Configuración" },
  ];

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        {/* Header del Sidebar */}
        <div className="sidebar__header">
          <h2 className="sidebar__title">Mi Negocio</h2>
          <button
            onClick={onClose}
            className="sidebar__close"
            aria-label="Cerrar menú"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Sección de usuario */}
        <div className="sidebar__user">
          <div className="sidebar__user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar__user-info">
            <p className="sidebar__user-name">{user?.name}</p>
            <p className="sidebar__user-email">{user?.email}</p>
          </div>
        </div>

        {/* Navegación */}
        <nav className="sidebar__nav">
          <ul className="sidebar__menu">
            {menuItems.map((item) => (
              <li key={item.path} className="sidebar__menu-item">
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `sidebar__menu-link ${isActive ? "sidebar__menu-link--active" : ""}`
                  }
                >
                  <item.icon size={20} className="sidebar__menu-icon" />
                  <span className="sidebar__menu-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar__footer">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="sidebar__logout"
          >
            <FiLogOut size={18} />
            <span>Cerrar sesión</span>
          </button>
          <p className="sidebar__copyright">© 2025 Mi Negocio</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
