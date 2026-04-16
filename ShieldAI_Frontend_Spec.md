# ShieldAI Frontend Specification
**Version:** 1.0  
**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · Recharts · React Router v6 · Vercel  
**Last Updated:** April 2026

---

## 1. Project Overview

ShieldAI is an AI-native Endpoint Detection & Response (EDR) platform built for South African SMEs. This document specifies a fully functional, investor-grade frontend prototype. All data is sourced from local JSON mock files. Auth (sign up / sign in) persists to `users.json`. All other data is read from static mocks. The experience should feel production-ready — premium, polished, and trustworthy.

### Design Principles
- **Color palette:** Deep navy (`#0B1437`), rich blue (`#1A3A8F`), electric blue accent (`#2D7EF8`), sky blue highlight (`#4FC3F7`), white, and light grays
- **Typography:** `Inter` for body/UI, `Syne` for display headings — both available via Google Fonts
- **Logo:** Use provided `Shield_AI_Logo.png` in header/nav. Use `Shield_AI_Favicon.png` as browser favicon
- **Tone:** Confident, enterprise-grade, South African-first. No rounded pastel softness — sharp, precise, professional
- **Animations:** Subtle entrance animations (Framer Motion or CSS transitions). Live-feel data via interval-based mock updates
- **Dark theme only** across the entire app (dashboard area). Landing page uses dark navy background

---

## 2. Project Structure

