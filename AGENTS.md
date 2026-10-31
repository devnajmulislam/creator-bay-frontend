# CreatorBay - Frontend Development Rules

## 1. Project Identity
Project: CreatorBay
Type: Peer-to-Peer Creative Workspace Marketplace

## 2. Frontend-Only Responsibility
This agent is responsible ONLY for frontend development.

The human developer will manually implement:
- Express.js backend
- MongoDB database
- Authentication and authorization
- JWT and HTTPOnly cookies
- API endpoints
- Image upload backend
- Booking collision validation
- Database CRUD operations

NEVER implement or modify backend infrastructure.

Do not create an Express server.
Do not create MongoDB connections.
Do not implement actual authentication.
Do not invent backend API endpoints.

Use mock data and simulated frontend interactions.

## 3. Technology Stack
- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- @base-ui/react (base primitives; shadcn/ui-inspired components wrap these)
- Lucide React
- Framer Motion
- Swiper.js
- Sonner
- React Hook Form
- Zod
- next-themes
- Recharts

## 4. Architecture
Use reusable, modular components.

**Actual project structure:**

```
src/
  app/                    ← Next.js App Router entries
    (public)/
      page.tsx
      studios/
    layout.tsx
    globals.css
    not-found.tsx
  components/
    layout/               ← Navbar, Footer, ThemeToggle
    home/                 ← Hero slider, featured studios, categories
    studios/              ← Studio explorer, cards, filters, detail page
    bookings/             ← Booking dialog
    auth/                 ← Login/Register (mock)
    shared/               ← Container, Skeleton, EmptyState, LoadingState, etc.
    ui/                   ← Base UI primitives (Button, Card, Input, etc.)
  data/                   ← Mock JSON data (studios, categories, reviews, home, studio-details)
  lib/                    ← Utils, constants
  hooks/                  ← Custom hooks (use-mobile)
  services/               ← Mock service functions (studio-service, home-service)
  types/                  ← TypeScript interfaces (studio, home, review)
```

Adapt this structure to the existing project rather than unnecessarily moving files.

**Key conventions:**
- Server Components by default; `"use client"` only on interactive components
- `data/` holds all mock JSON; never hardcode mock arrays inside pages
- Services in `src/services/` are the single source of truth for data access
- Types in `src/types/` define all interfaces; services return typed data

## 5. Mock Data Rules
- Use realistic TypeScript mock data (see `src/data/`)
- Never use Lorem Ipsum
- Create realistic studio titles, descriptions, locations, prices, ratings, and amenities
- Keep mock data separate from components
- **Use service functions to access mock data** — never import mock arrays directly in components
- Design service interfaces so they can later be replaced with real backend API calls
- Never hardcode mock arrays inside page components

## 6. Backend Integration Boundary
All data access must go through service functions.

Use typed interfaces for:
- Studio (from `src/types/studio`)
- User (from `src/types/home` / custom types)
- Booking
- Review

Frontend components must not depend on MongoDB, backend implementation details, or database models.

Authentication must use a temporary mock session for UI development.

Keep authentication access behind an auth service so the real authentication system can be connected later.

Do not pretend mock authentication is secure.

## 7. Design System
Design direction: Premium editorial creative studio marketplace.

Visual identity:
- Elegant typography (Geist Sans / Instrument Serif)
- Strong visual hierarchy
- Generous whitespace
- Premium studio photography
- Sophisticated neutral backgrounds
- One distinctive accent color (primary)
- Subtle borders and shadows
- Carefully designed hover interactions

Avoid:
- Generic AI-generated dashboard appearance
- Excessive gradients
- Excessive rounded cards
- Unnecessary animations
- Inconsistent spacing
- Random color combinations
- Overcrowded layouts

Use consistent:
- Typography scale (Geist Sans, Instrument Serif)
- Color tokens (defined in Tailwind config)
- Spacing system
- Button styles (via `buttonVariants` from `class-variance-authority`)
- Card styles (via `card` component with `size` variant)
- Border radii (`rounded-xl` throughout)
- Responsive breakpoints

## 8. UX Requirements
Every page must include appropriate:
- Loading states (Skeleton, LoadingGrid)
- Empty states (EmptyState with icon/title/description/action)
- Error states (toast notifications via Sonner)
- Success states (Sonner toast)
- Responsive layouts

Use Sonner for toast notifications (see `src/components/shared/app-toaster.tsx`).
Use custom dialogs for destructive confirmations (see `src/components/ui/dialog.tsx`).
Never use browser `alert()` or `confirm()`.

All buttons and interactive elements must work with mock frontend behavior.

## 9. Responsive Design
Mobile-first development.

Test at:
- Mobile: 375px and 390px
- Tablet: 768px
- Desktop: 1280px
- Large desktop: 1440px

Prevent horizontal overflow.
Use consistent image aspect ratios (see `category-card` aspect `[4/3]`).
Keep cards equal height within grids (use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` pattern).

## 10. Coding Rules
- Use strict TypeScript — `noImplicitAny`, strict mode enabled
- `next/font` is used for Geist (auto-optimized; do not swap fonts in `layout.tsx`)
- Avoid `any` unless absolutely necessary
- Prefer server components by default
- Use client components only when interaction requires them (`"use client"` at top)
- Reuse existing components from `src/components/ui/`
- Avoid unnecessary dependencies
- Avoid duplicate implementations (e.g., don't create a new Button when `src/components/ui/button.tsx` exists)
- Keep components focused and maintainable
- Follow Next.js App Router conventions
- Preserve existing working code
- Use `cn` class from `cn` package for class merging (import from `cn`, not classnames)
- Use `class-variance-authority` (cva) for component variants (see `src/components/ui/button.tsx`)

## 11. Agent Working Rules
- Work ONLY on the task explicitly requested
- Inspect relevant existing files before modifying them
- Do not rewrite unrelated components
- Do not redesign existing pages without permission
- Do not generate unnecessary documentation
- Do not install packages without a reason
- Do not create unnecessary abstractions
- Do not duplicate existing components (check `src/components/ui/`, `src/components/shared/`, `src/components/studios/`, `src/components/home/`)
- Report changed files and verification results
- Run relevant lint/type checks after implementation (`npm run lint`, `npx tsc --noEmit`)
- Do not claim a task is complete if verification fails

## 12. Git Rules
- Never delete existing commits
- Never force push
- Never automatically push to GitHub

Human developer manages Git commits.

## 13. Assignment Requirements
The frontend must support:
- Homepage and interactive hero slider (Swiper)
- Studio discovery and filtering (by category, location, price, rating)
- Studio detail pages
- Login and registration interfaces (mock)
- Add studio interface
- My studio listings
- Update and delete interfaces
- Booking modal (see `BookingDialog`)
- My bookings
- Dashboard
- Light/dark theme (next-themes)
- Custom 404
- Responsive navbar and footer

## Commands
- `npm run dev` — start development server (Turbopack)
- `npm run build` — build for production
- `npm run start` — start production server
- `npm run lint` — run ESLint
- `npx tsc --noEmit` — type-check TypeScript