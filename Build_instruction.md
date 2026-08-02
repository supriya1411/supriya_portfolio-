# Build Instructions
## Implementation Directive for Juhi's Full-Stack Developer Portfolio

**Companion document to:** `Portfolio_PRD.md` (v1.0)
**Audience:** AI coding agent (e.g., Claude Code) or a senior engineer executing the build
**Purpose:** Turn the PRD into a working, deployed application with no ambiguity about order of operations, conventions, or definition of done at each step.

**Rule:** The PRD is the source of truth for *what* to build and *why*. This document governs *how* and *in what order*. If anything here conflicts with the PRD, the PRD wins — flag the conflict rather than silently resolving it.

---

## 0. Before Writing Any Code

1. Read `Portfolio_PRD.md` in full — every section (1–30) — before scaffolding anything. Do not start from Section 21 (Folder Structure) alone.
2. Confirm the technology stack in PRD Section 22 and the database decision in Section 23 are being followed exactly. Do not silently swap Supabase for another provider, Prisma for a different ORM, etc. If a substitution is genuinely necessary (blocked package, licensing issue), stop and flag it rather than proceeding silently.
3. Set up accounts/projects needed before Phase 0 begins:
   - GitHub repository (private, until launch)
   - Vercel project linked to the repo
   - Supabase project (database + storage)
   - Resend account + verified sending domain
   - Upstash Redis database
4. Do not request additional product decisions from the user beyond what's needed to fill placeholder content (name, bio text, real project data, resume PDF, real certificates). The PRD is written to be decision-complete on everything else.

---

## 1. Build Order (Follow Phases Sequentially)

Build in the exact phase order from PRD Section 30. Do not build the Admin Dashboard before the public site has real data flowing into it — each phase depends on the last being functionally complete, not just started.

```
Phase 0  → Scaffold & config
Phase 1  → Public frontend, static/mock data, fully responsive
Phase 2  → Animation + 3D layer on top of Phase 1
Phase 3  → Database schema + public read APIs, swap mock data for live data
Phase 4  → Contact form, email, visitor/download tracking
Phase 5  → Auth + Admin CRUD
Phase 6  → Admin analytics + polish
Phase 7  → Security, accessibility, SEO hardening
Phase 8  → Testing + performance tuning
Phase 9  → Launch
Phase 10 → Blog module (only if explicitly requested — treat as out of scope by default)
```

**Do not skip ahead.** Building animation before the static layout is correct wastes rework. Building Admin CRUD before the schema is finalized causes migration churn.

---

## 2. Phase-by-Phase Execution Steps

### Phase 0 — Setup & Foundation
1. `npx create-next-app@latest` with TypeScript, Tailwind, App Router, `src/` disabled (use root `app/`), ESLint enabled.
2. Install core dependencies: `framer-motion`, `gsap`, `three`, `@react-three/fiber`, `@react-three/drei`, `lucide-react`, `zod`, `react-hook-form`, `@hookform/resolvers`.
3. Install backend dependencies: `prisma` + `@prisma/client` (or `drizzle-orm` + `drizzle-kit` if that alternative is chosen), `@supabase/supabase-js`, `resend`, `@upstash/redis`, `@upstash/ratelimit`, `lucia` (or `next-auth`), `argon2` (or `bcrypt` if `argon2` native bindings are problematic in the target deploy environment).
4. Set up `tailwind.config.ts` with the design tokens from PRD Section 19 (colors, spacing scale, font families, border radii) as theme extensions — do not hardcode hex values in components later.
5. Create the folder structure exactly as specified in PRD Section 21.
6. Write `.env.example` with every variable from PRD Section 25, empty values, committed to the repo. Create local `.env.local` (git-ignored) with real dev values.
7. Initialize the database schema (PRD Section 10) as a Prisma schema file (or Drizzle schema), run the first migration against the Supabase Postgres instance.
8. Write a seed script that creates the single admin user (`ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` from env, password hashed before insert) and inserts placeholder rows for each content table so the UI has something to render during Phase 1.
9. **Definition of Done:** `npm run dev` runs cleanly, Tailwind theme reflects design tokens, database is migrated and seeded, no TypeScript errors.

