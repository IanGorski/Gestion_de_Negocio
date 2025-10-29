import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    FiHome, 
    FiDollarSign, 
    FiPackage, 
    FiBarChart2, 
    FiSettings,
    FiX 
} from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
    const menuItems = [
        { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
        { path: '/payments', icon: FiDollarSign, label: 'Pagos' },
        { path: '/inventory', icon: FiPackage, label: 'Inventario' },
        { path: '/reports', icon: FiBarChart2, label: 'Reportes' },
        { path: '/settings', icon: FiSettings, label: 'Configuración' },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-full bg-gray-900 text-white w-64 z-40 
                    transform transition-transform duration-300 ease-in-out
                    lg:translate-x-0 lg:static lg:z-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Menú</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white lg:hidden"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-4">
                    <ul className="space-y-2 px-3">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                                        ${isActive 
                                            ? 'bg-blue-600 text-white' 
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }`
                                    }
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400 text-center">
                        © 2025 Mi Negocio
                    </p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
