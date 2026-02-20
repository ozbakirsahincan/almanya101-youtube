---
name: login-register-page
model: glm-5
temperature: 0.05
metadata:
    author: almanya101
    version: "0.0.1"
---
You are a senior full-stack avantgarde engineer and UI/UX expert. Please build from 0 to 1 a modern Bento Grid Authentication System with a protected Login / Register page.

**Type:** Website  
**Tech Stack:** MERN Stack with Tanstack Query . Styling framework: TailwindCSS (CDN, v3.4.19 , postcss(dev:8.5.6)). Icon library: Font Awesome 6.0+ (CDN). Fonts: Google Fonts — one distinctive display font (NOT Inter, NOT Roboto, NOT Arial).
## Frontend Stack
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

## Backend Stack
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

---

## Style Positioning (Dark Bento DNA)

**Visual Tone:** Dark, dense, modern. Glass-morphism cards on near-black background. Zero generic AI aesthetics. Every element intentional.

**Color Scheme:**
- Primary background: Near-black #050505
- Card background: rgba(255,255,255,0.03) — semi-transparent
- Card border: rgba(255,255,255,0.06) — barely visible, 1px
- Primary text: #FFFFFF
- Secondary text: rgba(255,255,255,0.4)
- Brand accent: Indigo #6366F1 (hover glow: violet #8B5CF6)
- Success: Emerald #10B981
- Error: Red #EF4444
- Badge colors: Green rgba(16,185,129,0.12) / Blue rgba(59,130,246,0.12) / Purple rgba(139,92,246,0.12)

**Layout Principles:**
- Desktop: 12-column CSS grid. Left bento panel (7 cols) + right auth form panel (5 cols)
- Tablet 768–1199px: stacked two-column, form moves below
- Mobile <768px: single column vertical, full width
- Fixed mesh gradient + subtle dot/line grid pattern as background layers
- Decorative blur orbs: position absolute, filter blur(40px), opacity 0.12, float animation

---

## Page Structure & Functional Modules

### 1. Background System
- Layer 1 (fixed): radial-gradient mesh — brand color bleeds at corners, opacity 0.08
- Layer 2 (fixed): repeating linear-gradient grid pattern, line color rgba(255,255,255,0.015), size 50×50px
- Layer 3: page content, z-index 10+

### 2. Left Bento Panel (index.html only)

**Hero Card (col-span-2, full row):**
- Logo: small rounded square icon + brand name in display font
- Headline: large, bold, multi-line, last word or phrase in gradient text (brand colors)
- Tagline: 14px, secondary text color, max 280px width
- Decorative orbs inside card: 2 blobs, different sizes, different animation delays

**Stats Card 1 — User Count:**
- Live badge: pulsing dot + "Active" label, pill shape
- Large number: display font, 32px+
- Label: secondary text
- Mini bar chart: 7 bars, heights vary, color ramps from rgba(accent,0.3) to accent

**Stats Card 2 — Security:**
- Icon badge: emerald toned
- Spec value: "256-bit" bold
- Label: "SSL Encryption"
- Sub-label: "JWT + bcrypt" in success color

**Stats Card 3 — API:**
- Large number + label
- Linear progress bar: brand gradient fill, percentage label

**Feature Card:**
- 4 checkmark rows: icon badge + text
- Items: "Free to start", "No credit card", "24/7 support", "GDPR compliant"

### 3. Auth Form Panel (Right, index.html)

**Card Style:**
- White background rgba(255,255,255,0.03), border rgba(255,255,255,0.06), border-radius 20px
- Subtle box-shadow: brand color glow (0 0 60px rgba(accent,0.15))

**Tab Switcher:**
- Two buttons: "Login" / "Register" inside a pill container
- Inactive: transparent bg, muted text
- Active: rgba(accent,0.15) bg + accent border + white text
- Switch triggers: fade + translateY(10px→0) animation 0.4s ease

**Social Login Row:**
- Two ghost buttons side by side: Google (with SVG logo) + GitHub (Font Awesome icon)
- Style: rgba(255,255,255,0.04) bg, rgba(255,255,255,0.08) border, border-radius 12px
- Hover: bg lightens, border brightens

**Divider:**
- "or continue with email" centered, flanked by hr lines rgba(255,255,255,0.06)

