import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { BusinessProvider } from './context/BusinessContext';
import Layout from './components/common/Layout';
import PrivateRoute from './components/PrivateRoute';
import Loader from './components/common/Loader';
import PageTransition from './components/common/PageTransition';
import ErrorBoundary from './components/common/ErrorBoundary';
import ErrorFallback from './pages/ErrorFallback';
import SkipLink from './components/common/SkipLink';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Payments = lazy(() => import('./pages/Payments'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));
import './styles/globals.css';
import './styles/tailwind.css';

function AppRoutes() {
  const location = useLocation();
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <AnimatePresence mode="wait" initial={false}>
        <Suspense fallback={<Loader fullScreen text="Cargando..." />}>
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/login" 
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              } 
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Navigate to="/dashboard" replace />
                </PrivateRoute>
              }
            />
            {[
              { path: '/dashboard', el: <Dashboard /> },
              { path: '/payments', el: <Payments /> },
              { path: '/inventory', el: <Inventory /> },
              { path: '/reports', el: <Reports /> },
              { path: '/settings', el: <Settings /> },
            ].map(({ path, el }) => (
              <Route
                key={path}
                path={path}
                element={
                  <PrivateRoute>
                    <Layout>
                      <PageTransition>
                        {el}
                      </PageTransition>
                    </Layout>
                  </PrivateRoute>
                }
              />
            ))}
            <Route 
              path="*" 
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              } 
            />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <AuthProvider>
      <BusinessProvider>
        <Router>
          <SkipLink />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
          />
          <AppRoutes />
        </Router>
      </BusinessProvider>
    </AuthProvider>
  );
}

export default App;
