# Product Requirements Document
## Juhi — Full-Stack Developer Portfolio Platform

| Field | Value |
|---|---|
| Document Type | Enterprise-Grade PRD |
| Product Name | Personal Developer Portfolio (working title: `juhi.dev`) |
| Owner | Juhi |
| Target Reviewers | Recruiters & Hiring Panels at Google, Microsoft, Amazon, Meta, Atlassian, Adobe, JP Morgan, Goldman Sachs, Walmart Global Tech, NVIDIA, Oracle, Salesforce, Deloitte |
| Document Status | Final — Ready for Engineering Handoff |
| Version | 1.0 |
| Date | July 29, 2026 |

---

## Table of Contents

1. Product Vision
2. Product Goals
3. Target Users
4. User Personas
5. Recruiter Journey
6. Information Architecture
7. Sitemap
8. User Flow
9. Complete Feature List
10. Database Design
11. API Design
12. Authentication & Session Management
13. Security
14. SEO Strategy
15. Performance Optimization
16. Accessibility
17. Responsive Design
18. Animation System
19. Design System
20. Performance Requirements
21. Folder Structure
22. Technology Stack
23. Database Choice & Justification
24. Deployment
25. Environment Variables
26. Testing Strategy
27. Acceptance Criteria
28. Future Improvements
29. Risk Analysis
30. Timeline

---

## 1. Product Vision

Build a single-owner, full-stack developer portfolio that functions as a **recruiter-facing product**, not a static resume page. The platform must communicate engineering seniority through its own construction: clean architecture, fast load times, purposeful motion, and zero visual noise. Every pixel and every millisecond of load time is treated as a signal of the candidate's engineering judgment.

The portfolio is the single most scrutinized artifact a candidate controls in the hiring funnel — it must survive a 6-second recruiter scan, an 90-second hiring-manager skim, and a deep technical review by a senior engineer, all without changing its content, only its depth of engagement.

**Vision Statement:**
> "A portfolio so fast, so clean, and so precisely engineered that its existence is itself evidence of the candidate's ability to ship production-grade software."

---

## 2. Product Goals

| # | Goal | Success Metric |
|---|---|---|
| G1 | Convert recruiter visits into callbacks | ≥15% resume-download-to-contact ratio |
| G2 | Achieve top-tier technical perception | 95+ Lighthouse Performance, Accessibility, Best Practices, SEO |
| G3 | Sub-2-second perceived load | LCP < 2.0s on 4G throttled connection |
| G4 | Zero-friction content updates | Admin CRUD for every content type, no redeploys needed for content changes |
| G5 | Demonstrate full-stack competency | Working auth, database, API, admin dashboard, analytics — not just a static site |
| G6 | Be memorable without being gimmicky | Minimal, purposeful 3D/motion; no effect without functional justification |
| G7 | Be fully accessible | WCAG 2.1 AA compliance |
| G8 | Be discoverable | Rank for "Juhi full stack developer portfolio" within indexing cycle |

---

## 3. Target Users

### Primary Users

| User Type | Description | Primary Goal |
|---|---|---|
| Technical Recruiter | Non-engineer, scans 100+ profiles/day | Find role fit fast: title, stack, years, standout signal |
| Hiring Manager / Engineering Lead | Technical, evaluates depth | Assess real project complexity, code quality signals, problem-solving |
| Senior Engineer (Bar Raiser / Panel) | Deep technical reviewer | Inspect actual implementation choices, architecture decisions, GitHub code |
| University Placement Cell / Referral Contact | Semi-technical | Verify credibility, share portfolio link internally |

### Secondary Users

| User Type | Description | Goal |
|---|---|---|
| Juhi (Owner/Admin) | Site owner | Manage content via Admin Dashboard without touching code |
| Site Visitor (General) | Peers, other students, network contacts | Browse projects, get inspired, view work |

---

## 4. User Personas

