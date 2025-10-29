import React, { createContext, useState, useContext } from 'react';

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
    const [businessInfo, setBusinessInfo] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        logo: null,
    });

    const updateBusinessInfo = (info) => {
        setBusinessInfo(prev => ({ ...prev, ...info }));
    };

    const value = {
        businessInfo,
        updateBusinessInfo,
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