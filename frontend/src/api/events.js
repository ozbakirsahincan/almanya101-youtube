import api from './axios';

/**
 * Event API calls
 */

/**
 * Get all events with filters
 * @param {object} filters - { month, year, type, page, limit }
 * @returns {Promise}
 */
export const getAllEvents = (filters = {}) => {
  return api.get('/events', { params: filters });
};

/**
 * Get event by ID
 * @param {string} eventId
 * @returns {Promise}
 */
export const getEventById = (eventId) => {
  return api.get(`/events/${eventId}`);
};

/**
 * Create new event
 * @param {object} eventData
 * @returns {Promise}
 */
export const createEvent = (eventData) => {
  return api.post('/events', eventData);
};

/**
 * Update event
 * @param {string} eventId
 * @param {object} eventData
 * @returns {Promise}
 */
export const updateEvent = (eventId, eventData) => {
  return api.put(`/events/${eventId}`, eventData);
};

/**
 * Delete event
 * @param {string} eventId
 * @returns {Promise}
 */
export const deleteEvent = (eventId) => {
  return api.delete(`/events/${eventId}`);
};

/**
 * Toggle attendance for an event
 * @param {string} eventId
 * @returns {Promise}
 */
export const toggleAttendance = (eventId) => {
  return api.post(`/events/${eventId}/attend`);
};