```
shieldai-frontend/
├── public/
│   ├── favicon.png                  # Shield_AI_Favicon.png
│   ├── logo.png                     # Shield_AI_Logo.png
│   └── logo-icon.png                # Shield icon only (favicon version)
├── src/
│   ├── data/                        # All mock JSON files (the "database")
│   │   ├── users.json
│   │   ├── endpoints.json
│   │   ├── threats.json
│   │   ├── alerts.json
│   │   ├── reports.json
│   │   └── threatFeed.json
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   └── AppLayout.tsx
│   │   ├── ui/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── ThreatFeedItem.tsx
│   │   │   ├── EndpointRow.tsx
│   │   │   ├── EndpointDrawer.tsx
│   │   │   ├── AlertBanner.tsx
│   │   │   └── StepDots.tsx
│   │   └── charts/
│   │       ├── ThreatLineChart.tsx
│   │       ├── ThreatDonutChart.tsx
│   │       ├── EndpointHealthBar.tsx
│   │       └── WeeklyBarChart.tsx
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp/
│   │   │   ├── SignUpLayout.tsx
│   │   │   ├── Step1_Company.tsx
│   │   │   ├── Step2_Role.tsx
│   │   │   ├── Step3_Endpoints.tsx
│   │   │   └── Step4_Password.tsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Endpoints.tsx
│   │   │   ├── EndpointDetail.tsx
│   │   │   ├── Threats.tsx
│   │   │   ├── Reports.tsx
│   │   │   ├── Pricing.tsx
│   │   │   └── Settings.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useMockFeed.ts
│   ├── utils/
│   │   ├── auth.ts
│   │   └── formatters.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

---

## 3. Mock Data Layer

All data lives in `src/data/`. The app imports these directly. `users.json` is the only file that gets written to (via `localStorage` simulation — actual file writes aren't possible in the browser, so user data is stored in `localStorage` under the key `shieldai_users`, initialized from `users.json` on first load).

### 3.1 `users.json`
```json
[
  {
    "id": "u001",
    "firstName": "Dhiren",
    "lastName": "Chetty",
    "email": "dhiren@shieldai.co.za",
    "username": "dhiren.chetty",
    "password": "Demo@1234",
    "company": "ShieldAI Technologies",
    "role": "IT Manager",
    "endpointCount": "51-200",
    "plan": "growth",
    "createdAt": "2026-01-15T08:00:00Z",
    "avatar": null
  }
]
```
**Auth logic:** On sign-up, a new user object is appended and saved to `localStorage`. On sign-in, the array is searched for matching `email` + `password`. Active session stored as `shieldai_session` (user ID) in `localStorage`.

### 3.2 `endpoints.json`
```json
[
  {
    "id": "ep001",
    "name": "JHB-WKS-001",
    "os": "Windows 11",
    "user": "Sipho Ndlovu",
    "department": "Finance",
    "ip": "196.25.1.14",
    "status": "protected",
    "agentVersion": "1.2.4",
    "lastSeen": "2026-04-16T07:58:00Z",
    "threatsBlocked": 14,
    "healthScore": 98,
    "location": "Johannesburg"
  },
  {
    "id": "ep002",
    "name": "CPT-WKS-003",
    "os": "macOS Sonoma",
    "user": "Zanele Mokoena",
    "department": "Legal",
    "ip": "196.30.2.88",
    "status": "at_risk",
    "agentVersion": "1.2.1",
    "lastSeen": "2026-04-16T06:22:00Z",
    "threatsBlocked": 3,
    "healthScore": 61,
    "location": "Cape Town"
  },
  {
    "id": "ep003",
    "name": "JHB-SRV-002",
    "os": "Ubuntu 22.04",
    "user": "System",
    "department": "IT Infrastructure",
    "ip": "196.25.1.2",
    "status": "offline",
    "agentVersion": "1.2.4",
    "lastSeen": "2026-04-15T23:10:00Z",
    "threatsBlocked": 29,
    "healthScore": 0,
    "location": "Johannesburg"
  }
]
```
_Add 12–15 total endpoints with a realistic mix: 70% protected, 15% at_risk, 15% offline. Mix of Windows, macOS, Linux. Departments: Finance, Legal, HR, IT, Operations, Executive._

### 3.3 `threats.json`
```json
[
  {
    "id": "t001",
    "name": "ABSA Credential Phishing Kit v3",
    "category": "phishing",
    "severity": "critical",
    "sourceIP": "41.21.33.107",
    "sourceCountry": "ZA",
    "targetEndpoint": "ep002",
    "targetUser": "Zanele Mokoena",
    "action": "quarantined",
    "confidence": 97,
    "detectedAt": "2026-04-16T07:45:00Z",
    "africanSignature": true,
    "description": "Credential harvesting page mimicking ABSA Business Banking login portal. Detected via AfricaCERT signature AF-2026-0341."
  },
  {
    "id": "t002",
    "name": "Eskom Outage Ransomware Lure",
    "category": "ransomware",
    "severity": "high",
    "sourceIP": "197.80.12.44",
    "sourceCountry": "ZA",
    "targetEndpoint": "ep001",
    "targetUser": "Sipho Ndlovu",
    "action": "blocked",
    "confidence": 99,
    "detectedAt": "2026-04-16T06:30:00Z",
    "africanSignature": true,
    "description": "Malicious payload disguised as Eskom load-shedding schedule update. CSIRT.ZA advisory CSZ-2026-119."
  },
  {
    "id": "t003",
    "name": "FNB Business Banking Spoof",
    "category": "phishing",
    "severity": "high",
    "sourceIP": "102.33.22.88",
    "sourceCountry": "NG",
    "targetEndpoint": "ep004",
    "targetUser": "Thabo Sithole",
    "action": "blocked",
    "confidence": 94,
    "detectedAt": "2026-04-16T05:15:00Z",
    "africanSignature": true,
    "description": "Spoofed FNB login page targeting business account credentials via email link."
  },
  {
    "id": "t004",
    "name": "Generic PowerShell Obfuscation",
    "category": "malware",
    "severity": "medium",
    "sourceIP": "45.33.12.100",
    "sourceCountry": "US",
    "targetEndpoint": "ep005",
    "targetUser": "Priya Naidoo",
    "action": "flagged",
    "confidence": 78,
    "detectedAt": "2026-04-15T22:40:00Z",
    "africanSignature": false,
    "description": "Obfuscated PowerShell execution detected on endpoint. Common global attack vector."
  }
]
```
_Add 20–25 total threats spanning the last 7 days. Mix of severities. At least 60% should have `africanSignature: true` to support the differentiation narrative._

### 3.4 `alerts.json`
```json
[
  {
    "id": "a001",
    "type": "critical",
    "message": "Endpoint CPT-WKS-003 quarantine action required",
    "endpointId": "ep002",
    "timestamp": "2026-04-16T07:45:00Z",
    "read": false
  },
  {
    "id": "a002",
    "type": "warning",
    "message": "Agent version outdated on 3 endpoints",
    "endpointId": null,
    "timestamp": "2026-04-16T06:00:00Z",
    "read": false
  },
  {
    "id": "a003",
    "type": "info",
    "message": "AfricaCERT threat feed updated — 12 new signatures",
    "endpointId": null,
    "timestamp": "2026-04-16T04:00:00Z",
    "read": true
  }
]
```

### 3.5 `reports.json`
```json
{
  "trialReport": {
    "company": "Cape Town Legal Partners",
    "period": "2026-04-02 to 2026-04-16",
    "totalThreats": 47,
    "threatsBlockedByShieldAI": 47,
    "threatsMissedByCurrentAV": 31,
    "criticalIncidents": 4,
    "highIncidents": 12,
    "estimatedDamageAvoided": "R2.1M",
    "currentAVName": "McAfee Endpoint Security",
    "africanSpecificThreats": 29,
    "topThreats": [
      {"name": "ABSA Phishing Kit", "count": 8, "severity": "critical"},
      {"name": "Eskom Ransomware Lure", "count": 5, "severity": "high"},
      {"name": "FNB Business Spoof", "count": 7, "severity": "high"},
      {"name": "SARS Refund Scam", "count": 4, "severity": "medium"}
    ]
  }
}
```

### 3.6 `threatFeed.json`
Live-scrolling feed data. Array of 50 entries, each ~30 seconds apart, giving the dashboard its "live" feel via a rotating interval.
```json
[
  {
    "id": "f001",
    "time": "07:58:14",
    "type": "blocked",
    "threat": "Phishing URL",
    "endpoint": "JHB-WKS-001",
    "ip": "196.25.1.14"
  }
]
```

---

## 4. Routing Structure

```
/                        → Landing
/signin                  → Sign In
/signup                  → Sign Up (multi-step layout wrapper)
/signup/step/1           → Step 1: Company
/signup/step/2           → Step 2: Role
/signup/step/3           → Step 3: Endpoint count
/signup/step/4           → Step 4: Password

