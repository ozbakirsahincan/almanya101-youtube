import Badge from '../ui/Badge';

const BAR_HEIGHTS = [40, 65, 45, 80, 55, 90, 70];

const UsersCard = () => (
  <>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 pulse" />
        <Badge variant="success">Active</Badge>
      </div>
    </div>
    <p className="font-display font-bold text-4xl text-white mb-1">2,847</p>
    <p className="text-sm text-white/40">Total Users</p>
    <div className="flex items-end gap-1 mt-4 h-12">
      {BAR_HEIGHTS.map((height, index) => (
        <div
          key={height}
          className="flex-1 rounded-t"
          style={{
            height: `${height}%`,
            background: `linear-gradient(to top, rgba(99, 102, 241, 0.3), ${index === 6 ? '#6366F1' : 'rgba(99, 102, 241, 0.5)'})`,
          }}
        />
      ))}
    </div>
  </>
);

const SecurityCard = () => (
  <>
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
        <i className="fas fa-shield-alt text-emerald-400" />
      </div>
      <Badge variant="success" icon="fa-check-circle">Secure</Badge>
    </div>
    <p className="font-display font-bold text-3xl text-white mb-1">256-bit</p>
    <p className="text-sm text-white/40 mb-2">SSL Encryption</p>
    <p className="text-xs text-emerald-400">JWT + bcrypt</p>
  </>
);

const ApiCard = () => (
  <>
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
        <i className="fas fa-bolt text-indigo-400" />
      </div>
      <Badge variant="accent">99.9%</Badge>
    </div>
    <p className="font-display font-bold text-3xl text-white mb-1">12.4M</p>
    <p className="text-sm text-white/40 mb-3">API Requests</p>
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
        style={{ width: '78%' }}
      />
    </div>
    <p className="text-xs text-white/40 mt-1">78% of monthly quota</p>
  </>
);

const CARD_CONTENT = { users: UsersCard, security: SecurityCard, api: ApiCard };

const StatsCard = ({ type }) => {
  const Content = CARD_CONTENT[type];
  return (
    <div className={`glass-card p-6 relative overflow-hidden ${
      type === 'users' ? 'col-span-1 row-span-2' : ''
    } fade-in stagger-2`}>
      {Content && <Content />}
    </div>
  );
};

export default StatsCard;
