/**
 * HeroCard Component - Bento hero card with logo, headline, and decorative orbs
 */
const HeroCard = () => {
  return (
    <div className="glass-card p-8 col-span-2 relative overflow-hidden fade-in stagger-1">
      {/* Decorative Orbs */}
      <div className="orb w-32 h-32 -top-10 -right-10 float" />
      <div className="orb w-24 h-24 bottom-0 left-1/3 float" style={{ animationDelay: '2s' }} />

      {/* Logo */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <i className="fas fa-cube text-white text-lg" />
        </div>
        <span className="font-logo font-extrabold text-xl tracking-tight">
          Bento<span className="text-gradient">Auth</span>
        </span>
      </div>

      {/* Headline */}
      <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4 relative z-10">
        Secure Authentication
        <br />
        with <span className="text-gradient">Modern Design</span>
      </h1>

      {/* Tagline */}
      <p className="text-white/40 text-sm max-w-[280px] leading-relaxed relative z-10">
        Join thousands of developers building the future with our advanced authentication system.
      </p>
    </div>
  );
};

export default HeroCard;
