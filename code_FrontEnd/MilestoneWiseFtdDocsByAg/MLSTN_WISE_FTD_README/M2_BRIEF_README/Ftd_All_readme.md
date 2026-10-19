# TripNest — Complete Frontend Roadmap & Architecture Guide (Ftd_All_readme.md)

**Project:** TripNest Travel Management Platform  
**Architecture:** React 19 + Vite + React Router DOM v6 + Axios + Context API  
**Scope:** Complete Frontend Reference (Milestones 1 to 5+)

---

## 🎨 Design System & UI Architecture

TripNest features a modern travel SaaS interface built around clean functional components, responsive grids, and frosted glass design tokens:

```
       +-------------------------------------------------------+
       |                      index.html                       |
       +-------------------------------------------------------+
                                   |
       +-------------------------------------------------------+
       |                       main.jsx                        |
       |                    <AuthProvider>                     |
       |                   <BrowserRouter>                     |
       +-------------------------------------------------------+
                                   |
       +-------------------------------------------------------+
       |                       App.jsx                         |
       |                     <Navbar />                        |
       |                <Routes> / </Routes>                   |
       +-------------------------------------------------------+
                                   |
         +-----------------+-------+---------+-----------------+
         |                 |                 |                 |
  +--------------+  +--------------+  +--------------+  +--------------+
  |  Home / Auth |  |  Dashboard   |  |  Trips List  |  | Destinations |
  | (Login/Reg)  |  | (Metrics/Hub)|  | & Planning   |  |  Directory   |
  +--------------+  +--------------+  +--------------+  +--------------+
                                             |                 |
                                      +--------------+  +--------------+
                                      | Trip Details |  | Destination  |
                                      | & Itinerary  |  | Guide & Fees |
                                      +--------------+  +--------------+
```

---

## 🗺️ Milestone Roadmap & Capabilities

### Milestone 1: Authentication & Layout Foundation ✅
- **Setup:** Vite + React 19 single-page app with clean dependency tree.
- **Pages:** `Home.jsx`, `Login.jsx`, `Register.jsx`.
- **Global State:** `AuthContext` storing JWT tokens in `localStorage`, decoding user email/roles via `atob`.
- **Routing:** `ProtectedRoute.jsx` guarding private pages, OAuth2 callback redirect handler.

### Milestone 2: Trip Management, Itineraries & Destinations ✅
- **Pages:**
  - `Trips.jsx` (Task 7): Trip listing, live status filters, search bar, and new trip modal.
  - `TripDetails.jsx` (Tasks 8, 9, 10): Trip overview, edit/delete modals, day-wise timeline, and categorized activity scheduler.
  - `Destinations.jsx` & `DestinationDetails.jsx` (Task 11): Public destination discovery with real photos, climate guide, and attractions with entry fees.
  - `Dashboard.jsx` (Task 12): Centralized metric counters, spotlight trip card, and quick actions.
- **Services:** `apiClient.js`, `tripService.js`, `itineraryService.js`, `activityService.js`, `destinationService.js`.

### Milestone 3: Budgeting & Expense Tracker UI ⏳
- **Pages / Modals:**
  - Budget progress bar per trip (allocated vs. actual spent).
  - Expense entry modal (category, amount, currency, notes).
  - Visual expense breakdown chart (Lodging, Food, Travel, Activities).

### Milestone 4: Collaboration & Live Notifications UI ⏳
- **Pages / Components:**
  - Trip collaborator invitation modal (enter email, assign role: `EDITOR` / `VIEWER`).
  - Notification drawer with badge counters.
  - Weather widget on destination and trip details pages.

### Milestone 5: PWA, Performance & Polish ⏳
- Progressive Web App (PWA) offline caching for itineraries.
- Export itinerary as PDF / Print view.
- Lighthouse performance optimization (>90 score).

---

## 🚀 Commands & Development Scripts

```bash
cd code_FrontEnd

# Install packages
npm install

# Code quality audit (0 errors, 0 warnings)
npm run lint

# Production bundle compilation
npm run build

# Start hot-reloading dev server
npm run dev
```
