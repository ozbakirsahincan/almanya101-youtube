/**
 * Badge Component - Displays status/category badges
 * @param {string} children - Badge content
 * @param {string} variant - Variant: success, info, purple, accent
 * @param {string} icon - Optional FontAwesome icon class
 */
const Badge = ({ children, variant = 'accent', icon }) => {
  const variantClasses = {
    success: 'badge-success',
    info: 'badge-info',
    purple: 'badge-purple',
    accent: 'badge-accent',
  };

  return (
    <span className={`badge ${variantClasses[variant]}`}>
      {icon && <i className={`fas ${icon}`} />}
      {children}
    </span>
  );
};

export default Badge;