### Persona 1 — "Priya, Technical Recruiter at Big Tech"
- **Age:** 27–34, non-technical background, sources 80–150 candidates weekly.
- **Behavior:** Opens portfolio link from LinkedIn/resume on mobile or desktop, spends 5–8 seconds on first impression.
- **Needs:** Instant clarity on role (Full-Stack Developer), current status (student/open to work), tech stack tags, and a visible resume download.
- **Pain Point Being Solved:** Slow, cluttered, or confusing portfolios get closed in under 5 seconds. This site must communicate identity instantly above the fold.

### Persona 2 — "Arjun, Engineering Manager, Series-D Startup / MAANG"
- **Age:** 30–45, technical, reviews shortlisted candidates.
- **Behavior:** Reads About + Experience + 2–3 top Projects in depth, checks live demo links and GitHub repos, evaluates code quality via README and commit history.
- **Needs:** Depth on demand — problem statement, architecture decisions, technologies used, measurable outcomes (metrics, performance numbers) per project.
- **Pain Point Being Solved:** Portfolios that only show screenshots without technical substance get rejected. This site must reveal engineering depth on click-through, not by default (progressive disclosure).

### Persona 3 — "Diane, Staff Engineer / Bar-Raiser Interview Panelist"
- **Age:** 35+, highly technical, evaluates system design maturity.
- **Behavior:** Jumps straight to GitHub links, inspects code structure, checks for tests, CI/CD, and documentation quality.
- **Needs:** Direct, unobstructed links to source code; no dead links; consistent code quality across showcased repos.
- **Pain Point Being Solved:** The site itself (its performance, code cleanliness if open-sourced, and structure) becomes part of the evaluation. Must not undercut the claims made on it.

### Persona 4 — "Juhi, Owner/Admin"
- **Role:** Full-stack developer & designer maintaining her own professional presence.
- **Needs:** Add/edit/remove projects, certifications, skills, experience, and resume versions without redeploying code; view visitor and resume-download analytics; manage inbound messages from one dashboard.
- **Pain Point Being Solved:** Hardcoded portfolios require a code change + redeploy for every update. This system decouples content from code via a database and admin panel.

---

## 5. Recruiter Journey

```
STAGE 0 — DISCOVERY
   Source: LinkedIn / Resume PDF / Referral / GitHub profile link
        │
        ▼
STAGE 1 — FIRST IMPRESSION (0–6 seconds)
   Lands on Hero Section
   Sees: Name, Role Title, One-line value prop, CTA buttons
        (Download Resume | View Projects | Contact)
   Decision Point: "Is this candidate relevant?" → Stay or Bounce
        │
        ▼
STAGE 2 — CREDIBILITY SCAN (6–30 seconds)
   Scrolls to Skills + Experience Timeline
   Validates: tech stack match, years of experience, company/institution names
        │
        ▼
STAGE 3 — DEPTH EVALUATION (30s–3 min) [Technical reviewers only]
   Opens Projects section
   Filters by tech stack / category
   Clicks into 1–3 project case studies
   Opens live demo and/or GitHub repo in new tab
        │
        ▼
STAGE 4 — VALIDATION (Optional)
   Checks Certifications & Achievements section
   Cross-verifies claims (certificate links, issuing bodies)
        │
        ▼
STAGE 5 — CONVERSION
   Path A: Downloads Resume → tracked by Resume Download Counter
   Path B: Uses Contact Form → message stored + email notification sent
   Path C: Clicks external links (LinkedIn / GitHub / Email) → leaves site
        │
        ▼
STAGE 6 — FOLLOW-UP (Off-platform)
   Recruiter reaches out via email/LinkedIn/ATS
   Admin sees message + analytics event in Admin Dashboard
```

**Design Implication:** Every stage must be reachable within one scroll-depth cycle from the previous one. No stage should require more than 2 clicks from the Hero Section.

---

## 6. Information Architecture

