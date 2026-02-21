import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Overview', icon: 'fa-home' },
  { path: '/dashboard/community', label: 'Community', icon: 'fa-users' },
  { path: '/dashboard/events', label: 'Events', icon: 'fa-calendar' },
  { path: '/dashboard/analytics', label: 'Analytics', icon: 'fa-chart-line' },
  { path: '/dashboard/settings', label: 'Settings', icon: 'fa-cog' },
];

const navLinkClass = (active) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
    active ? 'bg-indigo-500/15 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
  }`;

const SidebarLogo = () => (
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
);

const UserDropdown = ({ logout }) => (
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
    <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-red-500/10 text-red-400 transition-colors">
      <i className="fas fa-sign-out-alt w-5 text-center" />
      <span className="text-sm">Logout</span>
    </button>
  </div>
);

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path) => path === '/dashboard' ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <>
      {isMobileOpen && (
        <div role="button" tabIndex={0} aria-label="Close menu" className="fixed inset-0 bg-black/50 z-40 lg:hidden cursor-default" onClick={() => setIsMobileOpen(false)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsMobileOpen(false); }} />
      )}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#050505]/95 backdrop-blur-lg border-r border-white/6
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <SidebarLogo />
        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.path} to={item.path} onClick={() => setIsMobileOpen(false)} className={navLinkClass(isActive(item.path))}>
              <i className={`fas ${item.icon} w-5 text-center`} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
          <div className="pt-4 border-t border-white/6 mt-4">
            <NavLink to="/dashboard/billing" onClick={() => setIsMobileOpen(false)} className={navLinkClass(isActive('/dashboard/billing'))}>
              <i className="fas fa-credit-card w-5 text-center" />
              <span className="font-medium">Billing</span>
            </NavLink>
          </div>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/6">
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <Avatar name={user?.name} size="sm" />
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">{user?.name}</p>
                <p className="text-xs text-white/40">{user?.email}</p>
              </div>
              <i className="fas fa-chevron-up text-white/40 text-xs" />
            </button>
            {isDropdownOpen && <UserDropdown logout={logout} />}
          </div>
        </div>
      </aside>
      <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-indigo-500 text-white shadow-glow-hover flex items-center justify-center">
        <i className={`fas ${isMobileOpen ? 'fa-times' : 'fa-bars'} text-lg`} />
      </button>
    </>
  );
};

export default Sidebar;
