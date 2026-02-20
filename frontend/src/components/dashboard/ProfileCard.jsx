import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { formatDate } from '../../utils/validation';

/**
 * ProfileCard Component - Displays current user profile
 */
const ProfileCard = () => {
  const { user } = useAuth();

  return (
    <div className="glass-card p-6 fade-in stagger-4">
      {/* Avatar and Name */}
      <div className="flex flex-col items-center text-center">
        <Avatar name={user?.name} size="2xl" className="mb-4" />
        <h3 className="font-display font-bold text-xl text-white">{user?.name}</h3>
        <p className="text-sm text-white/40 mt-1">{user?.email}</p>
        <Badge variant="accent" className="mt-3">
          {user?.role}
        </Badge>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-white/6" />

      {/* Meta Information */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/40">Account Status</span>
          <Badge variant="success" icon="fa-check-circle">
            Active
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/40">Provider</span>
          <span className="text-sm text-white capitalize">{user?.provider}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/40">Member Since</span>
          <span className="text-sm text-white">
            {formatDate(user?.createdAt, 'short')}
          </span>
        </div>
        {user?.lastLogin && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/40">Last Login</span>
            <span className="text-sm text-white">
              {formatDate(user.lastLogin, 'short')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
