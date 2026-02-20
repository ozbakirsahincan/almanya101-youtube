/**
 * QuickActions Component - Displays quick action buttons
 */
const QuickActions = () => {
  const actions = [
    {
      icon: 'fa-folder-plus',
      label: 'New Project',
      color: 'hover:bg-indigo-500/20 hover:border-indigo-500/30 hover:text-indigo-400',
    },
    {
      icon: 'fa-user-plus',
      label: 'Invite Team',
      color: 'hover:bg-emerald-500/20 hover:border-emerald-500/30 hover:text-emerald-400',
    },
    {
      icon: 'fa-file-export',
      label: 'Export Report',
      color: 'hover:bg-purple-500/20 hover:border-purple-500/30 hover:text-purple-400',
    },
  ];

  return (
    <div className="glass-card p-6 fade-in stagger-5">
      <h3 className="font-display font-bold text-lg text-white mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg border border-white/8 text-white/60
              transition-all duration-300 ${action.color}`}
          >
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
              <i className={`fas ${action.icon}`} />
            </div>
            <span className="font-medium">{action.label}</span>
            <i className="fas fa-chevron-right ml-auto" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
