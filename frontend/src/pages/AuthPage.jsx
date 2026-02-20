import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import TabSwitcher from '../components/auth/TabSwitcher';
import SocialLogin from '../components/auth/SocialLogin';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import HeroCard from '../components/bento/HeroCard';
import StatsCard from '../components/bento/StatsCard';
import FeatureCard from '../components/bento/FeatureCard';

/**
 * AuthPage - Main authentication page with bento grid layout
 */
const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, loginWithGoogle, loginWithGithub } = useAuth();
  const { info } = useToast();
  const [activeTab, setActiveTab] = useState('login');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handle OAuth error from URL params
  useEffect(() => {
    const oauthError = searchParams.get('error');
    if (oauthError === 'oauth_failed') {
      info('OAuth login failed. Please try again.');
    }
  }, [searchParams, info]);

  // Handle tab switch
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bento-grid items-center">
          {/* Left Bento Panel - 7 columns */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HeroCard />
            <StatsCard type="users" />
            <StatsCard type="security" />
            <StatsCard type="api" />
            <FeatureCard />
          </div>

          {/* Right Auth Panel - 5 columns */}
          <div className="col-span-12 lg:col-span-5">
            <div className="glass-card p-8 fade-in stagger-4">
              {/* Tab Switcher */}
              <TabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/6" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white/40">
                    or continue with email
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <SocialLogin
                onGoogleLogin={loginWithGoogle}
                onGithubLogin={loginWithGithub}
              />

              {/* Forms */}
              <div className="mt-6">
                {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
              </div>

              {/* Switch Tab Link */}
              <div className="mt-6 text-center text-sm text-white/40">
                {activeTab === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      onClick={() => setActiveTab('register')}
                      className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setActiveTab('login')}
                      className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
