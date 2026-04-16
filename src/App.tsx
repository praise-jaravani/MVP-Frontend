import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUpLayout from './pages/SignUp/SignUpLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Endpoints from './pages/dashboard/Endpoints';
import Threats from './pages/dashboard/Threats';
import Reports from './pages/dashboard/Reports';
import Pricing from './pages/dashboard/Pricing';
import Settings from './pages/dashboard/Settings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup/*" element={<SignUpLayout />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/endpoints"
              element={
                <ProtectedRoute>
                  <Endpoints />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/threats"
              element={
                <ProtectedRoute>
                  <Threats />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/pricing"
              element={
                <ProtectedRoute>
                  <Pricing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
