import Badge from '../ui/Badge';

/**
 * FeatureCard Component - Bento feature list card
 */
const FeatureCard = () => {
  const features = [
    { icon: 'fa-check-circle', text: 'Free to start' },
    { icon: 'fa-check-circle', text: 'No credit card required' },
    { icon: 'fa-check-circle', text: '24/7 support available' },
    { icon: 'fa-check-circle', text: 'GDPR compliant' },
  ];

  return (
    <div className="glass-card p-6 fade-in stagger-3">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
          <i className="fas fa-star text-purple-400" />
        </div>
        <Badge variant="purple">Features</Badge>
      </div>

      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3 text-white/80">
            <i className={`fas ${feature.icon} text-emerald-400`} />
            <span className="text-sm">{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;
