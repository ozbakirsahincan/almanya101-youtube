/**
 * Validation utilities
 */

/**
 * Email regex pattern
 */
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

/**
 * Calculate password strength
 * @param {string} password - Password to check
 * @returns {number} Strength score (0-4)
 */
export const calculatePasswordStrength = (password) => {
  if (!password) return 0;

  let score = 0;

  // Length checks
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;

  // Case mix
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;

  // Numbers and special characters
  if (/\d/.test(password) && /[^a-zA-Z0-9]/.test(password)) score++;

  return Math.min(score, 4);
};

/**
 * Get password strength color
 * @param {number} score - Password strength score (0-4)
 * @returns {string} CSS color value
 */
export const getPasswordStrengthColor = (score) => {
  const colors = [
    'var(--strength-1)', // Red
    'var(--strength-2)', // Orange
    'var(--strength-3)', // Yellow
    'var(--strength-4)', // Green
  ];
  return colors[score - 1] || 'var(--text-secondary)';
};

/**
 * Validate registration form
 * @param {object} data - Form data { name, email, password, confirmPassword, terms }
 * @returns {object} Validation result { isValid, errors }
 */
export const validateRegisterForm = (data) => {
  const errors = {};

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email validation
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  // Confirm password validation
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Terms validation
  if (!data.terms) {
    errors.terms = 'You must agree to the terms and conditions';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate login form
 * @param {object} data - Form data { email, password }
 * @returns {object} Validation result { isValid, errors }
 */
export const validateLoginForm = (data) => {
  const errors = {};

  // Email validation
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type: short, long, relative
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  const d = new Date(date);

  if (format === 'short') {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  if (format === 'long') {
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  if (format === 'relative') {
    const now = new Date();
    const diff = now - d;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return formatDate(date, 'short');
    }
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  }

  return d.toLocaleDateString();
};
