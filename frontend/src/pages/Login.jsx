import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
    const { login, loading } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || '/dashboard';

    const [form, setForm] = useState({ email: '', password: '', remember: false });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const validate = () => {
        const errs = {};
        if (!form.email) errs.email = 'El email es requerido';
        if (!form.password) errs.password = 'La contraseña es requerida';
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="tu@correo.com"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm -mt-3 mb-3">{errors.email}</p>}
                    <Input
                        label="Contraseña"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm -mt-3 mb-3">{errors.password}</p>}

                    <div className="flex items-center justify-between mb-6">
                        <label className="inline-flex items-center text-sm">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={form.remember}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Recordarme
                        </label>
                        <a href="#" className="text-blue-600 text-sm hover:underline">¿Olvidaste tu contraseña?</a>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;