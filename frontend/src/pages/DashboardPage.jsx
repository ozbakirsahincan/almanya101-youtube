import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { isDemoMode, getMockDashboardData } from '../utils/demoMode';
import { getDashboardData } from '../api/dashboard';
import StatCard from '../components/dashboard/StatCard';
import RecentUsersTable from '../components/dashboard/RecentUsersTable';
import ProfileCard from '../components/dashboard/ProfileCard';
import QuickActions from '../components/dashboard/QuickActions';

const DEFAULT_STATS = { totalUsers: 0, activeUsers: 0, newUsersThisWeek: 0, serverUptime: '0%' };

const StatsGrid = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard icon="fa-users" title="Total Users" value={stats.totalUsers} trend="up" trendValue="12" badgeVariant="success" />
    <StatCard icon="fa-user-check" title="Active Users" value={stats.activeUsers} trend="up" trendValue="8" badgeVariant="success" />
    <StatCard icon="fa-user-plus" title="New This Week" value={stats.newUsersThisWeek} trend="up" trendValue="24" badgeVariant="info" />
    <StatCard icon="fa-server" title="Server Uptime" value={stats.serverUptime} />
  </div>
);

const DashboardPage = () => {
  const { isDemo } = useAuth();
  const { info } = useToast();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      if (isDemoMode()) return getMockDashboardData();
      const response = await getDashboardData();
      if (response.data.success) return response.data.data;
      throw new Error('Failed to load dashboard data');
    },
  });

  useEffect(() => {
    if (isDemo) info('Demo mode active - Using mock data');
  }, [isDemo, info]);

  const stats = dashboardData?.stats || DEFAULT_STATS;
  const recentUsers = dashboardData?.recentUsers || [];

  return (
    <div className="space-y-6">
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentUsersTable users={recentUsers} loading={isLoading} />
        </div>
        <div className="space-y-6">
          <ProfileCard />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