```
Level 0 — Site Shell
 ├── Global Navigation (sticky, scroll-aware)
 ├── Theme Toggle (Dark/Light)
 └── Global Footer

Level 1 — Public Site (Single-Page Scroll App with Deep-Linkable Sections)
 ├── Hero
 ├── About
 ├── Skills
 ├── Experience Timeline
 ├── Projects (Grid → Project Detail Modal/Route)
 ├── Certifications
 ├── Achievements
 ├── Resume (Preview + Download)
 ├── Contact

Level 2 — Project Detail (Route: /projects/[slug])
 ├── Problem Statement
 ├── Tech Stack
 ├── Architecture Notes
 ├── Screenshots/Demo Video
 ├── Live Demo Link
 ├── GitHub Link
 ├── Metrics/Outcomes

Level 3 — Admin (Private, Auth-Gated: /admin)
 ├── Login (/admin/login)
 ├── Dashboard Overview (/admin)
 ├── Projects CRUD (/admin/projects)
 ├── Certificates CRUD (/admin/certificates)
 ├── Experience CRUD (/admin/experience)
 ├── Skills CRUD (/admin/skills)
 ├── Achievements CRUD (/admin/achievements)
 ├── Resume Manager (/admin/resume)
 ├── Messages Inbox (/admin/messages)
 ├── Analytics (/admin/analytics)
 └── Blog Manager (/admin/blogs) — Optional Module

Level 4 — Optional Public Blog
 ├── /blog (list)
 └── /blog/[slug] (post)
```

---

## 7. Sitemap

| Route | Type | Auth | Purpose |
|---|---|---|---|
| `/` | Public | None | Single-page portfolio (all core sections) |
| `/projects/[slug]` | Public | None | Individual project case study |
| `/blog` | Public (optional) | None | Blog index |
| `/blog/[slug]` | Public (optional) | None | Blog post |
| `/resume` | Public | None | Resume preview page (embedded PDF viewer) |
| `/admin/login` | Private | None (pre-auth) | Admin login |
| `/admin` | Private | Session | Dashboard overview: visitor stats, downloads, unread messages |
| `/admin/projects` | Private | Session | Projects CRUD |
| `/admin/certificates` | Private | Session | Certificates CRUD |
| `/admin/experience` | Private | Session | Experience CRUD |
| `/admin/skills` | Private | Session | Skills CRUD |
| `/admin/achievements` | Private | Session | Achievements CRUD |
| `/admin/resume` | Private | Session | Resume version upload/manage |
| `/admin/messages` | Private | Session | Contact form submissions inbox |
| `/admin/analytics` | Private | Session | Visitor & engagement analytics |
| `/admin/blogs` | Private | Session | Blog CRUD (optional module) |
| `/api/*` | Internal | Mixed | API routes (see Section 11) |
| `/sitemap.xml` | Public | None | Auto-generated SEO sitemap |
| `/robots.txt` | Public | None | Crawler directives |
| `/404` | Public | None | Not found |
| `/500` | Public | None | Server error boundary |

---

## 8. User Flow

### 8.1 Recruiter Flow — Resume Download
```
Landing (/) 
  → Scroll to Hero 
  → Click "Download Resume" CTA 
  → [API] POST /api/resume/download-track 
  → Browser downloads PDF (served from storage) 
  → Toast confirmation (subtle, non-blocking) 
  → Increment resume_downloads count in DB (async, non-blocking to UX)
```

### 8.2 Recruiter Flow — Contact Submission
```
Landing (/) 
  → Scroll to Contact section 
  → Fill form: Name, Email, Company (optional), Message 
  → Client-side validation (Zod schema) 
  → Submit 
  → [API] POST /api/contact 
    → Server-side validation + honeypot spam check 
    → Rate limit check (IP-based) 
    → Insert into Messages table 
    → Trigger transactional email to Owner (via Resend/SendGrid) 
    → Trigger auto-acknowledgement email to Sender 
  → Success state shown in UI (inline, animated confirmation) 
  → On failure: inline error, retry option
```