**Form Inputs:**
- Background: rgba(255,255,255,0.04), border: rgba(255,255,255,0.08), border-radius 12px
- Left icon: Font Awesome, color rgba(255,255,255,0.2), transitions to accent on focus
- Focus state: border-color rgba(accent,0.6), background rgba(accent,0.06), box-shadow 0 0 0 3px rgba(accent,0.1)
- Error state: red border + red background tint
- Success state: emerald border
- Placeholder: rgba(255,255,255,0.25)
- Password fields: right-side eye toggle button (fa-eye / fa-eye-slash)

**Password Strength Bar (Register only):**
- 4 equal segments below password input
- Score logic: length≥6 (+1), length≥10 (+1), mixed case (+1), number+special (+1)
- Colors by score: 1=red #EF4444, 2=orange #F97316, 3=yellow #EAB308, 4=green #22C55E
- Active segments filled, inactive segments rgba(255,255,255,0.06)
- Transitions: background 0.3s ease

**Field Error Messages:**
- Below each input, min-height 18px (no layout shift)
- Font size 12px, color #F87171
- Format: ⚠ icon + error text, fade in

**Primary Button:**
- Full width, height 40px, border-radius 12px
- Background: linear-gradient(135deg, accent 0%, darker accent 100%)
- Hover: translateY(-1px) + box-shadow 0 8px 30px rgba(accent,0.4)
- Active: scale(0.98)
- Disabled: opacity 0.6, no transform
- Loading state: hide text, show CSS spinner (border-top trick, 0.7s linear)

**Register extras:**
- Confirm password: real-time match check on input event
- Terms checkbox: accent color, inline label with clickable links

**Forgot Password link:**
- Right-aligned, 12px, accent color, no border/bg button

**Switch tab link:**
- Bottom of form, muted text + accent colored inline button

### 4. Auth Logic (Vanilla JS)

**Client Validation — Login:**
- Email: required + regex test
- Password: required + length ≥ 6
- All errors shown inline before any fetch

**Client Validation — Register:**
- Name: required, length ≥ 2
- Email: required + regex
- Password: required, length ≥ 6
- Confirm: must match password
- Terms: must be checked
- All errors shown simultaneously

**API Call — Login:**
// POST /api/auth/login → { email, password }
// On success: store token (localStorage if rememberMe, else sessionStorage)
// Store user object as JSON string
// Show success toast → setTimeout 1000ms → window.location.href = 'dashboard.html'
// On API error: show error toast, mark fields red
// On fetch TypeError (offline): activate demo mode

**API Call — Register:**
// POST /api/auth/register → { name, email, password, confirmPassword }
// On success: store token + user → toast → redirect dashboard.html
// On 409 conflict: mark email field error with server message

**Demo Mode (fallback):**
// If fetch throws TypeError (API unreachable)
// Build mock user from form inputs
// Store as demo_token_ + Date.now() in sessionStorage
// Show "Demo mode active" info toast
// Redirect normally

**Toast System:**
// position: fixed, top-right, z-index 9999
// Types: success (emerald), error (red), info (indigo)
// Slide in: translateX(120%) → translateX(0), cubic-bezier spring
// Auto dismiss after 3500ms
// Icon: ✓ / ✕ / ℹ

### 5. Dashboard Page (dashboard.html)

**Auth Guard:**
// On DOMContentLoaded: read token from localStorage || sessionStorage
// If null → window.location.href = 'index.html' immediately
// If demo token → load mock data, skip API fetch

**Sidebar (fixed, 240px width):**
- Logo at top (same as index)
- Nav items: Overview, Analytics, Projects (badge: 3), Messages (badge: 5), divider, Settings, Billing
- Nav item style: flex + icon + label, border-radius 10px, transition all 0.2s
- Active state: rgba(accent,0.15) bg + white text
- Bottom section: user profile button → opens dropdown menu above it
- Dropdown items: View Profile, Account Settings, divider, Logout (red hover)
- Mobile: sidebar off-canvas, toggle button in header

**Main Content Header:**
- Left: page title (display font, 26px) + subtitle (secondary text, 14px)
- Right: notification bell (with dot indicator) + "New Project" action button + mobile sidebar toggle

**Stat Cards Row (4 cards, equal width):**
- Each: icon badge (toned) + trend badge (top right) + large stat number + label
- Numbers populated from API or mock data
- Stat 1: Total Users | Stat 2: Active Users | Stat 3: New This Week | Stat 4: Server Uptime

