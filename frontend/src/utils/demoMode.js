export const isDemoMode = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return token?.startsWith('demo_token_') || false;
};

export const generateDemoToken = () =>
  `demo_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const createDemoUser = (userData) => {
  const token = generateDemoToken();
  return {
    id: token,
    name: userData.name || 'Demo User',
    email: userData.email || 'demo@example.com',
    role: 'user',
    avatar: null,
    provider: 'local',
    bio: '',
    city: '',
    country: '',
    techStack: [],
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };
};

const MOCK_STATS = {
  totalUsers: 1234,
  activeUsers: 892,
  newUsersThisWeek: 47,
  serverUptime: '99.9%',
};

const MOCK_RECENT_USERS = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', avatar: null, provider: 'google', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'admin', avatar: null, provider: 'github', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: '3', name: 'Carol Williams', email: 'carol@example.com', role: 'user', avatar: null, provider: 'local', createdAt: new Date(Date.now() - 10800000).toISOString() },
  { id: '4', name: 'David Brown', email: 'david@example.com', role: 'user', avatar: null, provider: 'google', createdAt: new Date(Date.now() - 14400000).toISOString() },
];

const MOCK_CURRENT_USER = {
  id: 'demo_user',
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'user',
  avatar: null,
  provider: 'local',
  lastLogin: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

export const getMockDashboardData = () => ({
  stats: MOCK_STATS,
  recentUsers: MOCK_RECENT_USERS,
  currentUser: MOCK_CURRENT_USER,
});

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'React Workshop 2026',
    description: 'Learn the latest React features and best practices',
    date: new Date(Date.now() + 86400000 * 7).toISOString(),
    type: 'workshop',
    location: 'Online',
    isOnline: true,
    maxAttendees: 50,
    attendees: [],
    createdBy: { name: 'Demo User' },
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Tech Meetup February',
    description: 'Monthly tech meetup for developers',
    date: new Date(Date.now() + 86400000 * 14).toISOString(),
    type: 'meetup',
    location: 'San Francisco, CA',
    isOnline: false,
    maxAttendees: 100,
    attendees: [],
    createdBy: { name: 'Demo User' },
    createdAt: new Date().toISOString(),
  },
];

export const getMockEventsData = () => ({
  events: MOCK_EVENTS,
  pagination: { page: 1, limit: 20, total: 2, pages: 1 },
});

const MOCK_USERS = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', avatar: null, provider: 'google', bio: 'Full-stack developer passionate about React', city: 'San Francisco', country: 'USA', techStack: ['React', 'Node.js', 'TypeScript'], createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'admin', avatar: null, provider: 'github', bio: 'Software architect with 10+ years experience', city: 'New York', country: 'USA', techStack: ['Python', 'AWS', 'Docker'], createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: '3', name: 'Carol Williams', email: 'carol@example.com', role: 'user', avatar: null, provider: 'local', bio: 'UI/UX designer transitioning to frontend development', city: 'London', country: 'UK', techStack: ['Figma', 'React', 'CSS'], createdAt: new Date(Date.now() - 10800000).toISOString() },
];

export const getMockUsersData = () => ({
  users: MOCK_USERS,
  pagination: { page: 1, limit: 20, total: 3, pages: 1 },
});
