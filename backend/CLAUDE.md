// ==========================================
// FILE: backend/CLAUDE.md
// ==========================================
# Backend Development Guide - Bento Auth System

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