/dashboard               → Dashboard home (protected route)
/dashboard/endpoints     → Endpoints list
/dashboard/endpoints/:id → Endpoint detail drawer (or modal)
/dashboard/threats       → Threat intelligence
/dashboard/reports       → Reports & trial summary
/dashboard/pricing       → Pricing & plan
/dashboard/settings      → Settings
```

Protected routes redirect to `/signin` if no active session in `localStorage`.

---

## 5. Pages — Detailed Specification

---

### 5.1 Landing Page (`/`)

**Purpose:** Convince an investor or prospect that ShieldAI is real and compelling. Drive them toward "Start Free Trial" or "Sign In."

**Layout:** Full-page scroll. Dark navy background (`#0B1437`). Sections:

#### Section 1 — Hero
- Left: `Shield_AI_Logo.png` in top-left nav. Nav links: Features, Pricing, About. Right nav: "Sign In" (ghost button) + "Start Free Trial" (solid blue button)
- Hero headline (large, bold, Syne font): *"Cyber protection built for South Africa"*
- Subheadline: *"AI-native endpoint security that stays online during load-shedding, trained on local threat intelligence."*
- Two CTA buttons: "Start Free Trial" → `/signup` | "View Dashboard" → `/signin`
- Right side of hero: animated shield icon with pulsing rings, and a floating "threat blocked" notification card that appears every few seconds (CSS animation)
- Below hero: stat strip — `2,100+ attacks/week in SA` · `R44M avg. breach cost` · `R2,500/endpoint/month` · `<1 sec detection time`

#### Section 2 — The Problem (3 pain point cards)
- Card 1: Global tools miss local threats (trained on US/EU data)
- Card 2: High cost and complexity — not built for SMEs
- Card 3: Fail during load-shedding (cloud-dependent architectures)
Each card: icon, bold heading, 2-sentence description. Dark card background (`#0F1D3D`), blue accent border-left.

#### Section 3 — How It Works (3-step horizontal flow)
Step 1: Deploy lightweight agent → Step 2: AI detects threats locally → Step 3: Auto-quarantine & alert
Visual: connected nodes with arrows, subtle animation on scroll or on hover.

#### Section 4 — Key Features (grid of 4)
- Edge AI (offline protection)
- AfricaCERT Intelligence
- Automated Threat Response
- POPIA Compliant
Each: icon + title + short description. Grid layout, hover lift effect.

#### Section 5 — Pricing Preview
Three tier cards (see Section 5.8 for full detail). Brief, with CTA.

#### Section 6 — Footer
Logo, links, "Built for South Africa" tagline, copyright.

---

### 5.2 Sign In Page (`/signin`)

**Layout:** Centered card on dark navy background. Shield icon above card.

**Elements:**
- ShieldAI logo at top of card
- Heading: "Welcome back"
- Email input
- Password input (with show/hide toggle)
- "Sign In" button (full width, solid blue)
- "Don't have an account? Start Free Trial" link → `/signup`
- Error state: inline red message "Invalid email or password" if credentials not found

