import React, { useRef } from 'react';
import PaymentForm from '../components/payments/PaymentForm';
import TransactionHistory from '../components/payments/TransactionHistory';
import InvoiceGenerator from '../components/payments/InvoiceGenerator';

const Payments = () => {
    const historyRef = useRef(null);
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Gestión de Cobros y Pagos</h1>
            <PaymentForm onCreated={() => window.dispatchEvent(new CustomEvent('refresh-transactions'))} />
            <InvoiceGenerator />
            <TransactionHistory ref={historyRef} />
        </div>
    );
};

export default Payments;