import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import CommunityPage from './pages/CommunityPage';
import EventsPage from './pages/EventsPage';
import OAuthCallback from './pages/OAuthCallback';
import PrivateRoute from './components/layout/PrivateRoute';
import Layout from './components/layout/Layout';
import './index.css';

// Create QueryClient for Tanstack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

/**
 * Main App Component
 * Sets up routing and providers
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<AuthPage />} />
              <Route path="/auth/callback" element={<OAuthCallback />} />

              {/* Protected routes with Layout */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Layout>
                      <DashboardPage />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/community"
                element={
                  <PrivateRoute>
                    <Layout>
                      <CommunityPage />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/events"
                element={
                  <PrivateRoute>
                    <Layout>
                      <EventsPage />
                    </Layout>
                  </PrivateRoute>
                }
              />

              {/* Catch all - redirect to auth */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
