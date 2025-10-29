import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { BusinessProvider } from './context/BusinessContext';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Payments from './pages/Payments';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import './styles/globals.css';
import './styles/tailwind.css';

function App() {
  return (
    <AuthProvider>
      <BusinessProvider>
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/payments" element={<Layout><Payments /></Layout>} />
            <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
            <Route path="/reports" element={<Layout><Reports /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </BusinessProvider>
    </AuthProvider>
  );
}

export default App;
