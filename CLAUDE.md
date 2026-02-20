# Bento Auth System - Development Guide

## Project Overview
A high-end, "Avant-garde" MERN stack authentication system utilizing a Dark Bento Grid UI. The system implements JWT-based security with a fail-safe "Demo Mode" for offline/no-backend environments.

## Tools Using (MANDETORY)
- Serena MCP
- Context7 MCP
- CLaude-Mem Mcp

## Tech Stack Constraints
- **Frontend:** React 19.2.0, Vite 7.3.1, TailwindCSS 3.4.19 (via CDN), Tanstack Query.
- **Backend:** Node.js, Express 4.18.2, MongoDB/Mongoose 8.0.3, Passport.js.
- **Typography:** Custom Display Font (Strictly NOT Inter/Roboto/Arial).
- **Icons:** Font Awesome 6.0+ (CDN).

## Design Tokens (Dark Bento DNA)
- **Backgrounds:** Primary #050505 | Card `rgba(255,255,255,0.03)`.
- **Borders:** `rgba(255,255,255,0.06)` (1px solid).
- **Accents:** Indigo #6366F1 | Hover Glow: Violet #8B5CF6.
- **Layout:** 12-column CSS Grid. Left panel (7 cols) for Bento info, Right panel (5 cols) for Auth.
- **Visuals:** Mesh gradients (0.08 opacity), 50x50px grid pattern, glass-morphism.

## Critical Implementation Rules
1. **Zero Layout Shift:** Use fixed min-height (18px) for error messages.
2. **Demo Mode:** If `fetch` throws a `TypeError`, intercept and use `sessionStorage` with `demo_token_` to simulate a successful login.
3. **Password Security:** Register requires a 4-segment strength bar (Red -> Orange -> Yellow -> Green) and real-time match confirmation.
4. **Auth Guards:** Dashboard must check for token existence on `DOMContentLoaded`. Immediate redirect to `index.html` if null.
5. **State Management:** Use Tanstack Query for API state; avoid unnecessary global state for simple form inputs.

## Project Structure
```text
/
├── backend/
│   ├── config/db.js        # Mongoose connection
│   ├── models/User.js      # Schema with bcrypt hooks
│   ├── middleware/auth.js  # JWT & Role verification
│   ├── routes/             # auth.js & dashboard.js
│   └── server.js           # Express entry point
├── frontend/
│   ├── index.html          # Auth (Login/Register)
│   ├── dashboard.html      # Protected Area
│   ├── src/
│   │   ├── components/     # Bento cards & Form elements
│   │   └── logic/          # Auth & Toast systems
└── .env                    # PORT, MONGODB_URI, JWT_SECRET