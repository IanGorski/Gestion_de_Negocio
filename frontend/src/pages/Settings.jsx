import React, { useState } from 'react';
import BusinessProfile from '../components/settings/BusinessProfile';
import PaymentMethods from '../components/settings/PaymentMethods';
import UserManagement from '../components/settings/UserManagement';
import Categories from '../components/settings/Categories';
import Preferences from '../components/settings/Preferences';

const Settings = () => {
    const tabs = [
        { key: 'profile', label: 'Perfil' },
        { key: 'payments', label: 'Métodos de pago' },
        { key: 'categories', label: 'Categorías' },
        { key: 'users', label: 'Usuarios' },
        { key: 'preferences', label: 'Preferencias' },
    ];
    const [tab, setTab] = useState('profile');

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Configuración</h1>

            <div className="flex flex-wrap gap-2 mb-4">
                {tabs.map(t => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`px-3 py-1.5 rounded border ${tab === t.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                {tab === 'profile' && <BusinessProfile />}
                {tab === 'payments' && <PaymentMethods />}
                {tab === 'categories' && <Categories />}
                {tab === 'users' && <UserManagement />}
                {tab === 'preferences' && <Preferences />}
            </div>
        </div>
    );
};

export default Settings;