### Phase 1 — Core Public Frontend (Static)
1. Build components in this order: Layout shell (Navbar + Footer) → Hero → About → Skills → Experience Timeline → Projects grid → Certifications → Achievements → Contact (UI only, no submit logic yet).
2. Use static/mock arrays matching the DB schema shape (not the live DB yet) so component props are already typed correctly for Phase 3's swap-in.
3. Implement responsive behavior per PRD Section 17 at every breakpoint — verify manually at 320px, 375px, 640px, 1024px, 1440px, 1920px before moving on.
4. Implement dark/light theme switching mechanism (cookie-based, not localStorage, to avoid SSR flash) — content and layout only, transition polish comes in Phase 2.
5. **Definition of Done:** Every PRD Section 9.1 frontend section renders, is fully responsive, has no console errors, and passes a manual visual review against PRD Section 19 design system before any animation is added.

### Phase 2 — Animation & 3D Layer
1. Add Framer Motion per the exact inventory in PRD Section 18.2 — do not add animations not listed there without confirming they serve a stated hierarchy/feedback purpose.
2. Add the GSAP ScrollTrigger-powered Experience Timeline scrub — isolate this in its own component with cleanup on unmount (`ScrollTrigger.kill()`) to prevent memory leaks on route change.
3. Build the R3F Hero scene as an isolated component, dynamically imported with `ssr: false` and lazy-loaded — confirm triangle count and DPR cap per PRD Section 18.3 budget using the browser performance panel.
4. Wire `prefers-reduced-motion` detection into a shared hook; every animated component must consume it and fall back to a static/instant state.
5. **Definition of Done:** All animations from PRD Section 18.2 are implemented, `prefers-reduced-motion` fully disables motion when set, Three.js scene holds 60fps on a mid-tier device profile in Chrome DevTools throttling, no animation exceeds the 600ms rule.

### Phase 3 — Backend & Database Integration
1. Implement public GET API routes first (PRD Section 11.1) — Projects, Certificates, Experience, Skills, Achievements, Resume active/download.
2. Swap every Phase 1 mock-data import for a real fetch against these routes (Server Components fetching directly via the ORM where possible, avoiding unnecessary client-side fetches).
3. Apply ISR/caching per PRD Section 15 to these routes.
4. **Definition of Done:** No mock data remains anywhere in the public site; deleting a row in Supabase and refreshing the page reflects the change (subject to revalidation window).

### Phase 4 — Contact, Email, Analytics
1. Build `/api/contact`: Zod validation → honeypot check → rate limit check → DB insert → Resend email to owner → Resend acknowledgement email to sender. Implement in that exact order so cheap checks (validation, honeypot, rate limit) reject bad requests before any DB write or email send.
2. Wire the Contact form UI to this endpoint with inline validation errors and an animated success/error state.
3. Implement the visitor-tracking beacon (`/api/analytics/visit`) fired once per page load from a client component, and the resume download counter (`/api/resume/download` streaming endpoint that logs before serving the file).
4. **Definition of Done:** A real contact submission produces a DB row and two real emails; spam-pattern submissions (honeypot filled, or submitted <2s after render) are silently dropped; visiting any page produces a `visitors` row; downloading the resume produces a `downloads` row and increments what the admin dashboard will later show.

### Phase 5 — Authentication & Admin Dashboard
1. Implement `/api/auth/login`, `/api/auth/logout`, `/api/auth/session` and the session/cookie mechanism per PRD Section 12.
2. Implement `middleware.ts` guarding `/admin/*` and `/api/admin/*` — redirect unauthenticated page requests to `/admin/login`, return `401` JSON for unauthenticated API requests.
3. Build the Admin Dashboard shell (`/admin` layout with nav to each CRUD section).
4. Implement CRUD UI + API routes for Projects, Certificates, Experience, Skills, Achievements in that order (Projects is the most complex — build it first so the pattern is proven, then replicate for the simpler resources).
5. Implement the Resume version manager (upload, activate, list, delete) — enforce the "only one active resume" constraint at the database level as specified in PRD Section 10.2, not just in application logic.
6. Implement the Messages inbox (list, mark-read, delete).
7. **Definition of Done:** Logging in works, logging out invalidates the session server-side (test by reusing the old cookie after logout — it must fail), every CRUD operation on every resource works end-to-end and is immediately reflected on the public site within the revalidation window, unauthenticated requests to any admin route/API are rejected.

