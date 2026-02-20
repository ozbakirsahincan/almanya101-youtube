import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * OAuthCallback Component - Handles OAuth callback redirect
 */
const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginDemo } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // For demo purposes, if it's a real OAuth flow from a working backend,
      // the token would be validated and user fetched
      // For now, we'll just set it and navigate
      localStorage.setItem('token', token);

      // Create a demo user for OAuth login
      const demoUser = {
        name: 'OAuth User',
        email: 'oauth@example.com',
        role: 'user',
        avatar: null,
        provider: 'oauth',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      localStorage.setItem('user', JSON.stringify(demoUser));

      // Navigate to dashboard
      navigate('/dashboard', { replace: true });
    } else {
      // No token, redirect to auth page
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate]);

  // Loading state while processing
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="spinner w-12 h-12 mx-auto mb-4" />
        <p className="text-white/40">Completing authentication...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
