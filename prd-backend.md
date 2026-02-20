# PRD — Backend API

## Stack
| Paket | Versiyon |
|-------|----------|
| express | ^4.18.2 |
| mongoose | ^8.0.3 |
| jsonwebtoken | ^9.0.2 |
| bcryptjs | ^2.4.3 |
| cors | ^2.8.5 |
| dotenv | ^16.3.1 |
| express-rate-limit | ^7.1.5 |
| express-session | ^1.19.0 |
| passport | ^0.7.0 |
| passport-google-oauth20 | ^2.0.0 |
| passport-github2 | ^0.1.12 |
| nodemon (dev) | ^3.0.2 |

## Environment
```
PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRE, NODE_ENV, FRONTEND_URL
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
```

## Models

### User
- name, email(unique), password(select:false), role(user/admin), isActive, lastLogin
- provider(local/google/github), providerId, avatar
- bio, city, country, linkedin, github, phone, showPhone, techStack[]
- Pre-save: bcrypt hash (12 rounds) | Method: comparePassword()

### Event
- title, description, date, endTime, location, isOnline, meetingLink
- type(meetup/workshop/webinar/hackathon/conference/social/other)
- maxAttendees, attendees[](User), createdBy(User), isActive, tags[]

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | ❌ | Create user → token |
| POST | /api/auth/login | ❌ | Authenticate → token |
| GET | /api/auth/me | ✅ | Current user |
| POST | /api/auth/logout | ✅ | Logout |
| GET | /api/auth/google | ❌ | OAuth Google |
| GET | /api/auth/github | ❌ | OAuth GitHub |
| GET | /api/users | ✅ | List users (search, city, tech) |
| PUT | /api/users/profile | ✅ | Update profile |
| GET | /api/events | ✅ | List events (month, year, type) |
| POST | /api/events | ✅ | Create event |
| POST | /api/events/:id/attend | ✅ | Toggle attendance |
| GET | /api/dashboard | ✅ | Stats + recent users |

## Response Format
```json
// Success: { "success": true, "message": "...", "data": {...} }
// Error:   { "success": false, "message": "..." }
// Token:   { "success": true, "token": "jwt...", "user": { id, name, email, role } }
```

## Middleware
- **protect**: Bearer token → verify JWT → attach req.user
- **authorize(...roles)**: Role-based access control

## Security
- Rate limit: /api/auth/* → 20 req/15min
- Password: bcrypt hash, select:false, never in response
- JWT payload: sadece { id }
- Email: lowercase + trim | Duplicate → 409

## Error Codes
400 Validation | 401 Unauthorized | 403 Forbidden | 404 Not Found | 409 Duplicate | 500 Server

## Run
```bash
cd backend && npm install && npm run dev
```