**Auth logic:** Search `localStorage` users array for matching email + password. On success, store user ID in `localStorage` as `shieldai_session`. Redirect to `/dashboard`.

---

### 5.3 Sign Up Flow (`/signup`)

**Layout:** Full-screen split — left panel (dark blue, `#0B1437`) with logo, tagline, and a testimonial quote. Right panel: white card with step content. Step indicator dots at bottom of card (4 dots, active dot is filled blue, previous dots are blue check marks, future dots are grey).

**Progress persistence:** Store current step data in component state, passed via React Context or lifted state. On final step submission, write complete user to `localStorage`.

#### Step 1 — Company Details
- Heading: "Tell us about your company"
- Fields: Company Name (text), Industry (select: Financial Services / Legal / Retail / Healthcare / Other), City (select: Johannesburg / Cape Town / Durban / Pretoria / Other)
- "Continue" button. All fields required.

#### Step 2 — Your Role
- Heading: "Who are you in the organisation?"
- Visual role selector cards (not a dropdown) — 4 large clickable cards:
  - IT Manager
  - Business Owner
  - Security Analyst
  - C-Suite / Executive
- Each card has an icon, title, short description. Selected card gets blue border + background tint.
- "Continue" / "Back" buttons.

#### Step 3 — Endpoint Count
- Heading: "How many devices need protection?"
- Visual tier selector cards:
  - Starter: 1–50 endpoints
  - Growth: 51–200 endpoints
  - Enterprise: 201–500 endpoints
- Each card shows the corresponding monthly price (R2,125 / R2,500 / custom). Selected card highlighted.
- "Continue" / "Back" buttons.

#### Step 4 — Create Account
- Heading: "Set up your account"
- Fields: First Name, Last Name, Email, Username (auto-suggested from first/last name, editable), Password, Confirm Password
- Password strength indicator bar (CSS-only, check for length + uppercase + number + special char)
- Checkbox: "I agree to the Terms of Service and Privacy Policy"
- "Create Account" button
- On submit: validate, write user to `localStorage` users array, create session, redirect to `/dashboard`

**Left panel content (static):**
- Logo
- Headline: *"Join South Africa's most intelligent security platform"*
- 3 bullet points with check icons: "Deploy in minutes" / "No dedicated security team needed" / "Stay protected during load-shedding"
- Testimonial quote block: *"ShieldAI detected 31 threats our existing antivirus missed in the first two weeks."* — attributed to "IT Manager, Cape Town Legal Partners"

---

### 5.4 Dashboard Home (`/dashboard`)

**Layout:** `AppLayout` wraps all dashboard pages. Left sidebar (fixed, 240px wide) + top bar + main content area.

#### Sidebar
- Logo at top (icon version `Shield_AI_Favicon.png` + "ShieldAI" text)
- Nav items (with icons):
  - Dashboard (home icon) — active state: blue background pill
  - Endpoints (monitor icon)
  - Threats (shield alert icon)
  - Reports (file chart icon)
  - Pricing (credit card icon)
  - Divider
  - Settings (gear icon)
- Bottom of sidebar: user avatar circle (initials), user name, email, small "Sign Out" button
- Sidebar background: `#0B1437`. Active item: `#1A3A8F` pill. Text: white / muted blue-gray for inactive.

#### Topbar
- Page title (changes per route)
- Right side: notification bell with badge count (from unread alerts), "Protection Active" green status pill, user avatar + name

#### Dashboard Main Content

**Row 1 — Metric Cards (4 cards)**

| Card | Value | Sub-label | Color accent |
|------|-------|-----------|--------------|
| Endpoints Protected | e.g. 12/14 | 2 need attention | Blue |
| Threats Blocked Today | e.g. 23 | ↑ 4 from yesterday | Green |
| Active Alerts | e.g. 2 | 1 critical | Red |
| System Health | e.g. 94% | Last updated 2 min ago | Teal |

Each card: dark background (`#0F1D3D`), colored top-border accent, metric in large bold text, sub-label in muted text, small trend arrow.

**Row 2 — Main Chart + Threat Feed (two columns)**

Left (65%): `ThreatLineChart` — line chart showing threats detected over the last 7 days. X-axis: dates. Y-axis: threat count. Two lines: "Threats Detected" (blue) vs "Threats Blocked" (green). Built with Recharts `LineChart`. Chart title: "Threat Activity — Last 7 Days". Toggle buttons above chart: 7D / 14D / 30D (changes displayed data from `threats.json`).

