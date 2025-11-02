import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const { login, loading } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || '/dashboard';

    const [form, setForm] = useState({ email: '', password: '', remember: false });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const errs = {};
        if (!form.email) errs.email = 'El email es requerido';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email inválido';
        if (!form.password) errs.password = 'La contraseña es requerida';
        else if (form.password.length < 6) errs.password = 'Mínimo 6 caracteres';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v = validate();
        setErrors(v);
        if (Object.keys(v).length) return;

        const { ok } = await login({ email: form.email, password: form.password, remember: form.remember });
        if (ok) {
            navigate(redirectTo, { replace: true });
        }
    };

    return (
        <div className="login-container">
            {/* Fondo gradiente animado */}
            <div className="login-background"></div>
            
            {/* Contenedor principal */}
            <div className="login-wrapper">
                {/* Sección izquierda - Info */}
                <div className="login-info">
                    <div className="login-info-content">
                        <div className="login-icon-brand">
                            <div className="icon-badge">📊</div>
                        </div>
                        <h2 className="login-info-title">Gestión Inteligente</h2>
                        <p className="login-info-text">
                            Controla tu negocio desde cualquier lugar. Dashboard intuitivo, reportes en tiempo real y análisis profundos.
                        </p>
                        <div className="login-features">
                            <div className="feature">
                                <span className="feature-icon">✓</span>
                                <span>Inventario en tiempo real</span>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">✓</span>
                                <span>Pagos y transacciones</span>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">✓</span>
                                <span>Reportes avanzados</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección derecha - Formulario */}
                <div className="login-form-section">
                    <div className="login-form-wrapper">
                        {/* Header del formulario */}
                        <div className="login-form-header">
                            <h1 className="login-form-title">Iniciar Sesión</h1>
                            <p className="login-form-subtitle">Accede a tu cuenta de negocio</p>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="login-form">
                            {/* Email Input */}
                            <div className="login-input-group">
                                <label className="login-label">Email</label>
                                <div className="login-input-wrapper">
                                    <FiMail className="login-input-icon" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="tu@correo.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="login-input"
                                    />
                                </div>
                                {errors.email && <p className="login-error">{errors.email}</p>}
                            </div>

                            {/* Password Input */}
                            <div className="login-input-group">
                                <label className="login-label">Contraseña</label>
                                <div className="login-input-wrapper">
                                    <FiLock className="login-input-icon" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="login-input"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="login-input-action"
                                    >
                                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </button>
                                </div>
                                {errors.password && <p className="login-error">{errors.password}</p>}
                            </div>

                            {/* Remember & Forgot Password */}
                            <div className="login-options">
                                <label className="login-checkbox">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={form.remember}
                                        onChange={handleChange}
                                    />
                                    <span>Recordarme en este dispositivo</span>
                                </label>
                                <a href="#" className="login-forgot-link">¿Olvidaste tu contraseña?</a>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                className="login-button"
                                disabled={loading}
                            >
                                <span>{loading ? 'Ingresando...' : 'Ingresar'}</span>
                                {!loading && <FiArrowRight size={18} />}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="login-footer">
                            <p>¿Primera vez aquí? <a href="#" className="login-footer-link">Crear cuenta</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;