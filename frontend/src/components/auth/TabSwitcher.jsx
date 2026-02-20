/**
 * TabSwitcher Component - Pill-style tab switcher for login/register
 * @param {string} activeTab - Currently active tab: 'login' | 'register'
 * @param {function} onTabChange - Callback when tab changes
 */
const TabSwitcher = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex bg-white/5 rounded-xl p-1">
      <button
        onClick={() => onTabChange('login')}
        className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-300
          ${activeTab === 'login'
            ? 'bg-indigo-500/15 text-white shadow-[0_0_20px_rgba(99,102,241,0.15)]'
            : 'text-white/40 hover:text-white'}`}
      >
        Login
      </button>
      <button
        onClick={() => onTabChange('register')}
        className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-300
          ${activeTab === 'register'
            ? 'bg-indigo-500/15 text-white shadow-[0_0_20px_rgba(99,102,241,0.15)]'
            : 'text-white/40 hover:text-white'}`}
      >
        Register
      </button>
    </div>
  );
};

export default TabSwitcher;
