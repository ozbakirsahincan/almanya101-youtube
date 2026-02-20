import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { isDemoMode, getMockUsersData } from '../utils/demoMode';
import { getAllUsers } from '../api/users';
import UserCard from '../components/dashboard/UserCard';

/**
 * CommunityPage - User discovery and community page
 */
const CommunityPage = () => {
  const { isDemo } = useAuth();
  const { info } = useToast();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTech, setSelectedTech] = useState('');

  // Fetch users data
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['users', searchTerm, selectedCity, selectedTech],
    queryFn: async () => {
      if (isDemoMode()) {
        return getMockUsersData();
      }

      const response = await getAllUsers({
        search: searchTerm,
        city: selectedCity,
        techStack: selectedTech,
      });
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to load users');
    },
    enabled: mounted,
  });

  useEffect(() => {
    setMounted(true);
    if (isDemo) {
      info('Demo mode active - Using mock data');
    }
  }, [isDemo, info]);

  const users = usersData?.users || [];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="bento-input-wrapper">
            <i className="fas fa-search bento-input-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bento-input"
            />
          </div>

          {/* City Filter */}
          <div className="bento-input-wrapper">
            <i className="fas fa-map-marker-alt bento-input-icon" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bento-input appearance-none cursor-pointer"
            >
              <option value="">All Cities</option>
              <option value="San Francisco">San Francisco</option>
              <option value="New York">New York</option>
              <option value="London">London</option>
              <option value="Berlin">Berlin</option>
            </select>
            <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-xs" />
          </div>

          {/* Tech Stack Filter */}
          <div className="bento-input-wrapper">
            <i className="fas fa-code bento-input-icon" />
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="bento-input appearance-none cursor-pointer"
            >
              <option value="">All Technologies</option>
              <option value="React">React</option>
              <option value="Node.js">Node.js</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Python">Python</option>
              <option value="AWS">AWS</option>
              <option value="Docker">Docker</option>
            </select>
            <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-xs" />
          </div>
        </div>
      </div>

      {/* Users Grid */}
      {isLoading ? (
        <div className="glass-card p-12 flex items-center justify-center">
          <div className="spinner w-8 h-8" />
        </div>
      ) : users.length === 0 ? (
        <div className="glass-card p-12 flex flex-col items-center justify-center">
          <i className="fas fa-users text-4xl text-white/20 mb-4" />
          <p className="text-white/40">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
