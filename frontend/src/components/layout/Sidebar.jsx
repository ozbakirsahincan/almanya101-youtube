import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

/**
 * Sidebar Component - Main navigation sidebar
 */
const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: 'fa-home' },
    { path: '/dashboard/community', label: 'Community', icon: 'fa-users' },
    { path: '/dashboard/events', label: 'Events', icon: 'fa-calendar' },
    { path: '/dashboard/analytics', label: 'Analytics', icon: 'fa-chart-line' },
    { path: '/dashboard/settings', label: 'Settings', icon: 'fa-cog' },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#050505]/95 backdrop-blur-lg border-r border-white/6
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <i className="fas fa-cube text-white text-lg" />
            </div>
            <span className="font-logo font-extrabold text-xl tracking-tight">
              Bento<span className="text-gradient">Auth</span>
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive(item.path) ? 'bg-indigo-500/15 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <i className={`fas ${item.icon} w-5 text-center`} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}

          {/* Divider */}
          <div className="pt-4 border-t border-white/6 mt-4">
            <NavLink
              to="/dashboard/billing"
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive('/dashboard/billing') ? 'bg-indigo-500/15 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <i className="fas fa-credit-card w-5 text-center" />
              <span className="font-medium">Billing</span>
            </NavLink>
          </div>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/6">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Avatar name={user?.name} size="sm" />
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">{user?.name}</p>
                <p className="text-xs text-white/40">{user?.email}</p>
              </div>
              <i className="fas fa-chevron-up text-white/40 text-xs" />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-[#050505] border border-white/6 rounded-xl shadow-glow">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/5 transition-colors">
                  <i className="fas fa-user text-white/40 w-5 text-center" />
                  <span className="text-sm">View Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/5 transition-colors">
                  <i className="fas fa-cog text-white/40 w-5 text-center" />
                  <span className="text-sm">Account Settings</span>
                </button>
                <div className="my-1 border-t border-white/6" />
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-red-500/10 text-red-400 transition-colors"
                >
                  <i className="fas fa-sign-out-alt w-5 text-center" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-indigo-500 text-white shadow-glow-hover flex items-center justify-center"
      >
        <i className={`fas ${isMobileOpen ? 'fa-times' : 'fa-bars'} text-lg`} />
      </button>
    </>
  );
};

export default Sidebar;
