import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { LoadingScreen } from './components/LoadingScreen';
import { Toaster } from 'react-hot-toast';

// Lazy loaded pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Invoices = lazy(() => import('./pages/Invoices'));
const GstReports = lazy(() => import('./pages/GstReports'));
const Auth = lazy(() => import('./pages/Auth'));
const CreateInvoice = lazy(() => import('./pages/CreateInvoice'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" toastOptions={{ className: 'glass-panel', style: { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' } }} />
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/login" element={<Auth />} />
              
              <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route 
                  path="dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="invoices" 
                  element={
                    <ProtectedRoute>
                      <Invoices />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="invoices/new" 
                  element={
                    <ProtectedRoute>
                      <CreateInvoice />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="gst-reports" 
                  element={
                    <ProtectedRoute>
                      <GstReports />
                    </ProtectedRoute>
                  } 
                />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
