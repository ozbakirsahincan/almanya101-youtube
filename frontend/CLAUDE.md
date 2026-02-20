// ==========================================
// FILE: frontend/CLAUDE.md
// ==========================================
# Frontend Development Guide - Avant-garde Bento UI

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