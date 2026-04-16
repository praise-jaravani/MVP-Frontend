# ShieldAI Frontend - Premium EDR Platform

A fully functional, investor-grade frontend prototype for ShieldAI, an AI-native Endpoint Detection & Response (EDR) platform built for South African SMEs.

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling with custom theme
- **Recharts** - Beautiful data visualizations
- **React Router v6** - Client-side routing
- **Lucide React** - Premium icon library
- **Date-fns** - Date formatting utilities

## 🎨 Design Features

- **Dark Theme** - Professional navy-based color palette (#0B1437, #2D7EF8)
- **Premium Apple-Style Landing** - Aurora gradient background with dynamic glow ripple effects
- **Scroll-Based Parallax** - 3-layer parallax storytelling experience with depth
- **Aurora Animations** - Flowing gradient layers (purple→blue→cyan) with 20-30s animation cycles
- **Dynamic Glow Ripples** - Pulsing radial gradients that create living background effect
- **Premium Animations** - Float-in, fade-in, slide transitions, staggered reveals
- **Loading States** - Skeleton loaders with shimmer effects
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Live Updates** - Real-time threat feed simulation (4-second intervals)
- **Interactive Charts** - Recharts-powered line, donut, and bar charts
- **Floating Particles** - 20 animated particles with random positions and timing

## 📁 Project Structure

```
shieldai-frontend/
├── src/
│   ├── components/
│   │   ├── layout/          # Sidebar, Topbar, AppLayout
│   │   ├── ui/              # Reusable UI components
│   │   └── charts/          # Recharts components
│   ├── pages/
│   │   ├── Landing.tsx      # Public landing page
│   │   ├── SignIn.tsx       # Authentication
│   │   ├── SignUp/          # Multi-step registration
│   │   └── dashboard/       # Protected dashboard pages
│   ├── context/
│   │   ├── AuthContext.tsx  # Authentication state
│   │   └── ToastContext.tsx # Toast notifications
│   ├── data/               # Mock JSON data
│   ├── utils/              # Helper functions
│   └── types/              # TypeScript definitions
├── public/
│   ├── favicon.png         # Shield AI favicon
│   └── logo.png            # Shield AI logo
└── tailwind.config.ts      # Custom theme configuration
```

## 🎯 Key Features

### Authentication
- ✅ **Sign In** - Email/password with demo credentials
- ✅ **Sign Up** - 4-step onboarding (Company → Role → Endpoints → Password)
- ✅ **Protected Routes** - Automatic redirection
- ✅ **Session Management** - localStorage persistence

### Dashboard Pages
- ✅ **Dashboard Home** - Live metrics, threat feed, interactive charts
- ✅ **Endpoints** - Filterable table with detail drawer
- ✅ **Threats** - Advanced filtering, SA-signature highlighting
- ✅ **Reports** - Trial assessment with ROI metrics
- ✅ **Pricing** - 3-tier plan comparison
- ✅ **Settings** - Functional Profile & Security tabs

## 🔐 Demo Credentials

```
Email: dhiren@shieldai.co.za
Password: Demo@1234
```

## 🚀 Getting Started

### Installation

```bash
cd shieldai-frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

## 🌐 Deployment (Vercel)

```bash
npm i -g vercel
vercel
```

The `vercel.json` file is already configured for SPA routing.

## 📊 Mock Data

- **users.json** - Auth data (localStorage sync)
- **endpoints.json** - 14 devices (70% protected, 15% at_risk, 15% offline)
- **threats.json** - 25 threats (60% with African signatures)
- **alerts.json** - System notifications
- **reports.json** - Trial comparison data
- **threatFeed.json** - 50 live feed items

## 🎨 Theme

**Colors:**
- Navy: #0B1437 (bg), #0F1D3D (cards), #1A3A8F (accents)
- Shield Blue: #2D7EF8, #4FC3F7 (sky), #1565C0 (electric)

**Fonts:**
- Body: Inter (Google Fonts)
- Display: Syne (Google Fonts)

**Animations:**
- `animate-fade-in` - Fade + slide up
- `animate-slide-in` - Right slide
- `animate-float` - Floating effect
- `animate-aurora-1/2/3` - Aurora gradient flow effects (20-30s cycles)
- `animate-ripple-1/2/3` - Dynamic glow ripple waves (6-10s cycles)
- `animate-float-particle` - Floating particle animation
- `shimmer` - Loading effect

## 🔧 Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📝 User Flow

1. **Landing** → Premium Apple-style experience with 7 scroll sections:
   - Hero: "Calm Power" messaging
   - Problem: Load-shedding vulnerability
   - Differentiator: Edge AI technology
   - Local Intelligence: SA-specific threats
   - Real-time Protection: Live threat feed
   - Proof: Trial mode statistics
   - Pricing: Simple transparent plans
2. **Sign Up** → 4-step form with validation
3. **Sign In** → Auth with error handling
4. **Dashboard** → Live metrics & charts
5. **Endpoints** → Manage devices
6. **Threats** → Intelligence filtering
7. **Reports** → Trial ROI analysis
8. **Settings** → Profile & security management

## ✨ Highlights

- 🎯 **100% TypeScript** - Full type safety
- 🎨 **Premium UI** - Professional animations & interactions
- 📊 **Data Visualization** - Recharts integration
- 🔐 **Auth Flow** - Complete sign-up/sign-in
- 🌍 **SA-Focused** - African threat intelligence theme
- 📱 **Responsive** - Mobile-friendly design
- ⚡ **Fast** - Vite build system

## 🚢 Production Readiness

**Completed:**
- ✅ All pages implemented
- ✅ Authentication system
- ✅ Mock data layer
- ✅ Responsive design
- ✅ Animations & transitions
- ✅ Toast notifications
- ✅ Loading states
- ✅ Vercel configuration

**For Production:**
- Backend API integration
- Real-time WebSocket updates
- Email notifications
- JWT authentication
- Database persistence

---

**Built for South Africa 🇿🇦**

Development Server Running at: http://localhost:5173
