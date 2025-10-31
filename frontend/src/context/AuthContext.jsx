/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { notify } from '../utils/notifications';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = useCallback(async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.login(credentials);
            if (data?.token) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
            }
            if (data?.user) {
                setUser(data.user);
            }
            notify.success('Inicio de sesión exitoso');
            return { ok: true };
        } catch (err) {
            const message = err?.response?.data?.message || 'Error al iniciar sesión';
            setError(message);
            notify.error(message);
            return { ok: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch {
            // ignorar errores de logout
        }
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        notify.info('Sesión cerrada');
    }, []);

    // Verificar token al cargar la app
    useEffect(() => {
        const verify = async () => {
            if (!token) return;
            setLoading(true);
            try {
                const data = await authService.verifyToken();
                if (data?.user) setUser(data.user);
            } catch {
                // Token inválido
                setUser(null);
                setToken(null);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };
        verify();
    }, [token]);

    const value = {
        user,
        token,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;