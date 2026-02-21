import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authAPI from '../api/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const storeSession = (token, user, rememberMe) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem('token', token);
  storage.setItem('user', JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

const buildDemoSession = (userData, rememberMe) => {
  const demoToken = `demo_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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
  storeSession(demoToken, demoUser, rememberMe);
  return { demoToken, demoUser };
};

const applyAuthSession = (newToken, newUser, rememberMe, setToken, setUser) => {
  storeSession(newToken, newUser, rememberMe);
  setToken(newToken);
  setUser(newUser);
};

async function loadStoredUser({ setToken, setUser, setIsDemo, setLoading }) {
  try {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      if (storedToken.startsWith('demo_token_')) {
        setIsDemo(true);
      } else {
        try {
          const response = await authAPI.getMe();
          if (response.data.success) setUser(response.data.user);
        } catch {
          clearSession();
          setToken(null);
          setUser(null);
        }
      }
    }
  } catch (error) {
    console.error('Error loading user:', error);
    clearSession();
  } finally {
    setLoading(false);
  }
}

async function performLogout(isDemo, setToken, setUser, setIsDemo) {
  try {
    if (!isDemo) await authAPI.logout();
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearSession();
    setToken(null);
    setUser(null);
    setIsDemo(false);
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    loadStoredUser({ setToken, setUser, setIsDemo, setLoading });
  }, []);

  const loginDemo = useCallback((userData, rememberMe = false) => {
    const { demoToken, demoUser } = buildDemoSession(userData, rememberMe);
    setToken(demoToken);
    setUser(demoUser);
    setIsDemo(true);
    return { success: true, isDemo: true };
  }, []);

  const login = useCallback(async (email, password, rememberMe = false) => {
    try {
      const response = await authAPI.login({ email, password });
      if (response.data.success) {
        applyAuthSession(response.data.token, response.data.user, rememberMe, setToken, setUser);
        setIsDemo(false);
        return { success: true };
      }
      return { success: false, message: response.data.message || 'Login failed' };
    } catch (error) {
      if (error.isNetworkError) return loginDemo({ email, name: email.split('@')[0] }, rememberMe);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  }, [loginDemo]);

  const register = useCallback(async (userData, rememberMe = false) => {
    try {
      const response = await authAPI.register(userData);
      if (response.data.success) {
        applyAuthSession(response.data.token, response.data.user, rememberMe, setToken, setUser);
        setIsDemo(false);
        return { success: true };
      }
      return { success: false, message: response.data.message || 'Registration failed' };
    } catch (error) {
      if (error.isNetworkError) return loginDemo({ name: userData.name, email: userData.email }, rememberMe);
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  }, [loginDemo]);

  const logout = useCallback(() => performLogout(isDemo, setToken, setUser, setIsDemo), [isDemo]);
  const loginWithGoogle = useCallback(() => { authAPI.googleLogin(); }, []);
  const loginWithGithub = useCallback(() => { authAPI.githubLogin(); }, []);

  const value = { user, token, loading, isAuthenticated: !!token, isDemo, login, register, logout, loginDemo, loginWithGoogle, loginWithGithub };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
