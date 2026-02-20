/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Backgrounds
        primary: '#050505',
        card: 'rgba(255, 255, 255, 0.03)',
        'card-hover': 'rgba(255, 255, 255, 0.05)',

        // Borders
        border: 'rgba(255, 255, 255, 0.06)',

        // Text
        'text-primary': '#FFFFFF',
        'text-secondary': 'rgba(255, 255, 255, 0.4)',
        'text-placeholder': 'rgba(255, 255, 255, 0.25)',

        // Brand Accents
        accent: '#6366F1', // Indigo
        'accent-hover': '#8B5CF6', // Violet
        'accent-glow': 'rgba(99, 102, 241, 0.4)',

        // Status
        success: '#10B981', // Emerald
        error: '#EF4444', // Red
        warning: '#F97316', // Orange
        info: '#3B82F6', // Blue

        // Password Strength
        'strength-1': '#EF4444',
        'strength-2': '#F97316',
        'strength-3': '#EAB308',
        'strength-4': '#22C55E',

        // Badge Backgrounds
        'badge-green': 'rgba(16, 185, 129, 0.12)',
        'badge-blue': 'rgba(59, 130, 246, 0.12)',
        'badge-purple': 'rgba(139, 92, 246, 0.12)',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'logo': ['Syne', 'sans-serif'],
        'body': ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        'bento': '20px',
        'input': '12px',
      },
      boxShadow: {
        'glow': '0 0 60px rgba(99, 102, 241, 0.15)',
        'glow-hover': '0 8px 30px rgba(99, 102, 241, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-up': 'fadeUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideIn: {
          'from': { transform: 'translateX(120%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
