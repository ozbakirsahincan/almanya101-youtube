import { useLocation } from 'react-router-dom';

/**
 * Header Component - Page header with title and actions
 */
const Header = ({ title, subtitle, onSidebarToggle }) => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return { title: 'Overview', subtitle: 'Welcome back! Here\'s what\'s happening.' };
    if (path.includes('/community')) return { title: 'Community', subtitle: 'Connect with other developers' };
    if (path.includes('/events')) return { title: 'Events', subtitle: 'Discover and join upcoming events' };
    if (path.includes('/analytics')) return { title: 'Analytics', subtitle: 'Track your performance and growth' };
    if (path.includes('/settings')) return { title: 'Settings', subtitle: 'Manage your account preferences' };
    if (path.includes('/billing')) return { title: 'Billing', subtitle: 'Manage your subscription' };
    return { title: 'Dashboard', subtitle: '' };
  };

  const pageTitle = title || getPageTitle().title;
  const pageSubtitle = subtitle || getPageTitle().subtitle;

  return (
    <header className="flex items-center justify-between gap-6 pb-6 border-b border-white/6">
      {/* Page Title */}
      <div>
        <h1 className="font-display font-bold text-2xl text-white">{pageTitle}</h1>
        {pageSubtitle && (
          <p className="text-sm text-white/40 mt-1">{pageSubtitle}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative w-10 h-10 rounded-lg border border-white/8 hover:border-white/12 hover:bg-white/5 transition-all flex items-center justify-center text-white/40 hover:text-white">
          <i className="fas fa-bell" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full pulse" />
        </button>

        {/* New Project Button */}
        <button className="hidden sm:flex items-center gap-2 px-4 h-10 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 hover:shadow-glow-hover transition-all">
          <i className="fas fa-plus" />
          <span>New Project</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