Right (35%): Live Threat Feed — scrolling list of recent threat events. Each item: colored dot (severity), threat name, endpoint name, time (e.g. "2 min ago"). Auto-rotates through `threatFeed.json` entries using a `setInterval` every 4 seconds, prepending new items with a fade-in animation. Header: "Live Threat Feed" + green pulsing dot.

**Row 3 — Endpoint Health + Threat Breakdown (two columns)**

Left (40%): Endpoint Status Summary — horizontal bar showing: X Protected (green) / X At Risk (amber) / X Offline (red). Below: list of the 3 most recently active endpoints with status badge.

Right (60%): `ThreatDonutChart` — donut chart showing threat breakdown by category: Phishing / Ransomware / Malware / Other. Built with Recharts `PieChart`. Custom legend below chart with category name + count + percentage.

**Row 4 — AfricaCERT Intelligence Banner**
Full-width info card: blue gradient left border, shield icon, text: *"Threat intelligence last updated 4 hours ago from AfricaCERT and CSIRT.ZA — 12 new regional signatures loaded."* Right side: "View Threat Library" button → `/dashboard/threats`.

---

### 5.5 Endpoints Page (`/dashboard/endpoints`)

**Purpose:** View and manage all protected devices.

**Layout:** Full-width table with filter/search bar above.

**Filter bar:**
- Search input (filters by endpoint name, user, or IP)
- Status dropdown filter: All / Protected / At Risk / Offline
- OS filter: All / Windows / macOS / Linux
- Export button (stub — shows a "Coming Soon" toast)

**Endpoints Table columns:**
| Column | Content |
|--------|---------|
| Endpoint | Name + OS icon |
| User | Name + Department badge |
| Status | `StatusBadge` component (color-coded pill) |
| Health | Mini progress bar (0–100%) |
| Threats Blocked | Number with shield icon |
| Last Seen | Relative time (e.g. "3 min ago") |
| Agent Version | Version number, red if outdated |
| Actions | "View Details" button |

Table rows: `#0F1D3D` background, hover state `#1A3A8F` tint, alternating subtle row shade. Clicking any row OR "View Details" opens the Endpoint Detail Drawer.

**Endpoint Detail Drawer (right-side slide-in panel, 420px wide):**
Renders over the table without full navigation. Contains:
- Endpoint name + OS badge + status badge at top
- User name, department, IP address, location
- Health score: large circular progress indicator
- Threat history for that endpoint: mini table of last 5 threats (name, severity, date, action)
- `WeeklyBarChart` — bar chart of threats blocked per day for that endpoint over last 7 days
- Agent info: version, last update, uptime
- Action buttons: "Force Agent Update" / "Isolate Endpoint" / "Run Scan" — all show a success toast but are stubs
- "Close" button (X) top right

---

### 5.6 Threats Page (`/dashboard/threats`)

**Purpose:** Full threat intelligence log with SA-specific context.

**Layout:** Two sections — summary charts row, then full threat table.

**Summary Row (3 cards):**
- Total Threats (this month)
- African-Signature Threats % (e.g. "67% were SA-specific — undetected by global tools")
- Avg. Confidence Score

**AfricaCERT Banner:**
Prominent card: dark blue background, circuit-board texture (CSS pattern or SVG), logo area. Text: *"ShieldAI threat detection is powered by AfricaCERT and CSIRT.ZA — the only SA-native threat intelligence feeds. Global competitors use US/EU training data, meaning local threats like ABSA phishing kits and Eskom ransomware lures are detected up to 4x faster."* Subtle "Learn More" link (stub).

**Filter Bar:**
- Search (threat name or source IP)
- Category: All / Phishing / Ransomware / Malware / Trojan
- Severity: All / Critical / High / Medium / Low
- Date range: Last 24h / 7 days / 30 days
- Toggle: "Show SA-signature threats only"

**Threats Table columns:**
| Column | Content |
|--------|---------|
| Threat Name | Bold name + `africanSignature` flag badge (blue "SA" pill if true) |
| Category | Color-coded badge |
| Severity | Color-coded pill (Critical=red, High=amber, Medium=yellow, Low=gray) |
| Source IP | IP address + country flag emoji |
| Target | Endpoint name + user |
| Action Taken | Badge: Quarantined (green) / Blocked (blue) / Flagged (amber) |
| Confidence | % with colored bar |
| Detected | Relative or absolute time |

Clicking a row expands inline (accordion) to show full `description` text + recommended follow-up action (static per category).

