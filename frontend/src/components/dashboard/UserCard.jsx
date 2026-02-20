import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

/**
 * UserCard Component - Displays user card for community page
 * @param {object} user - User object
 */
const UserCard = ({ user }) => {
  return (
    <div className="glass-card p-6 hover:border-white/12 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Avatar name={user.name} size="xl" />
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-lg text-white truncate">{user.name}</h3>
          <p className="text-sm text-white/40 truncate">{user.email}</p>
          <Badge variant="accent" className="mt-2">
            {user.role}
          </Badge>
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="text-sm text-white/60 mt-4 line-clamp-2">{user.bio}</p>
      )}

      {/* Tech Stack */}
      {user.techStack && user.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {user.techStack.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/60"
            >
              {tech}
            </span>
          ))}
          {user.techStack.length > 4 && (
            <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/40">
              +{user.techStack.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Location */}
      {(user.city || user.country) && (
        <div className="flex items-center gap-2 mt-4 text-sm text-white/40">
          <i className="fas fa-map-marker-alt" />
          <span>{[user.city, user.country].filter(Boolean).join(', ')}</span>
        </div>
      )}

      {/* Social Links */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/6">
        {user.github && (
          <a
            href={user.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors"
          >
            <i className="fab fa-github text-lg" />
          </a>
        )}
        {user.linkedin && (
          <a
            href={user.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors"
          >
            <i className="fab fa-linkedin text-lg" />
          </a>
        )}
      </div>
    </div>
  );
};

export default UserCard;
