# Modern Bento Grid Authentication System

A production-grade MERN stack authentication system with an avant-garde dark glass-morphism aesthetic.

## Features

- **Authentication**: Login, Register, OAuth (Google, GitHub)
- **Demo Mode**: Works without backend connection (fallback to mock data)
- **Protected Dashboard**: Stats, user management, community features, events
- **Responsive Design**: Desktop, tablet, and mobile layouts
- **Dark Bento UI**: Glass-morphism cards, mesh gradients, float animations

## Tech Stack

### Frontend
- React 19.2.0
- Vite 7.3.1
- React Router DOM 7.13.0
- Tanstack Query 5.x
- TailwindCSS 3.4.19
- Axios 1.13.5
- Font Awesome 7.2.0

### Backend
- Node.js (ES6 Modules)
- Express 4.18.2
- MongoDB/Mongoose 8.0.3
- JWT 9.0.2
- bcryptjs 2.4.3
- Passport.js 0.7.0 (OAuth)

## Project Structure

```
/var/www/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── passport.js       # OAuth strategies
│   ├── middleware/
│   │   ├── auth.js           # JWT verification
│   │   ├── errorHandler.js   # Global error handler
│   │   └── rateLimiter.js    # Rate limiting
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Event.js          # Event schema
│   ├── routes/
│   │   ├── auth.js           # Authentication endpoints
│   │   ├── users.js          # User CRUD
│   │   ├── events.js         # Event management
│   │   └── dashboard.js      # Dashboard data
│   ├── utils/
│   │   └── token.js          # JWT utilities
│   ├── server.js             # Express server
│   ├── package.json
│   └── .env                  # Environment variables
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── axios.js       # Axios instance
    │   │   ├── auth.js        # Auth API
    │   │   ├── users.js       # Users API
    │   │   ├── events.js      # Events API
    │   │   └── dashboard.js   # Dashboard API
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── PrivateRoute.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   ├── Header.jsx
    │   │   │   └── Layout.jsx
    │   │   ├── auth/
    │   │   │   ├── LoginForm.jsx
    │   │   │   ├── RegisterForm.jsx
    │   │   │   ├── FormInput.jsx
    │   │   │   ├── PasswordStrengthBar.jsx
    │   │   │   ├── TabSwitcher.jsx
    │   │   │   └── SocialLogin.jsx
    │   │   ├── bento/
    │   │   │   ├── HeroCard.jsx
    │   │   │   ├── StatsCard.jsx
    │   │   │   ├── FeatureCard.jsx
    │   │   │   └── GlassCard.jsx
    │   │   ├── dashboard/
    │   │   │   ├── StatCard.jsx
    │   │   │   ├── RecentUsersTable.jsx
    │   │   │   ├── ProfileCard.jsx
    │   │   │   ├── QuickActions.jsx
    │   │   │   └── UserCard.jsx
    │   │   ├── events/
    │   │   │   ├── EventCard.jsx
    │   │   │   ├── EventForm.jsx
    │   │   │   ├── EventCalendar.jsx
    │   │   │   └── AttendanceToggle.jsx
    │   │   └── ui/
    │   │       ├── Button.jsx
    │   │       ├── Badge.jsx
    │   │       ├── Avatar.jsx
    │   │       └── Toast.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx    # Authentication state
    │   │   └── ToastContext.jsx   # Notification system
    │   ├── pages/
    │   │   ├── AuthPage.jsx       # Login/Register
    │   │   ├── DashboardPage.jsx  # Dashboard overview
    │   │   ├── CommunityPage.jsx  # User discovery
    │   │   ├── EventsPage.jsx     # Event management
    │   │   └── OAuthCallback.jsx  # OAuth handler
    │   ├── utils/
    │   │   ├── validation.js     # Form validation
    │   │   └── demoMode.js       # Demo mode utilities
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css            # Global styles
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── .env                     # API URL
```

## Quick Start

### Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Dev server runs on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/github` - Initiate GitHub OAuth

### Users
- `GET /api/users` - List users (search, city, tech filters)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update profile

### Events
- `GET /api/events` - List events (month, year, type filters)
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/attend` - Toggle attendance

### Dashboard
- `GET /api/dashboard` - Get stats + recent users

## Design System

### Colors
- Primary Background: #050505
- Card Background: rgba(255,255,255,0.03)
- Accent: Indigo #6366F1 → Violet #8B5CF6
- Success: Emerald #10B981
- Error: Red #EF4444

### Typography
- Display Font: Space Grotesk (Bold 700)
- Logo Font: Syne (ExtraBold 800)
- Body Font: Space Grotesk (Regular 400)

### Layout
- Desktop: 12-column grid (7 + 5 split)
- Tablet: Stacked 2-column
- Mobile: Single column

## Demo Mode

The app automatically activates demo mode when:
1. The backend is unreachable (network error)
2. A demo token is stored in sessionStorage

Demo mode uses mock data for all features, allowing full testing without a running backend.

## Security

- Password hashing with bcrypt (12 rounds)
- JWT tokens with 7-day expiration
- Rate limiting on auth endpoints (20 req/15min)
- CORS configured for frontend only
- Password field excluded from query results
- OAuth secrets in environment variables

## License

ISC
