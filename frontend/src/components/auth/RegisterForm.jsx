import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { validateRegisterForm, calculatePasswordStrength } from '../../utils/validation';
import FormInput from './FormInput';
import PasswordStrengthBar from './PasswordStrengthBar';

/**
 * RegisterForm Component - Registration form with password strength
 */
const RegisterForm = () => {
  const { register } = useAuth();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Real-time password match check
  useEffect(() => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match',
      }));
    } else if (errors.confirmPassword === 'Passwords do not match') {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  }, [formData.password, formData.confirmPassword, errors.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client validation
    const validation = validateRegisterForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      const result = await register(formData);
      if (result.success) {
        if (result.isDemo) {
          success('Demo mode activated - Using mock data');
        } else {
          success('Registration successful!');
        }
        // Redirect happens automatically from AuthContext
      } else {
        setErrors({ email: result.message });
      }
    } catch (err) {
      error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 tab-content visible">
      <FormInput
        type="text"
        icon="fa-user"
        placeholder="Full name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        errorMessage={errors.name}
        autoComplete="name"
      />

      <FormInput
        type="email"
        icon="fa-envelope"
        placeholder="Email address"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        errorMessage={errors.email}
        autoComplete="email"
      />

      <div>
        <FormInput
          type="password"
          icon="fa-lock"
          placeholder="Create password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          errorMessage={errors.password}
          showPasswordToggle
          autoComplete="new-password"
        />
        {formData.password && <PasswordStrengthBar password={formData.password} />}
      </div>

      <FormInput
        type="password"
        icon="fa-lock"
        placeholder="Confirm password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword}
        showPasswordToggle
        autoComplete="new-password"
      />

      <label className={`flex items-start gap-3 text-sm text-white/60 cursor-pointer hover:text-white/80 transition-colors ${errors.terms ? 'text-red-400' : ''}`}>
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0"
        />
        <span>
          I agree to the{' '}
          <button type="button" className="text-indigo-400 hover:text-indigo-300">
            Terms of Service
          </button>{' '}
          and{' '}
          <button type="button" className="text-indigo-400 hover:text-indigo-300">
            Privacy Policy
          </button>
        </span>
      </label>
      {errors.terms && <p className="text-xs text-red-400 -mt-2">⚠ {errors.terms}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary h-12"
      >
        {loading ? (
          <span className="spinner" />
        ) : (
          <>
            <i className="fas fa-user-plus" />
            <span>Create Account</span>
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
