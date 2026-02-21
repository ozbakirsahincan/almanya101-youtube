// ==========================================
// FILE: frontend/CLAUDE.md
// ==========================================
# Frontend Development Guide - Avant-garde Bento UI

<claude-mem-context>
# Recent Activity

<!-- Directory: frontend/ -->

### Feb 21, 2026

| ID | Time | T | Title | Read |
|----|------|---|-------|------|
| #1 | 9:15 AM | ✅ | Updated API URL to port 5001 | ~45 |
| #2 | 9:16 AM | ✅ | Updated vite proxy target to 5001 | ~30 |
| #3 | 9:17 AM | ✅ | Production build successful (348KB JS, 26KB CSS) | ~80 |
| #4 | 9:38 AM | 🟣 | Added Vitest + Testing Library infrastructure | ~200 |
| #5 | 9:38 AM | ✅ | 47 tests passing: Validation, DemoMode, PasswordStrengthBar | ~350 |
| #6 | 9:56 AM | 🔴 | Fixed missing Badge import in StatsCard.jsx | ~30 |

</claude-mem-context>

## Technical Stack
- **Framework:** React 19.2.0 (Vite 7.3.1).
- **Styling:** TailwindCSS 3.4.19 + PostCSS.
- **Query:** Tanstack Query for API state management.
- **Icons/Fonts:** Font Awesome 6+, Google Fonts (Distinctive Display).

## Visual Identity (Dark Bento DNA)
- **Primary BG:** #050505 | Card BG: rgba(255,255,255,0.03).
- **Accents:** Indigo #6366F1 -> Violet #8B5CF6 gradient.
- **Glassmorphism:** 1px border rgba(255,255,255,0.06).
- **Typography:** Bold headlines, 14px secondary text at 0.4 opacity.

## Component Principles
- **Grid Layout:** 12-column system. Bento (7) + Auth (5).
- **Responsive:** Desktop (12-col), Tablet (stacked 2-col), Mobile (1-col).
- **Interactions:** 0.4s ease transition with translateY on tab switch.

## Logical Constraints
- **Validation:** Immediate inline feedback. No layout shifts (use min-height 18px).
- **Password Strength:** 4-stage color logic (Red -> Green).
- **Demo Mode:** If fetch fails due to TypeError, simulate login via sessionStorage with `demo_token_`.
- **Auth Guard:** Check for token on DOMContentLoaded. Immediate redirect if missing.

## Deployment
- Served by the backend as static files.

## Commands
- `npm run dev`: Start Vite dev server on port 5173.
- `npm run build`: Build for production (dist/).
- `npm test`: Run Vitest tests (47 tests).
- `npm run test:watch`: Run tests in watch mode.

## Testing
- **Framework:** Vitest with jsdom
- **Libraries:** @testing-library/react, @testing-library/jest-dom
- **Coverage:** Validation utils, DemoMode utils, PasswordStrengthBar component
- **Location:** `src/**/*.test.{js,jsx}`