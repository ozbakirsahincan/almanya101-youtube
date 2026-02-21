import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

const TechStack = ({ techStack }) => {
  if (!techStack || techStack.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {techStack.slice(0, 4).map((tech) => (
        <span key={tech} className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/60">
          {tech}
        </span>
      ))}
      {techStack.length > 4 && (
        <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/40">
          +{techStack.length - 4}
        </span>
      )}
    </div>
  );
};

const SocialLinks = ({ github, linkedin }) => (
  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/6">
    {github && (
      <a href={github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
        <i className="fab fa-github text-lg" />
      </a>
    )}
    {linkedin && (
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
        <i className="fab fa-linkedin text-lg" />
      </a>
    )}
  </div>
);

const UserCard = ({ user }) => (
  <div className="glass-card p-6 hover:border-white/12 transition-all duration-300">
    <div className="flex items-start gap-4">
      <Avatar name={user.name} size="xl" />
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-lg text-white truncate">{user.name}</h3>
        <p className="text-sm text-white/40 truncate">{user.email}</p>
        <Badge variant="accent" className="mt-2">{user.role}</Badge>
      </div>
    </div>
    {user.bio && <p className="text-sm text-white/60 mt-4 line-clamp-2">{user.bio}</p>}
    <TechStack techStack={user.techStack} />
    {(user.city || user.country) && (
      <div className="flex items-center gap-2 mt-4 text-sm text-white/40">
        <i className="fas fa-map-marker-alt" />
        <span>{[user.city, user.country].filter(Boolean).join(', ')}</span>
      </div>
    )}
    <SocialLinks github={user.github} linkedin={user.linkedin} />
  </div>
);

export default UserCard;