**Bottom Section — Severity Breakdown Chart:**
Recharts `BarChart` showing threats by severity category over last 7 days. Side by side bars per day: Critical (red), High (amber), Medium (yellow). Title: "Severity Trends — Last 7 Days".

---

### 5.7 Reports Page (`/dashboard/reports`)

**Purpose:** Demonstrate ROI, build trust, show the "trial mode" output that converts prospects.

**Layout:** Page header + two main sections.

**Section 1 — Trial Report Card (full-width premium card)**
Styled as a formal report document within the UI. Dark card, subtle grid background pattern.

Header of card:
- ShieldAI logo (small) left, "Security Assessment Report" right
- Company: Cape Town Legal Partners
- Period: 02 April – 16 April 2026
- Generated by: ShieldAI Edge Agent v1.2.4

Key metrics row (4 stat blocks inside the card):
- Total Threats Detected: **47**
- Missed by Current AV: **31** (red, alarming)
- Critical Incidents: **4**
- Estimated Damage Avoided: **R2.1M**

**"ShieldAI vs Your Current Tool" comparison table (inside card):**
| Metric | McAfee (Current) | ShieldAI |
|--------|-----------------|----------|
| SA-Specific Threats Detected | 16 | 47 |
| Phishing Kits Blocked | 3 | 19 |
| Ransomware Stopped | 0 | 6 |
| Avg. Detection Time | ~8 min | <1 sec |
| Works During Load-Shedding | No | Yes |

Styled with McAfee column in muted/red tones, ShieldAI column in green/blue tones.

**Top Threats Detected (inside card):**
Mini bar chart (Recharts) showing top 4 threats by count. Horizontal bar chart. Each bar colored by severity.

**Call-to-action at bottom of card:**
Blue gradient box: *"ShieldAI blocked 31 threats your current antivirus missed. Upgrade to full protection today."*  
Button: "Upgrade to Paid Plan — R2,500/endpoint/month" → `/dashboard/pricing`

**Section 2 — Historical Reports List**
Simple list of "previous reports" (all static):
- Monthly Summary — March 2026
- Monthly Summary — February 2026
- Incident Report — Eskom Ransomware Lure (Feb 12)

Each row: report name, date, type badge, "Download PDF" button (stub — shows toast: "PDF export available in Growth plan").

---

### 5.8 Pricing Page (`/dashboard/pricing`)

**Purpose:** Show the business model, allow plan selection (stub upgrade).

**Layout:** Centered, max-width container. Current plan highlighted.

**Plan Cards (3 columns):**

**Starter** — `R2,125/endpoint/month`
- Up to 50 endpoints
- Windows agent
- AfricaCERT intelligence
- Email alerts
- Basic dashboard
- 30-day trial available
- Button: "Current Plan" (if on starter) or "Select"

**Growth** — `R2,500/endpoint/month` *(Most Popular — blue badge)*
- Up to 200 endpoints
- Windows + macOS + Linux
- AfricaCERT + CSIRT.ZA intelligence
- Smart alerts + playbooks
- Full dashboard + reports
- POPIA compliance
- Priority support
- Button: "Upgrade" (stub — shows modal: "Contact our team to upgrade")

**Enterprise** — `Custom pricing`
- Unlimited endpoints
- All Growth features
- MSP portal access
- Advanced forensics
- Dedicated account manager
- SLA guarantee
- Button: "Contact Sales" (stub — shows modal with email address)

Below cards: pricing note — *"All prices in South African Rand. Approximately 15% below SentinelOne's entry-tier pricing of R2,941/endpoint/month."*

