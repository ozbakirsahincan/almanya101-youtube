/**
 * GlassCard Component - Reusable glass-morphism card
 * @param {string} className - Additional classes
 * @param {object} children - Card content
 */
const GlassCard = ({ className = '', children }) => {
  return (
    <div className={`glass-card ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
