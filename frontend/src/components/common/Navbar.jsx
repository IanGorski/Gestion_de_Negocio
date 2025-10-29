import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 z-40">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Left Section */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onToggleSidebar}
                        className="text-gray-600 hover:text-gray-900 focus:outline-none lg:hidden"
                    >
                        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                    
                    <Link to="/dashboard" className="flex items-center">
                        <h1 className="text-xl font-bold text-blue-600">
                            Mi Negocio
                        </h1>
                    </Link>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button className="relative text-gray-600 hover:text-gray-900 focus:outline-none">
                        <FiBell size={20} />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                            3
                        </span>
                    </button>

                    {/* User Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                <FiUser size={16} />
                            </div>
                            <span className="hidden md:block text-sm font-medium">
                                {user?.name || 'Usuario'}
                            </span>
                        </button>

                        {/* Dropdown Menu */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                <Link
                                    to="/settings"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    <FiUser className="inline mr-2" />
                                    Mi Perfil
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    <FiLogOut className="inline mr-2" />
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;