### Phase 6 — Admin Analytics Dashboard & Polish
1. Build `/api/admin/analytics/summary`, `/timeseries`, `/top-projects` and render them in `/admin/analytics` with simple, readable charts (no animation library needed here — clarity over motion in the admin surface).
2. Pass over every public and admin screen for empty states, loading states, and error states — none should be missing.
3. **Definition of Done:** Admin dashboard overview shows real, correct numbers; every list view has a defined empty state; every async action has a defined loading state.

### Phase 7 — Security, Accessibility, SEO Hardening
1. Add security headers (PRD Section 13) via `next.config.ts` headers configuration.
2. Confirm rate limiting is active on every endpoint listed in PRD Section 13.1 — write a quick script or use `curl` in a loop to confirm `429` triggers correctly.
3. Run `axe-core` against every public route; fix every critical/serious violation before proceeding.
4. Add JSON-LD `Person` schema, Open Graph tags, `sitemap.ts`, `robots.ts` per PRD Section 14.
5. **Definition of Done:** All items in PRD Section 27 (Acceptance Criteria) numbered 9, 12, 13, 14, 15, 16 pass.

### Phase 8 — Testing & Performance Tuning
1. Write unit tests for all Zod schemas and utility functions.
2. Write integration tests for every API route (success path + at least one failure path each).
3. Write Playwright E2E tests for the three critical journeys in PRD Section 26 (resume download, contact submission, admin login → CRUD → verify on public site).
4. Run Lighthouse CI; if any category is below target (PRD Section 20), address bundle size, image sizing, or render-blocking resources before moving on — do not ship below threshold and plan to "fix later."
5. **Definition of Done:** All PRD Section 27 acceptance criteria pass; Lighthouse scores meet Section 20 targets on an actual PR preview deployment, not just local dev.

### Phase 9 — Launch
1. Point the custom domain at the Vercel project, confirm HTTPS is active.
2. Run the full manual cross-browser/cross-device QA pass from PRD Section 26.
3. Rotate any credentials that were used during development/seeding (especially `ADMIN_SEED_PASSWORD`) to fresh production-only values before going live.
4. **Definition of Done:** Production URL is live, all PRD Section 27 criteria re-verified against production (not just preview), admin can log in and manage content on the live site.

---

## 3. Engineering Conventions to Follow Throughout

- **TypeScript strict mode on.** No `any` without a comment explaining why it's unavoidable.
- **Every API route validates input with Zod before touching the database** — no exceptions, including admin routes.
- **Every database mutation goes through the ORM** — no raw SQL string interpolation anywhere.
- **Every image uses `next/image`.** No raw `<img>` tags except in contexts where `next/image` genuinely cannot apply (rare — flag if this comes up).
- **Every list-rendering component has an empty state and a loading state defined before it's considered done** — not deferred to a "polish pass" that never happens.
- **Commit in small, logical units** matching the phase steps above, not one giant commit per phase.
- **Do not introduce a new npm dependency not listed in PRD Section 22** without a clear justification — the stack is deliberately scoped.
- **Never commit `.env.local` or any real secret value.**

---

## 4. What to Do If Something in the PRD Is Ambiguous During Build

1. Re-read the relevant PRD section fully — most apparent ambiguity is resolved by a detail elsewhere in the document (e.g., naming conventions are in Section 21, exact copy tone is implied by Section 4 personas).
2. If genuinely unresolved, make the decision that most directly serves PRD Section 2 (Product Goals) and PRD Section 5 (Recruiter Journey) — optimize for the 6-second scan and technical-reviewer depth, in that priority order.
3. Note the decision and its rationale in a `DECISIONS.md` file at the repo root as it's made, so it's auditable later — do not silently make architecturally significant choices without a paper trail.

---

## 5. Definition of "Done" for the Entire Project

The project is complete when every item in **PRD Section 27 (Acceptance Criteria)** — all 17 points — passes against the live production deployment, not staging or local dev.
