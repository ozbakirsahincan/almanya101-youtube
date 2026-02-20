import Badge from '../ui/Badge';

/**
 * StatCard Component - Displays a statistic with trend
 * @param {string} icon - FontAwesome icon class
 * @param {string} title - Stat title
 * @param {string|number} value - Stat value
 * @param {string} trend - Trend: up, down, neutral
 * @param {number} trendValue - Trend percentage
 * @param {string} badgeVariant - Badge color variant
 */
const StatCard = ({ icon, title, value, trend = 'neutral', trendValue, badgeVariant = 'accent' }) => {
  const trendConfig = {
    up: { icon: 'fa-arrow-up', color: 'text-emerald-400' },
    down: { icon: 'fa-arrow-down', color: 'text-red-400' },
    neutral: { icon: 'fa-minus', color: 'text-white/40' },
  };

  const currentTrend = trendConfig[trend];

  return (
    <div className="glass-card p-6 fade-in stagger-1">
      <div className="flex items-start justify-between">
        {/* Icon Badge */}
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
          <i className={`fas ${icon} text-indigo-400 text-xl`} />
        </div>

        {/* Trend Badge */}
        {trendValue && (
          <Badge variant={badgeVariant} icon={currentTrend.icon}>
            {trendValue}%
          </Badge>
        )}
      </div>

      {/* Value */}
      <div className="mt-4">
        <p className="font-display font-bold text-3xl text-white">{value}</p>
        <p className="text-sm text-white/40 mt-1">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