**Recent Users Table (8/12 cols):**
- Header: title + "Refresh" button
- Each row: avatar circle (initials, gradient bg) + name + email + join date + role badge
- Row border-bottom: rgba(255,255,255,0.04)
- Loading state: spinner centered in table area
- Empty state: icon + message if no users

**Right Column Stack (4/12 cols):**
- Profile Card: large avatar (56px) + name + email + role badge + divider + meta rows (join date, account status)
- Quick Actions Card: 3 action buttons (New Project / Invite Team / Export Report)
  Each button: icon badge (toned color) + label, full width, hover shifts border+bg to matching color

**Data Loading:**
// GET /api/dashboard with Authorization: Bearer <token>
// Populate stat cards via getElementById + textContent
// Render user rows via innerHTML loop
// On fetch fail: use mock data object, show info toast

**Logout:**
// POST /api/auth/logout with Bearer token (skip if demo token)
// Clear localStorage + sessionStorage (token + user keys)
// Redirect to index.html

---

## Backend — Node.js + MongoDB

**Dependencies:** express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv  
**Dev:** nodemon

**.env:**
PORT=5000
MONGODB_URI=mongodb://localhost:27017/almanya101
JWT_SECRET=replace_with_strong_random_string
JWT_EXPIRE=7d
NODE_ENV=development

**config/db.js:**
// mongoose.connect(process.env.MONGODB_URI)
// Log success with conn.connection.host
// On error: log + process.exit(1)

**models/User.js — Schema fields:**
- name: String, required, trim, minlength 2, maxlength 50
- email: String, required, unique, lowercase, trim, regex validated
- password: String, required, minlength 6, select: false
- role: enum ['user','admin'], default 'user'
- isActive: Boolean, default true
- lastLogin: Date, default null
- timestamps: true

// Pre-save hook: if (!this.isModified('password')) return next()
// bcrypt.genSalt(12) → bcrypt.hash → assign → next()
// Instance method comparePassword: bcrypt.compare(candidate, this.password)
// toJSON override: delete obj.password before return

**middleware/auth.js:**
// Extract: req.headers.authorization?.split(' ')[1]
// If no token → 401
// jwt.verify(token, JWT_SECRET) → decoded
// User.findById(decoded.id) → if !user or !user.isActive → 401
// req.user = user → next()
// authorize(...roles) factory: check req.user.role inclusion

**routes/auth.js:**
// Helper generateToken(userId): jwt.sign({id}, secret, {expiresIn})
// Helper sendTokenResponse(user, statusCode, res, message): generate token → res.json({ success, message, token, user })

// POST /register:
// Validate name/email/password presence + password===confirmPassword + length
// Check User.findOne({email}) → 409 if exists
// User.create({name, email, password}) → sendTokenResponse 201

// POST /login:
// Validate email+password presence
// User.findOne({email}).select('+password')
// If !user → 401 generic message
// comparePassword → if false → 401 generic message
// If !isActive → 401
// user.lastLogin = new Date() → save({validateBeforeSave:false})
// sendTokenResponse 200

// GET /me: [protect] → User.findById(req.user._id) → res 200

// POST /logout: [protect] → res 200 success message

**routes/dashboard.js:**
// GET / [protect]:
// totalUsers = User.countDocuments()
// activeUsers = User.countDocuments({isActive:true})
// newUsersThisWeek: createdAt $gte (Date.now - 7days)
// recentUsers: User.find().sort({createdAt:-1}).limit(5).select('name email createdAt role')
// uptime: process.uptime().toFixed(0)
// res.json({ success, data: { stats, recentUsers, currentUser: req.user } })

**server.js:**
// dotenv.config() → connectDB()
// cors with allowed origins array
// express.json({limit:'10mb'}) + express.urlencoded({extended:true})
// express.static('../frontend')
// Mount /api/auth and /api/dashboard
// GET /api/health → {success, timestamp, environment}
// 404 handler for /api/* → json response
// Catch-all → sendFile index.html (SPA fallback)
// Global error handler (err,req,res,next)
// app.listen(PORT) with startup ASCII art log

---

## Output Requirements

1. Deliver complete project as separate files for each path shown in structure
2. All files must have clear section comments separating logical blocks
3. Run instructions: cd backend && npm install && node server.js
4. Frontend accessible via http://localhost:5000 (served by Express static)
5. All interactions must work: tab switch, validation, toast, redirect, logout
6. Mobile responsive at all three breakpoints
7. Demo mode must work without backend running