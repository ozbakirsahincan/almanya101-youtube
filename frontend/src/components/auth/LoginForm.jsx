import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { validateLoginForm } from '../../utils/validation';
import FormInput from './FormInput';

const RememberMeRow = ({ checked, onChange }) => (
  <div className="flex items-center justify-between">
    <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer hover:text-white/80 transition-colors">
      <input
        type="checkbox"
        name="rememberMe"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0"
      />
      Remember me
    </label>
    <button type="button" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
      Forgot password?
    </button>
  </div>
);

const LoginSubmitButton = ({ loading }) => (
  <button type="submit" disabled={loading} className="btn-primary h-12">
    {loading ? <span className="spinner" /> : (
      <><i className="fas fa-sign-in-alt" /><span>Sign In</span></>
    )}
  </button>
);

const LoginForm = () => {
  const { login } = useAuth();
  const { error } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateLoginForm(formData);
    if (!validation.isValid) { setErrors(validation.errors); return; }
    setLoading(true);
    try {
      const result = await login(formData.email, formData.password, formData.rememberMe);
      if (!result.success) setErrors({ password: result.message });
    } catch {
      error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 tab-content visible">
      <FormInput type="email" icon="fa-envelope" placeholder="Enter your email" name="email"
        value={formData.email} onChange={handleChange} error={!!errors.email} errorMessage={errors.email} autoComplete="email" />
      <FormInput type="password" icon="fa-lock" placeholder="Enter your password" name="password"
        value={formData.password} onChange={handleChange} error={!!errors.password} errorMessage={errors.password}
        showPasswordToggle autoComplete="current-password" />
      <RememberMeRow checked={formData.rememberMe} onChange={handleChange} />
      <LoginSubmitButton loading={loading} />
    </form>
  );
};

export default LoginForm;
