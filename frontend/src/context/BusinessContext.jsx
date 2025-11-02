import React, { createContext, useState, useContext, useEffect } from 'react';

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
    // Cargar estado inicial desde localStorage si existe
    const loadInitialState = () => {
        try {
            const raw = localStorage.getItem('businessSettings');
            if (raw) return JSON.parse(raw);
        } catch (e) {
            console.warn('No se pudo cargar businessSettings de localStorage', e);
        }
        return null;
    };

    const initial = loadInitialState();

    const [businessInfo, setBusinessInfo] = useState(
        initial?.businessInfo || {
            name: '',
            address: '',
            phone: '',
            email: '',
            logo: null,
            taxId: '',
            hours: [
                { day: 'Lunes', open: '09:00', close: '18:00', closed: false },
                { day: 'Martes', open: '09:00', close: '18:00', closed: false },
                { day: 'Miércoles', open: '09:00', close: '18:00', closed: false },
                { day: 'Jueves', open: '09:00', close: '18:00', closed: false },
                { day: 'Viernes', open: '09:00', close: '18:00', closed: false },
                { day: 'Sábado', open: '10:00', close: '14:00', closed: false },
                { day: 'Domingo', open: '00:00', close: '00:00', closed: true },
            ],
        }
    );

    const [paymentMethods, setPaymentMethods] = useState(
        initial?.paymentMethods || [
            { id: 'cash', name: 'Efectivo', enabled: true, feePercent: 0 },
            { id: 'card', name: 'Tarjeta', enabled: true, feePercent: 3.5 },
            { id: 'transfer', name: 'Transferencia', enabled: true, feePercent: 0 },
        ]
    );

    const [categories, setCategories] = useState(
        initial?.categories || [
            { id: 'cat-1', name: 'General', color: '#3b82f6', icon: '📦' },
        ]
    );

    const [users, setUsers] = useState(
        initial?.users || [
            { id: 'u-1', name: 'Admin', email: 'admin@negocio.com', role: 'admin', active: true },
        ]
    );

    const [preferences, setPreferences] = useState(
        initial?.preferences || {
            currency: 'ARS',
            dateFormat: 'yyyy-MM-dd',
            language: 'es',
            notifications: {
                inventoryAlerts: true,
                paymentAlerts: true,
                reportEmails: false,
            },
        }
    );

    const updateBusinessInfo = (info) => {
        setBusinessInfo(prev => ({ ...prev, ...info }));
    };

    // Métodos: Métodos de pago
    const togglePaymentMethod = (id) => {
        setPaymentMethods(prev => prev.map(m => (m.id === id ? { ...m, enabled: !m.enabled } : m)));
    };

    const updatePaymentFee = (id, feePercent) => {
        setPaymentMethods(prev => prev.map(m => (m.id === id ? { ...m, feePercent: Number(feePercent) || 0 } : m)));
    };

    const addPaymentMethod = (method) => {
        const id = method.id || `${method.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
        setPaymentMethods(prev => [...prev, { id, enabled: true, feePercent: 0, ...method }]);
    };

    const removePaymentMethod = (id) => {
        setPaymentMethods(prev => prev.filter(m => m.id !== id));
    };

    // Métodos: Categorías
    const addCategory = (cat) => {
        const id = cat.id || `cat-${Date.now()}`;
        setCategories(prev => [...prev, { id, color: '#3b82f6', icon: '📦', ...cat }]);
    };

    const updateCategory = (id, patch) => {
        setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...patch } : c)));
    };

    const removeCategory = (id) => {
        setCategories(prev => prev.filter(c => c.id !== id));
    };

    // Métodos: Usuarios
    const addUser = (user) => {
        const id = user.id || `u-${Date.now()}`;
        setUsers(prev => [...prev, { id, role: 'empleado', active: true, ...user }]);
    };

    const updateUser = (id, patch) => {
        setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...patch } : u)));
    };

    const toggleUserActive = (id) => {
        setUsers(prev => prev.map(u => (u.id === id ? { ...u, active: !u.active } : u)));
    };

    const removeUser = (id) => {
        setUsers(prev => prev.filter(u => u.id !== id));
    };

    // Preferencias
    const updatePreferences = (patch) => {
        setPreferences(prev => ({ ...prev, ...patch }));
    };

    // Persistencia: guardar todo en localStorage ante cambios
    useEffect(() => {
        try {
            const payload = JSON.stringify({ businessInfo, paymentMethods, categories, users, preferences });
            localStorage.setItem('businessSettings', payload);
        } catch (e) {
            console.warn('No se pudo guardar businessSettings en localStorage', e);
        }
    }, [businessInfo, paymentMethods, categories, users, preferences]);

    const value = {
        businessInfo,
        updateBusinessInfo,
        paymentMethods,
        togglePaymentMethod,
        updatePaymentFee,
        addPaymentMethod,
        removePaymentMethod,
        categories,
        addCategory,
        updateCategory,
        removeCategory,
        users,
        addUser,
        updateUser,
        toggleUserActive,
        removeUser,
        preferences,
        updatePreferences,
    };

    return <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>;
};

export const useBusinessContext = () => {
    const context = useContext(BusinessContext);
    if (!context) {
        throw new Error('useBusinessContext must be used within BusinessProvider');
    }
    return context;
};

export default BusinessContext;