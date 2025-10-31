import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
    const { user, logout } = useAuthContext();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Left Section */}
                <div className="navbar-left">
                    <button
                        onClick={onToggleSidebar}
                        className="navbar-toggle"
                        aria-label="Toggle menu"
                    >
                        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                    
                    <Link to="/dashboard" className="navbar-logo">
                        Mi Negocio
                    </Link>
                </div>

                {/* Right Section */}
                <div className="navbar-right">
                    {user && (
                        <>
                            <span className="navbar-user-name">
                                Hola, {user.name}
                            </span>
                            <button
                                onClick={logout}
                                className="navbar-logout-btn"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;