### 8.3 Technical Reviewer Flow — Project Deep Dive
```
Landing (/) 
  → Scroll to Projects 
  → Filter by tag (e.g., "React", "Node.js", "AI") 
  → Click Project Card 
  → Route to /projects/[slug] (or expand as animated modal, see Section 18) 
  → Read case study: Problem → Approach → Stack → Outcome 
  → Click "View Live Demo" → opens in new tab 
  → Click "View Source" → opens GitHub in new tab 
  → Return to portfolio via back navigation or close
```

### 8.4 Admin Flow — Content Management
```
/admin/login 
  → Enter credentials 
  → [API] POST /api/auth/login 
    → Validate against Users table (hashed password) 
    → Issue session (JWT in httpOnly cookie via NextAuth/Lucia) 
  → Redirect to /admin 
  → Dashboard shows: total visitors, resume downloads, unread messages, recent activity 
  → Navigate to e.g. /admin/projects 
  → Create/Edit/Delete project 
    → [API] POST/PUT/DELETE /api/admin/projects 
    → Server validates session + role 
    → Mutates Projects table 
    → Revalidates public cache (ISR revalidation tag) 
  → Changes reflect on public site within seconds, no redeploy
```

### 8.5 Visitor Tracking Flow (Background, Non-Blocking)
```
Any page load on public site 
  → Client fires lightweight beacon: POST /api/analytics/visit 
    (page path, referrer, device type, anonymized/hashed IP, timestamp) 
  → Server writes to Visitors table 
  → No cookies requiring consent banner (privacy-respecting, no PII stored)
```

---

## 9. Complete Feature List

### 9.1 Frontend Features

| Feature | Description | Priority |
|---|---|---|
| Premium Hero Section | Full-viewport intro with name, animated role-title (typewriter or morphing text), one-line value proposition, primary CTAs, subtle 3D/particle accent, scroll-cue indicator | P0 |
| About | Narrative bio, quick-fact stat cards (years learning, projects shipped, technologies), personal photo/avatar | P0 |
| Skills | Categorized grid (Languages, Frontend, Backend, Database, DevOps/Cloud, Tools) with proficiency indication via minimal visual weight (not gimmicky progress bars) | P0 |
| Experience Timeline | Vertical scroll-linked timeline: role, org, duration, bullet outcomes, tech tags | P0 |
| Projects | Filterable grid, tag-based filtering, hover-preview, click-through to case study | P0 |
| Certifications | Card grid with issuer, date, verify-link, credential ID | P0 |
| Achievements | Highlight reel: hackathon wins, rankings, publications, notable recognitions | P0 |
| Resume Download | Prominent CTA in Hero + dedicated section; PDF preview inline; download-tracked | P0 |
| Contact | Validated form + direct email/LinkedIn/GitHub icons; social proof of responsiveness ("typically replies within 24h") | P0 |
| Responsive Navigation | Sticky header, scroll-spy active-section highlighting, hamburger on mobile, smooth-scroll anchor links | P0 |
| Dark/Light Mode | System-preference default, manual toggle, persisted via cookie (not localStorage, to support SSR without flash) | P0 |
| Animations | Scroll-triggered reveals, page-load choreography, micro-interactions on hover/click, section-transition motion (see Section 18) | P0 |
| SEO | Full metadata, Open Graph, JSON-LD structured data (Person schema), sitemap, robots.txt | P0 |
| Accessibility | WCAG 2.1 AA: keyboard nav, focus states, ARIA labels, color contrast, reduced-motion support | P0 |
| 404 / Error Boundaries | Branded, on-theme error pages | P1 |
| Blog (Optional) | Public article list + reader view, Markdown/MDX rendering | P2 |

### 9.2 Backend Features

