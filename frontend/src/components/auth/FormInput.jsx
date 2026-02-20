import { useState } from 'react';

/**
 * FormInput Component - Reusable input with icon and validation states
 * @param {string} type - Input type
 * @param {string} icon - FontAwesome icon class
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {boolean} error - Error state
 * @param {boolean} success - Success state
 * @param {string} errorMessage - Error message to display
 * @param {boolean} showPasswordToggle - Show password visibility toggle
 */
const FormInput = ({
  type = 'text',
  icon,
  placeholder,
  value,
  onChange,
  error = false,
  success = false,
  errorMessage = '',
  showPasswordToggle = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle && showPassword ? 'text' : type;

  return (
    <div className={className}>
      <div className="bento-input-wrapper">
        <i className={`fas ${icon} bento-input-icon`} />
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`bento-input ${error ? 'error' : ''} ${success ? 'success' : ''}`}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle"
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
          </button>
        )}
      </div>
      {/* Error Message - Fixed height to prevent layout shift */}
      {errorMessage && (
        <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
          <i className="fas fa-exclamation-triangle" />
          {errorMessage}
        </p>
      )}
      {!errorMessage && <p className="mt-2 min-[18px]" />} {/* Spacer */}
    </div>
  );
};

export default FormInput;
