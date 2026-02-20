import api from './axios';

/**
 * User API calls
 */

/**
 * Get all users with filters
 * @param {object} filters - { search, city, techStack, page, limit }
 * @returns {Promise}
 */
export const getAllUsers = (filters = {}) => {
  return api.get('/users', { params: filters });
};

/**
 * Get user by ID
 * @param {string} userId
 * @returns {Promise}
 */
export const getUserById = (userId) => {
  return api.get(`/users/${userId}`);
};

/**
 * Update user profile
 * @param {object} profileData - { name, bio, city, country, linkedin, github, phone, showPhone, techStack }
 * @returns {Promise}
 */
export const updateProfile = (profileData) => {
  return api.put('/users/profile', profileData);
};

/**
 * Get list of cities (for filter)
 * @returns {Promise}
 */
export const getCities = () => {
  return api.get('/users/meta/cities');
};

/**
 * Get list of tech stacks (for filter)
 * @returns {Promise}
 */
export const getTechStack = () => {
  return api.get('/users/meta/techstack');
};
