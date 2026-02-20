import api from './axios';

/**
 * Authentication API calls
 */

/**
 * Register a new user
 * @param {object} userData - { name, email, password, confirmPassword }
 * @returns {Promise}
 */
export const register = (userData) => {
  return api.post('/auth/register', userData);
};

/**
 * Login user
 * @param {object} credentials - { email, password }
 * @returns {Promise}
 */
export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

/**
 * Get current user
 * @returns {Promise}
 */
export const getMe = () => {
  return api.get('/auth/me');
};

/**
 * Logout user
 * @returns {Promise}
 */
export const logout = () => {
  return api.post('/auth/logout');
};

/**
 * Initiate Google OAuth
 * @returns {string} Google OAuth URL
 */
export const googleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL || '/api'}/auth/google`;
};

/**
 * Initiate GitHub OAuth
 * @returns {string} GitHub OAuth URL
 */
export const githubLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL || '/api'}/auth/github`;
};
