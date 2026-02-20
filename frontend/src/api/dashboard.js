import api from './axios';

/**
 * Dashboard API calls
 */

/**
 * Get dashboard data (stats + recent users)
 * @returns {Promise}
 */
export const getDashboardData = () => {
  return api.get('/dashboard');
};