**Billing cycle toggle:** Monthly / Annual (Annual shows ~15% discount badge — stub, values don't change)

---

### 5.9 Settings Page (`/dashboard/settings`)

**Layout:** Two-column. Left: vertical settings nav tabs. Right: active section content.

**Settings Nav Tabs:**
1. Profile *(functional)*
2. Security *(functional — password change)*
3. Notifications *(stub)*
4. Integrations *(stub)*
5. Billing *(stub)*
6. Team Members *(stub)*

#### Tab 1 — Profile (FUNCTIONAL)
Fields (all pre-filled from session user data):
- First Name + Last Name (editable, saves to localStorage)
- Email (editable, validates format, saves to localStorage)
- Username (editable, checks for uniqueness in users array, saves)
- Company Name (editable, saves)
- Role (select, saves)
- City (select, saves)
"Save Changes" button → updates user in `localStorage` users array + shows success toast "Profile updated successfully."

Avatar section: circle with initials (first + last name initial), "Change Photo" button → stub toast "Photo upload available in Growth plan."

#### Tab 2 — Security (FUNCTIONAL)
- Current Password input
- New Password input (with strength indicator)
- Confirm New Password input
"Update Password" → validates current password against stored hash, updates if correct, shows success/error toast.

Active Sessions section (static display): one row showing "Current session — Chrome, Johannesburg — Active now." "Sign Out All Devices" button → clears localStorage session, redirects to `/signin`.

#### Tab 3 — Notifications (STUB)
Render the full UI with toggles for:
- Email alerts for critical threats
- Weekly summary report
- Agent update notifications
- AfricaCERT feed updates
All toggles render and animate but do not persist. Show a blue info banner: *"Notification preferences will sync to your account in a future update."*

#### Tab 4 — Integrations (STUB)
Show integration cards for: Slack, Microsoft Teams, PagerDuty, ServiceNow. Each has a logo, description, and "Connect" button. Clicking "Connect" shows a modal with a stub OAuth flow message: *"Integration setup coming in v1.3. Contact support to enable early access."*

#### Tab 5 — Billing (STUB)
Show current plan card (Growth), next billing date (static), and an invoice table (3 static rows). "Manage Billing" button shows stub modal.

#### Tab 6 — Team Members (STUB)
Table with 3 static team members (name, role, status, last active). "Invite Member" button shows a modal with email input that closes after "Send" and shows toast: *"Invitation sent. Team management available in Growth plan."*

---

## 6. Shared Components

### 6.1 `MetricCard`
Props: `title`, `value`, `subLabel`, `trend` (up/down/neutral), `accentColor`
Renders: dark card, top border in `accentColor`, large value, muted sublabel, trend arrow icon

### 6.2 `StatusBadge`
Props: `status`: `'protected' | 'at_risk' | 'offline' | 'quarantined' | 'blocked' | 'flagged'`
Color map: protected=green, at_risk=amber, offline=gray, quarantined=green, blocked=blue, flagged=amber

### 6.3 `StepDots`
Props: `totalSteps`, `currentStep`
Renders: row of dots. Completed = blue with check SVG. Active = solid blue, slightly larger. Upcoming = gray outline.

### 6.4 `ThreatFeedItem`
Props: `type`, `threat`, `endpoint`, `ip`, `time`
Renders: left colored dot, threat name (bold), endpoint name (muted), time (right-aligned). Fade-in animation on mount.

### 6.5 `AlertBanner`
Props: `type`: `'critical' | 'warning' | 'info'`, `message`, `onDismiss`
Renders at top of dashboard main content. Critical=red, warning=amber, info=blue. Dismiss X button.

### 6.6 `AppLayout`
Wraps all `/dashboard/*` routes. Renders `<Sidebar>` + `<Topbar>` + `<main>` with children. Handles responsive collapse of sidebar on mobile (hamburger menu).

---

## 7. Charts Specification (Recharts)

### 7.1 `ThreatLineChart`
- Type: `LineChart`
- Data source: `threats.json` grouped by day
- Lines: `threatsDetected` (stroke `#2D7EF8`), `threatsBlocked` (stroke `#00E676`)
- XAxis: date labels (Mon/Tue etc), YAxis: count
- Custom tooltip: dark background, shows date + both values
- Toggle: 7D / 14D / 30D filters the data slice

### 7.2 `ThreatDonutChart`
- Type: `PieChart` with `innerRadius`
- Data: category counts from `threats.json`
- Colors: Phishing `#2D7EF8`, Ransomware `#FF4444`, Malware `#FFB300`, Trojan `#26C6DA`, Other `#8A9BB8`
- Center label: total count
- Custom HTML legend below

### 7.3 `WeeklyBarChart` (Endpoint detail)
- Type: `BarChart`
- Data: filtered `threats.json` by endpointId, grouped by day
- Single bar per day, color: `#2D7EF8`
- Small, compact — fits inside the drawer panel

### 7.4 Severity Trend Chart (Threats page)
- Type: `BarChart` with grouped bars
- Data: `threats.json` grouped by day + severity
- Bar colors per severity: Critical `#FF4444`, High `#FFB300`, Medium `#F59E0B`

### 7.5 Trial Report Mini Chart (Reports page)
- Type: `BarChart` (horizontal)
- Data: `reports.json` `topThreats` array
- Single bar per threat, colored by severity
- Compact, inside the report card

---

## 8. Auth & Session Management

```typescript
// src/utils/auth.ts

const STORAGE_KEY = 'shieldai_users';
const SESSION_KEY = 'shieldai_session';

export function initUsers(): void {
  // On first load, seed localStorage from users.json if not already present
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
  }
}

export function getUsers(): User[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function signIn(email: string, password: string): User | null {
  const users = getUsers();
  const match = users.find(u => u.email === email && u.password === password);
  if (match) {
    localStorage.setItem(SESSION_KEY, match.id);
    return match;
  }
  return null;
}

export function signUp(newUser: Omit<User, 'id' | 'createdAt'>): User {
  const users = getUsers();
  const user: User = {
    ...newUser,
    id: `u${Date.now()}`,
    createdAt: new Date().toISOString(),
    plan: 'starter',
  };
  saveUsers([...users, user]);
  localStorage.setItem(SESSION_KEY, user.id);
  return user;
}

export function getCurrentUser(): User | null {
  const id = localStorage.getItem(SESSION_KEY);
  if (!id) return null;
  return getUsers().find(u => u.id === id) || null;
}

export function signOut(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function updateUser(updatedUser: User): void {
  const users = getUsers();
  saveUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
}
```

`AuthContext.tsx` wraps the app, provides `{ user, signIn, signOut, updateUser }` to all components. `ProtectedRoute` component checks `getCurrentUser()` and redirects if null.

---

## 9. Tailwind Configuration

```typescript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#060D1F',
          800: '#0B1437',
          700: '#0F1D3D',
          600: '#152548',
          500: '#1A3A8F',
        },
        shield: {
          blue: '#2D7EF8',
          sky: '#4FC3F7',
          electric: '#1565C0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
};
```

---

## 10. Package Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.23.0",
    "recharts": "^2.12.0",
    "lucide-react": "^0.383.0",
    "clsx": "^2.1.0",
    "date-fns": "^3.6.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "vite": "^5.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0"
  }
}
```

**Icon library:** `lucide-react` — use throughout for nav icons, status indicators, UI elements.  
**Date formatting:** `date-fns` — `formatDistanceToNow`, `format` for all timestamp displays.  
**Conditional classes:** `clsx` — for dynamic Tailwind class composition.

---

## 11. UX & Interaction Details

### Toasts
A lightweight toast system (custom, no library needed). Toasts appear bottom-right, auto-dismiss after 3 seconds. Types: success (green), error (red), info (blue), warning (amber). Used for: save actions, stub button clicks, copy to clipboard.

### Loading States
All data loads should have a brief skeleton loader (gray animated shimmer blocks in the shape of the content). Since data is local JSON, this will be nearly instant, but the skeleton should flash for ~300ms on mount to feel realistic.

### Empty States
If a user signs up fresh and has "no threats" / "no endpoints" (because they're a new user), show a friendly empty state with an illustration (simple SVG shield icon), a message ("No threats detected yet — your endpoints are clean"), and a prompt to explore.

### Responsive Breakpoints
- Mobile (< 768px): Sidebar collapses behind hamburger. Metric cards stack 2x2. Tables become card lists.
- Tablet (768–1024px): Sidebar shows icon-only mode (48px wide). Metric cards 2x2.
- Desktop (> 1024px): Full sidebar (240px). Standard layouts as described.

### Transitions & Motion
- Page transitions: fade + slight upward translate (100ms) via React Router outlet
- Sidebar active item: background color transition (150ms)
- Cards: hover scale (1.01) + border brightening (150ms ease)
- Drawer: slide in from right (250ms ease-out)
- Threat feed items: fade-in + slide-down on prepend (200ms)
- Step dots: scale + color transition between steps

---

## 12. Deployment (Vercel)

```
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

`vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This ensures React Router client-side routing works on Vercel (SPA fallback).

No environment variables required. No backend. No API calls. Pure static deployment.

---

## 13. File Checklist Before Build

- [ ] `public/favicon.png` — copy Shield_AI_Favicon.png here
- [ ] `public/logo.png` — copy Shield_AI_Logo.png here  
- [ ] All 6 JSON mock files populated with realistic SA data (minimum entry counts per spec above)
- [ ] `tailwind.config.ts` extended with custom colors and fonts
- [ ] Google Fonts imported in `index.html` (Inter + Syne)
- [ ] `AuthContext` wrapping `App.tsx`
- [ ] All protected routes wrapped in `ProtectedRoute`
- [ ] `initUsers()` called in `main.tsx` before render

---

*This spec is the single source of truth for the ShieldAI frontend prototype. All data, routing, component names, and visual decisions described here should be implemented as specified. Deviations should be documented with rationale.*
