import { calculatePasswordStrength, getPasswordStrengthColor } from '../../utils/validation';

/**
 * PasswordStrengthBar Component - 4-segment password strength indicator
 * @param {string} password - Password to evaluate
 */
const PasswordStrengthBar = ({ password }) => {
  const strength = calculatePasswordStrength(password);

  const segments = [
    { level: 1, label: 'Weak' },
    { level: 2, label: 'Fair' },
    { level: 3, label: 'Good' },
    { level: 4, label: 'Strong' },
  ];

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {segments.map((segment) => {
          const isActive = strength >= segment.level;
          const color = isActive ? getPasswordStrengthColor(segment.level) : 'var(--text-secondary)';
          return (
            <div
              key={segment.level}
              className="flex-1 h-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: color,
                opacity: isActive ? 1 : 0.2,
              }}
            />
          );
        })}
      </div>
      <p className="text-xs text-white/40 mt-2">
        {strength === 0 && 'Enter a password'}
        {strength === 1 && 'Weak - Add more characters'}
        {strength === 2 && 'Fair - Add numbers or symbols'}
        {strength === 3 && 'Good - Make it longer'}
        {strength === 4 && 'Strong - Great password!'}
      </p>
    </div>
  );
};

export default PasswordStrengthBar;
