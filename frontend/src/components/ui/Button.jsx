import { forwardRef } from 'react';

/**
 * Button Component - Reusable button with variants
 * @param {string} variant - Variant: primary, secondary, ghost
 * @param {boolean} loading - Show loading spinner
 * @param {boolean} disabled - Disable button
 * @param {string} icon - Optional FontAwesome icon class
 * @param {string} size - Size: sm, md, lg
 */
const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      loading = false,
      disabled = false,
      icon,
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'font-medium transition-all duration-300 flex items-center justify-center gap-2 rounded-lg border';

    const variantClasses = {
      primary: 'btn-primary border-transparent',
      secondary: 'bg-transparent border-white/10 hover:border-white/20 hover:bg-white/5 text-white',
      ghost: 'bg-transparent border-transparent hover:bg-white/5 text-white',
    };

    const sizeClasses = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${loading ? 'opacity-60 cursor-not-allowed' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="spinner" />
        ) : icon ? (
          <i className={`fas ${icon}`} />
        ) : null}
        {!loading && children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
