// ==========================================
// FILE: backend/CLAUDE.md
// ==========================================
# Backend Development Guide - Bento Auth System

<claude-mem-context>
# Recent Activity

<!-- Directory: backend/ -->

### Feb 21, 2026

| ID | Time | T | Title | Read |
|----|------|---|-------|------|
| #1 | 9:12 AM | 🔴 | Fixed missing protect middleware on /me route | ~185 |
| #2 | 9:15 AM | ✅ | Changed PORT from 5000 to 5001 to avoid conflict | ~120 |
| #3 | 9:16 AM | ✅ | All API endpoints tested and working | ~320 |
| #4 | 9:38 AM | 🟣 | Added Jest testing infrastructure with mongodb-memory-server | ~450 |
| #5 | 9:38 AM | ✅ | 33 tests passing: Token, Auth, Middleware, Routes, User Model | ~580 |

</claude-mem-context>

## Architecture Standards
- **Runtime:** Node.js with Express 4.18.2.
- **Database:** MongoDB via Mongoose 8.0.3 (Strict Schema).
- **Auth Strategy:** Passport.js (Google/GitHub) + JWT (JSON Web Tokens).
- **Security:** Bcryptjs (Salt: 12), express-rate-limit, and CORS (strict origin).

## Directory Structure
- `/config`: Database connection and Passport strategies.
- `/models`: Mongoose schemas (User model with pre-save hooks).
- `/middleware`: Auth guards (JWT extraction) and error handlers.
- `/routes`: Atomic route definitions (auth.js, dashboard.js).

## API Design Rules
- **Base URL:** All API endpoints must start with `/api/`.
- **Response Format:** { "success": boolean, "message": string, "data": object | null }
- **Error Handling:** 401 for Auth, 403 for Forbidden, 409 for Conflict (Email exists).
- **Validation:** Server-side validation is mandatory for all POST/PUT requests.

## Implementation Details
- **User Schema:** Must include `lastLogin`, `isActive`, and `role`. Password field must have `select: false`.
- **JWT:** Expiry set to `7d`. Store `id` in payload.
- **Static Assets:** Express must serve `../frontend` for single-port deployment.

## Commands
- `npm install`: Install locked dependencies.
- `npm run dev`: Start server via nodemon.
- `npm test`: Run Jest tests (33 tests, in-memory MongoDB).
- `npm run test:watch`: Run tests in watch mode.
- `npm run test:coverage`: Run tests with coverage report.

## Testing
- **Framework:** Jest with ES modules (`--experimental-vm-modules`)
- **Database:** mongodb-memory-server for isolated unit tests
- **Coverage:** Token utilities, Auth middleware, Error handler, Auth routes, User model
- **Location:** `/tests/auth.test.js`