import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { isDemoMode, getMockUsersData } from '../utils/demoMode';
import { getAllUsers } from '../api/users';
import UserCard from '../components/dashboard/UserCard';

const CITIES = ['San Francisco', 'New York', 'London', 'Berlin'];
const TECHS = ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'];

const FilterBar = ({ searchTerm, selectedCity, selectedTech, onSearch, onCity, onTech }) => (
  <div className="glass-card p-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bento-input-wrapper">
        <i className="fas fa-search bento-input-icon" />
        <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => onSearch(e.target.value)} className="bento-input" />
      </div>
      <div className="bento-input-wrapper">
        <i className="fas fa-map-marker-alt bento-input-icon" />
        <select value={selectedCity} onChange={(e) => onCity(e.target.value)} className="bento-input appearance-none cursor-pointer">
          <option value="">All Cities</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-xs" />
      </div>
      <div className="bento-input-wrapper">
        <i className="fas fa-code bento-input-icon" />
        <select value={selectedTech} onChange={(e) => onTech(e.target.value)} className="bento-input appearance-none cursor-pointer">
          <option value="">All Technologies</option>
          {TECHS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-xs" />
      </div>
    </div>
  </div>
);

const CommunityPage = () => {
  const { isDemo } = useAuth();
  const { info } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTech, setSelectedTech] = useState('');

  const { data: usersData, isLoading } = useQuery({
    queryKey: ['users', searchTerm, selectedCity, selectedTech],
    queryFn: async () => {
      if (isDemoMode()) return getMockUsersData();
      const response = await getAllUsers({ search: searchTerm, city: selectedCity, techStack: selectedTech });
      if (response.data.success) return response.data.data;
      throw new Error('Failed to load users');
    },
  });

  useEffect(() => {
    if (isDemo) info('Demo mode active - Using mock data');
  }, [isDemo, info]);

  const users = usersData?.users || [];

  return (
    <div className="space-y-6">
      <FilterBar searchTerm={searchTerm} selectedCity={selectedCity} selectedTech={selectedTech} onSearch={setSearchTerm} onCity={setSelectedCity} onTech={setSelectedTech} />
      {isLoading ? (
        <div className="glass-card p-12 flex items-center justify-center"><div className="spinner w-8 h-8" /></div>
      ) : users.length === 0 ? (
        <div className="glass-card p-12 flex flex-col items-center justify-center">
          <i className="fas fa-users text-4xl text-white/20 mb-4" />
          <p className="text-white/40">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => <UserCard key={user.id} user={user} />)}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
