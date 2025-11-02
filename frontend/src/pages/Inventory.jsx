import React from 'react';
import ProductForm from '../components/inventory/ProductForm';
import ProductList from '../components/inventory/ProductList';
import StockAlert from '../components/inventory/StockAlert';
import ExpirationTracker from '../components/inventory/ExpirationTracker';

const Inventory = () => {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Gestión de Inventario</h1>
            <ProductForm onCreated={() => window.dispatchEvent(new Event('refresh-products'))} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2"><ProductList /></div>
                <div className="space-y-4">
                    <StockAlert />
                    <ExpirationTracker />
                </div>
            </div>
        </div>
    );
};

export default Inventory;