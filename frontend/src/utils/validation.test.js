import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
  isValidEmail,
  calculatePasswordStrength,
  getPasswordStrengthColor,
  validateRegisterForm,
  validateLoginForm,
  formatDate,
} from './validation';

describe('isValidEmail', () => {
  test('should return true for valid emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co')).toBe(true);
    expect(isValidEmail('user+tag@example.org')).toBe(true);
    expect(isValidEmail('123@test.io')).toBe(true);
  });

  test('should return false for invalid emails', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('missing@domain')).toBe(false);
    expect(isValidEmail('@nodomain.com')).toBe(false);
    expect(isValidEmail('spaces in@email.com')).toBe(false);
  });
});

describe('calculatePasswordStrength', () => {
  test('should return 0 for empty password', () => {
    expect(calculatePasswordStrength('')).toBe(0);
    expect(calculatePasswordStrength(null)).toBe(0);
    expect(calculatePasswordStrength(undefined)).toBe(0);
  });

  test('should return 1 for short password (6+ chars)', () => {
    expect(calculatePasswordStrength('123456')).toBe(1);
    expect(calculatePasswordStrength('abcdef')).toBe(1);
  });

  test('should return 2 for medium password (10+ chars)', () => {
    expect(calculatePasswordStrength('1234567890')).toBe(2);
  });

  test('should return 3 for password with mixed case', () => {
    expect(calculatePasswordStrength('Abcdefghij')).toBe(3);
  });

  test('should return 4 for strong password', () => {
    expect(calculatePasswordStrength('Abcdef123!')).toBe(4);
    expect(calculatePasswordStrength('Password123$')).toBe(4);
    expect(calculatePasswordStrength('MyStr0ng@Pass')).toBe(4);
  });
});

describe('getPasswordStrengthColor', () => {
  test('should return correct color for each strength level', () => {
    expect(getPasswordStrengthColor(1)).toBe('var(--strength-1)');
    expect(getPasswordStrengthColor(2)).toBe('var(--strength-2)');
    expect(getPasswordStrengthColor(3)).toBe('var(--strength-3)');
    expect(getPasswordStrengthColor(4)).toBe('var(--strength-4)');
  });

  test('should return secondary color for invalid scores', () => {
    expect(getPasswordStrengthColor(0)).toBe('var(--text-secondary)');
    expect(getPasswordStrengthColor(-1)).toBe('var(--text-secondary)');
    expect(getPasswordStrengthColor(5)).toBe('var(--text-secondary)');
  });
});

describe('validateRegisterForm', () => {
  test('should pass for valid data', () => {
    const result = validateRegisterForm({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      terms: true,
    });

    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors).length).toBe(0);
  });

  test('should fail for short name', () => {
    const result = validateRegisterForm({
      name: 'J',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      terms: true,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  test('should fail for invalid email', () => {
    const result = validateRegisterForm({
      name: 'John Doe',
      email: 'invalid',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      terms: true,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  test('should fail for short password', () => {
    const result = validateRegisterForm({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345',
      confirmPassword: '12345',
      terms: true,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.password).toBeDefined();
  });

  test('should fail for mismatched passwords', () => {
    const result = validateRegisterForm({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Different123!',
      terms: true,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.confirmPassword).toBe('Passwords do not match');
  });

  test('should fail if terms not accepted', () => {
    const result = validateRegisterForm({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      terms: false,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.terms).toBeDefined();
  });
});

describe('validateLoginForm', () => {
  test('should pass for valid data', () => {
    const result = validateLoginForm({
      email: 'john@example.com',
      password: 'Password123!',
    });

    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors).length).toBe(0);
  });

  test('should fail for invalid email', () => {
    const result = validateLoginForm({
      email: 'invalid',
      password: 'Password123!',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  test('should fail for short password', () => {
    const result = validateLoginForm({
      email: 'john@example.com',
      password: '12345',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.password).toBeDefined();
  });
});

describe('formatDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-21T12:00:00Z'));
  });

  test('should format date in short format', () => {
    const result = formatDate('2026-02-21', 'short');
    expect(result).toMatch(/Feb/);
    expect(result).toMatch(/21/);
    expect(result).toMatch(/2026/);
  });

  test('should format date in long format', () => {
    const result = formatDate('2026-02-21', 'long');
    expect(result).toContain('Saturday');
    expect(result).toContain('February');
  });

  test('should format relative time for recent dates', () => {
    const now = new Date('2026-02-21T12:00:00Z');
    
    const fiveMinutesAgo = new Date(now - 5 * 60 * 1000);
    expect(formatDate(fiveMinutesAgo, 'relative')).toBe('5 minutes ago');

    const oneHourAgo = new Date(now - 60 * 60 * 1000);
    expect(formatDate(oneHourAgo, 'relative')).toBe('1 hour ago');

    const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
    expect(formatDate(oneDayAgo, 'relative')).toBe('1 day ago');
  });

  test('should return "Just now" for very recent dates', () => {
    const result = formatDate(new Date(), 'relative');
    expect(result).toBe('Just now');
  });
});
