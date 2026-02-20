# PRD — Frontend Application

## Stack
| Paket | Versiyon |
|-------|----------|
| react | ^19.2.0 |
| react-dom | ^19.2.0 |
| react-router-dom | ^7.13.0 |
| axios | ^1.13.5 |
| @fortawesome/fontawesome-free | ^7.2.0 |
| vite (dev) | ^7.3.1 |
| @vitejs/plugin-react (dev) | ^5.1.1 |
| tailwindcss (dev) | ^3.4.19 |
| postcss (dev) | ^8.5.6 |
| autoprefixer (dev) | ^10.4.24 |
| eslint (dev) | ^9.39.1 |

## Environment
```
VITE_API_URL=http://localhost:5001/api
```

## Pages

### Auth (`/`)
- Login/Register tabs, OAuth buttons (Google, GitHub)
- Form validation, password strength, rememberMe
- Demo mode fallback when backend offline

### Dashboard (`/dashboard`) - Protected
- **Overview**: Stats cards, recent users table, quick actions
- **Community**: User cards grid, filters (search, city, tech), profile modal
- **Events**: Calendar view, event creation form, attendance toggle

### OAuthCallback (`/auth/callback`)
- Handle OAuth redirect, parse token + user from URL

## Context

### AuthContext
```js
{ user, token, loading, isAuthenticated,
  login(email, password, rememberMe),
  register(name, email, password, confirmPassword),
  logout(), loginDemo(user), loginWithGoogle(), loginWithGithub() }
```
- Storage: localStorage (rememberMe) / sessionStorage

### ToastContext
```js
{ success(msg), error(msg), info(msg) }
```

## API Module (`src/api/axios.js`)
- Base axios instance with auth interceptor
- authAPI: register, login, getMe, logout
- usersAPI: getAll, getById, updateProfile, getCities, getTechStack
- eventsAPI: getAll, getById, create, update, delete, attend
- dashboardAPI: getData

## Components
- **PrivateRoute**: Check isAuthenticated → redirect to `/` or render children

## Styling
- TailwindCSS + custom classes (glass-card, btn-primary, bento-input, badge)
- Dark theme, bento grid layout, blur effects

## Run
```bash
cd frontend && npm install && npm run dev
```

## Rules
- Functional components + arrow functions
- `import.meta.env` (not process.env)
- API calls in `src/api/`, not in components
- Protected routes wrapped with PrivateRoute
