import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
  isDemoMode,
  generateDemoToken,
  createDemoUser,
  getMockDashboardData,
  getMockEventsData,
  getMockUsersData,
} from './demoMode';

describe('isDemoMode', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
    vi.stubGlobal('sessionStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  test('should return false when no token exists', () => {
    localStorage.getItem.mockReturnValue(null);
    sessionStorage.getItem.mockReturnValue(null);
    
    expect(isDemoMode()).toBe(false);
  });

  test('should return false for regular token', () => {
    localStorage.getItem.mockReturnValue('regular_jwt_token');
    
    expect(isDemoMode()).toBe(false);
  });

  test('should return true for demo token in localStorage', () => {
    localStorage.getItem.mockReturnValue('demo_token_12345');
    
    expect(isDemoMode()).toBe(true);
  });

  test('should return true for demo token in sessionStorage', () => {
    localStorage.getItem.mockReturnValue(null);
    sessionStorage.getItem.mockReturnValue('demo_token_67890');
    
    expect(isDemoMode()).toBe(true);
  });
});

describe('generateDemoToken', () => {
  test('should generate token starting with demo_token_', () => {
    const token = generateDemoToken();
    
    expect(token).toMatch(/^demo_token_/);
  });

  test('should generate unique tokens', () => {
    const token1 = generateDemoToken();
    const token2 = generateDemoToken();
    
    expect(token1).not.toBe(token2);
  });

  test('should include timestamp', () => {
    const before = Date.now();
    const token = generateDemoToken();
    const after = Date.now();
    
    const timestampMatch = token.match(/demo_token_(\d+)/);
    expect(timestampMatch).not.toBeNull();
    
    const timestamp = parseInt(timestampMatch[1]);
    expect(timestamp).toBeGreaterThanOrEqual(before);
    expect(timestamp).toBeLessThanOrEqual(after);
  });
});

describe('createDemoUser', () => {
  test('should create user with provided data', () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
    };
    
    const user = createDemoUser(userData);
    
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('user');
    expect(user.provider).toBe('local');
  });

  test('should use defaults for missing data', () => {
    const user = createDemoUser({});
    
    expect(user.name).toBe('Demo User');
    expect(user.email).toBe('demo@example.com');
  });

  test('should include all required fields', () => {
    const user = createDemoUser({ name: 'Test', email: 'test@test.com' });
    
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('role');
    expect(user).toHaveProperty('avatar');
    expect(user).toHaveProperty('provider');
    expect(user).toHaveProperty('bio');
    expect(user).toHaveProperty('city');
    expect(user).toHaveProperty('country');
    expect(user).toHaveProperty('techStack');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('lastLogin');
  });
});

describe('getMockDashboardData', () => {
  test('should return dashboard data with stats', () => {
    const data = getMockDashboardData();
    
    expect(data).toHaveProperty('stats');
    expect(data.stats).toHaveProperty('totalUsers');
    expect(data.stats).toHaveProperty('activeUsers');
    expect(data.stats).toHaveProperty('newUsersThisWeek');
    expect(data.stats).toHaveProperty('serverUptime');
  });

  test('should return recent users array', () => {
    const data = getMockDashboardData();
    
    expect(Array.isArray(data.recentUsers)).toBe(true);
    expect(data.recentUsers.length).toBeGreaterThan(0);
  });

  test('should return current user object', () => {
    const data = getMockDashboardData();
    
    expect(data).toHaveProperty('currentUser');
    expect(data.currentUser).toHaveProperty('id');
    expect(data.currentUser).toHaveProperty('name');
    expect(data.currentUser).toHaveProperty('email');
  });
});

describe('getMockEventsData', () => {
  test('should return events array', () => {
    const data = getMockEventsData();
    
    expect(Array.isArray(data.events)).toBe(true);
    expect(data.events.length).toBeGreaterThan(0);
  });

  test('should return pagination info', () => {
    const data = getMockEventsData();
    
    expect(data).toHaveProperty('pagination');
    expect(data.pagination).toHaveProperty('page');
    expect(data.pagination).toHaveProperty('limit');
    expect(data.pagination).toHaveProperty('total');
    expect(data.pagination).toHaveProperty('pages');
  });

  test('should have valid event structure', () => {
    const data = getMockEventsData();
    const event = data.events[0];
    
    expect(event).toHaveProperty('id');
    expect(event).toHaveProperty('title');
    expect(event).toHaveProperty('description');
    expect(event).toHaveProperty('date');
    expect(event).toHaveProperty('type');
    expect(event).toHaveProperty('location');
  });
});

describe('getMockUsersData', () => {
  test('should return users array', () => {
    const data = getMockUsersData();
    
    expect(Array.isArray(data.users)).toBe(true);
    expect(data.users.length).toBeGreaterThan(0);
  });

  test('should return pagination info', () => {
    const data = getMockUsersData();
    
    expect(data).toHaveProperty('pagination');
  });

  test('should have valid user structure', () => {
    const data = getMockUsersData();
    const user = data.users[0];
    
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('role');
    expect(user).toHaveProperty('techStack');
  });
});
