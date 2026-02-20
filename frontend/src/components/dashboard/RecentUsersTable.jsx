import { useState } from 'react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { formatDate } from '../../utils/validation';

/**
 * RecentUsersTable Component - Displays table of recent users
 * @param {array} users - Array of user objects
 * @param {boolean} loading - Loading state
 */
const RecentUsersTable = ({ users = [], loading = false }) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  if (loading) {
    return (
      <div className="glass-card p-8 flex items-center justify-center min-h-[400px]">
        <div className="spinner w-8 h-8" />
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[400px]">
        <i className="fas fa-users text-4xl text-white/20 mb-4" />
        <p className="text-white/40">No users found</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden fade-in stagger-3">
      {/* Header */}
      <div className="p-6 border-b border-white/6 flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-lg text-white">Recent Users</h2>
          <p className="text-sm text-white/40 mt-1">Latest registered users</p>
        </div>
        <button className="w-10 h-10 rounded-lg border border-white/8 hover:border-white/12 hover:bg-white/5 transition-all flex items-center justify-center text-white/40 hover:text-white">
          <i className="fas fa-sync-alt" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/6">
              <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">
                User
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">
                Role
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">
                Joined
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id || index}
                className={`border-b border-white/4 transition-colors ${
                  hoveredRow === index ? 'bg-white/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={user.name} size="md" />
                    <div>
                      <p className="font-medium text-white">{user.name}</p>
                      <p className="text-sm text-white/40">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={user.role === 'admin' ? 'purple' : 'accent'}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-white/60">
                  {formatDate(user.createdAt, 'short')}
                </td>
                <td className="px-6 py-4">
                  <Badge variant="success" icon="fa-check-circle">
                    Active
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsersTable;