| Feature | Description | Priority |
|---|---|---|
| Contact Form API | Validates, persists, and relays contact submissions | P0 |
| Email Sending | Transactional email service integration (owner notification + sender acknowledgement) | P0 |
| Database | Persistent relational store for all dynamic content | P0 |
| Resume Download Counter | Atomic increment endpoint, tamper-resistant (rate-limited per IP/session) | P0 |
| Visitor Counter | Anonymous page-view logging, aggregate dashboard stats | P0 |
| Analytics Dashboard | Time-series charts: visits, downloads, top-referrers, top-viewed projects | P1 |
| Admin Login | Credential-based auth, single-owner role (extensible to multi-admin) | P0 |
| Admin Dashboard | Central overview of all metrics + quick links to CRUD modules | P0 |
| CRUD: Projects | Full create/read/update/delete + image upload + reordering | P0 |
| CRUD: Certificates | Full CRUD + file/image upload | P0 |
| CRUD: Experience | Full CRUD with rich-text bullet editor | P0 |
| CRUD: Skills | Full CRUD with category assignment and icon selection | P0 |
| CRUD: Achievements | Full CRUD | P0 |
| CRUD: Resume | Upload new PDF version, mark active version, archive old versions | P0 |
| Blog Management (Optional) | MDX-based post CRUD, draft/publish states | P2 |

---

## 10. Database Design

### 10.1 Entity-Relationship Diagram (Text Format)

```
┌────────────────┐
│     USERS       │
│─────────────────│
│ PK id (uuid)     │
│    email         │
│    password_hash │
│    role          │
│    created_at    │
└────────┬─────────┘
         │ 1
         │
         │ owns/authors
         │ N
┌────────▼─────────┐        ┌───────────────────┐
│    PROJECTS       │        │    CERTIFICATES     │
│───────────────────│        │─────────────────────│
│ PK id (uuid)       │        │ PK id (uuid)         │
│ FK user_id ────────┼───┐    │ FK user_id ──────────┼──┐
│    title           │   │    │    title              │  │
│    slug (unique)    │   │    │    issuer             │  │
│    description       │   │    │    issue_date          │  │
│    problem_statement  │   │    │    credential_id        │  │
│    tech_stack (jsonb)  │   │    │    verify_url            │  │
│    cover_image_url      │   │    │    image_url               │  │
│    gallery_urls (jsonb)  │   │    │    display_order            │  │
│    live_url                │   │    │    created_at                 │  │
│    github_url                │   │    └────────────────────────────┘  │
│    category                    │                                       │
│    display_order                 │                                       │
│    is_featured                     │                                       │
│    view_count                        │                                       │
│    created_at                          │                                       │
│    updated_at                            │                                       │
└─────────────────────────────────────────┘                                       │
                                                                                     │
┌───────────────────┐        ┌───────────────────┐        ┌────────────────────┐   │
│    EXPERIENCE       │        │      SKILLS         │        │    ACHIEVEMENTS      │   │
│─────────────────────│        │─────────────────────│        │──────────────────────│   │
│ PK id (uuid)          │        │ PK id (uuid)          │        │ PK id (uuid)           │   │
│ FK user_id ────────────┼────────┼─ FK user_id ──────────┼────────┼─ FK user_id ───────────┼───┘
│    role_title            │        │    name                 │        │    title                 │
│    organization            │        │    category               │        │    description             │
│    location                  │        │    proficiency_level        │        │    date                       │
│    start_date                  │        │    icon_key                    │        │    issuer_or_event              │
│    end_date (nullable)           │        │    display_order                 │        │    proof_url                      │
│    is_current                      │        │    created_at                      │        │    display_order                    │
│    bullets (jsonb)                   │        └─────────────────────────────────────┘        │    created_at                          │
│    tech_tags (jsonb)                   │                                                        └─────────────────────────────────────────┘
│    display_order                         │
│    created_at                              │
└───────────────────────────────────────────┘

┌────────────────────┐        ┌────────────────────┐        ┌────────────────────┐
│     MESSAGES          │        │     VISITORS          │        │    DOWNLOADS           │
│──────────────────────│        │──────────────────────│        │──────────────────────│
│ PK id (uuid)            │        │ PK id (uuid)            │        │ PK id (uuid)            │
│    sender_name             │        │    session_hash             │        │ F