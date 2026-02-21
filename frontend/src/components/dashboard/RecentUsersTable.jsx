import { useState } from 'react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { formatDate } from '../../utils/validation';

const TABLE_COLS = ['User', 'Role', 'Joined', 'Status'];
const EMPTY_USERS = [];

const TableLoading = () => (
  <div className="glass-card p-8 flex items-center justify-center min-h-[400px]">
    <div className="spinner w-8 h-8" />
  </div>
);

const TableEmpty = () => (
  <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[400px]">
    <i className="fas fa-users text-4xl text-white/20 mb-4" />
    <p className="text-white/40">No users found</p>
  </div>
);

const UserTableRow = ({ user, index, hoveredRow, onMouseEnter, onMouseLeave }) => (
  <tr
    className={`border-b border-white/4 transition-colors ${hoveredRow === index ? 'bg-white/5' : ''}`}
    onMouseEnter={() => onMouseEnter(index)}
    onMouseLeave={onMouseLeave}
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
      <Badge variant={user.role === 'admin' ? 'purple' : 'accent'}>{user.role}</Badge>
    </td>
    <td className="px-6 py-4 text-sm text-white/60">{formatDate(user.createdAt, 'short')}</td>
    <td className="px-6 py-4">
      <Badge variant="success" icon="fa-check-circle">Active</Badge>
    </td>
  </tr>
);

const RecentUsersTable = ({ users = EMPTY_USERS, loading = false }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  if (loading) return <TableLoading />;
  if (!users || users.length === 0) return <TableEmpty />;
  return (
    <div className="glass-card overflow-hidden fade-in stagger-3">
      <div className="p-6 border-b border-white/6 flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-lg text-white">Recent Users</h2>
          <p className="text-sm text-white/40 mt-1">Latest registered users</p>
        </div>
        <button className="w-10 h-10 rounded-lg border border-white/8 hover:border-white/12 hover:bg-white/5 transition-all flex items-center justify-center text-white/40 hover:text-white">
          <i className="fas fa-sync-alt" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/6">
              {TABLE_COLS.map((col) => (
                <th key={col} className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserTableRow key={user.id || index} user={user} index={index} hoveredRow={hoveredRow} onMouseEnter={setHoveredRow} onMouseLeave={() => setHoveredRow(null)} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsersTable;
