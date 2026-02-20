import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authAPI from '../api/auth';

/**
 * AuthContext - Manages authentication state and operations
 * Provides login, register, logout, and demo mode functionality
 */

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  /**
   * Load user from token on mount
   */
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check for token in storage
        const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          // Check if this is a demo token
          if (storedToken.startsWith('demo_token_')) {
            setIsDemo(true);
          } else {
            // Verify token with API
            try {
              const response = await authAPI.getMe();
              if (response.data.success) {
                setUser(response.data.user);
                // Update user in storage
                const storageKey = localStorage.getItem('token') ? 'localStorage' : 'sessionStorage';
                storageKey.setItem('user', JSON.stringify(response.data.user));
              }
            } catch (error) {
              // Token invalid, clear everything
              logout();
            }
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * Login with email and password
   */
  const login = useCallback(async (email, password, rememberMe = false) => {
    try {
      const response = await authAPI.login({ email, password });

      if (response.data.success) {
        const { token: newToken, user: newUser } = response.data;

        setToken(newToken);
        setUser(newUser);
        setIsDemo(false);

        // Store token based on rememberMe preference
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', newToken);
        storage.setItem('user', JSON.stringify(newUser));

        return { success: true };
      }

      return { success: false, message: response.data.message || 'Login failed' };
    } catch (error) {
      if (error.isNetworkError) {
        // Network error - activate demo mode
        return loginDemo({ email, name: email.split('@')[0] }, rememberMe);
      }

      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  }, []);

  /**
   * Register new user
   */
  const register = useCallback(async (userData, rememberMe = false) => {
    try {
      const response = await authAPI.register(userData);

      if (response.data.success) {
        const { token: newToken, user: newUser } = response.data;

        setToken(newToken);
        setUser(newUser);
        setIsDemo(false);

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', newToken);
        storage.setItem('user', JSON.stringify(newUser));

        return { success: true };
      }

      return { success: false, message: response.data.message || 'Registration failed' };
    } catch (error) {
      if (error.isNetworkError) {
        // Network error - activate demo mode
        return loginDemo({ name: userData.name, email: userData.email }, rememberMe);
      }

      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, message };
    }
  }, []);

  /**
   * Demo mode login - used when API is unavailable
   */
  const loginDemo = useCallback((userData, rememberMe = false) => {
    // Generate demo token
    const demoToken = `demo_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create mock user
    const demoUser = {
      id: demoToken,
      name: userData.name || 'Demo User',
      email: userData.email || 'demo@example.com',
      role: 'user',
      avatar: null,
      provider: 'local',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    setToken(demoToken);
    setUser(demoUser);
    setIsDemo(true);

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('token', demoToken);
    storage.setItem('user', JSON.stringify(demoUser));

    return { success: true, isDemo: true };
  }, []);

  /**
   * Login with Google OAuth
   */
  const loginWithGoogle = useCallback(() => {
    authAPI.googleLogin();
  }, []);

  /**
   * Login with GitHub OAuth
   */
  const loginWithGithub = useCallback(() => {
    authAPI.githubLogin();
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    try {
      // Only call logout API if not in demo mode
      if (!isDemo) {
        await authAPI.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      setToken(null);
      setUser(null);
      setIsDemo(false);
    }
  }, [isDemo]);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = !!token;

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    isDemo,
    login,
    register,
    logout,
    loginDemo,
    loginWithGoogle,
    loginWithGithub,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
