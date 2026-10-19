# TripNest — Frontend Comprehensive Project Blueprint (PlanningFtd.md)

This document contains the complete roadmap and architectural plan for the **TripNest React Frontend**. It is divided into two distinct sections:
1. **Part 1: Non-Technical Plan (Executive & Evaluator Presentation)** — Written in clear layman language suitable for presenting to a client, external stakeholder, or university examination panel.
2. **Part 2: Technical Engineering Plan (Developer & Architecture Blueprint)** — Complete with component trees, state management, routing, Axios interceptors, responsive styling, and integration flows.

---

# PART 1: NON-TECHNICAL PLAN (PRESENTING TO CLIENT / PROFESSOR)

### Executive UX Vision
A great travel app should feel as exciting and stress-free as the vacation itself. Cluttered spreadsheets and endless text fields create fatigue. **TripNest** provides an intuitive, visually inspiring, and accessible single-page application where anyone can effortlessly visualize their entire journey, from dream destinations to daily schedules and group budgets.

---

### Milestone 1: The Front Door — Welcoming Onboarding, Login & User Workspace

#### What problem are we solving?
Users judge an application within the first 5 seconds. If the login screen is confusing or security feels questionable, users will never trust the platform with their personal travel plans.

#### How it works in simple words:
- **Hero Welcome**: A modern, clean landing page introducing the essence of TripNest: "Plan less, travel more."
- **Effortless Sign-In**: Users can sign in with their email or click a single button: **"Continue with Google"**. There are no repetitive questions or complicated verification codes.
- **Smart Remembering**: Once logged in, the application remembers who you are. You can refresh the page, close the browser, or open a new tab without being rudely kicked out to the login screen.
- **Personal Profile**: Travelers can view and update their travel style (e.g., Adventure Seeker, Budget Explorer, Foodie) and saved favorites.
- **Protected Areas**: Private travel spaces (like your personal dashboard or trip list) are automatically locked from public eyes; if someone tries to visit them without logging in, the app politely guides them to the login screen first.

#### Business & Client Value:
- Creates immediate brand credibility and user trust.
- Reduces bounce rates by offering familiar 1-click Google authentication.

---

### Milestone 2: The Core Experience — Interactive Trip Planner, Daily Timeline & Destination Catalog

#### What problem are we solving?
Travel planning is traditionally messy: notes scattered across paper, WhatsApp chats, and maps. Travelers need a clean, structured canvas that makes visualizing vacation days as easy as flipping through a calendar.

#### How it works in simple words:
- **Trip Dashboard**: An organized homepage showing all your trips organized into clear categories: *Upcoming*, *Currently Traveling*, and *Past Memories*.
- **Quick Trip Creator**: A simple pop-up where you enter the basics: where you want to go, when you're leaving, when you're returning, and who is joining.
- **Trip Command Center (Trip Details)**: Clicking on any trip opens its personal command center. Here you can edit details, check your countdown, or delete the trip if plans change.
- **Day-by-Day Timeline (Itineraries)**: Instead of a generic wall of text, your trip is broken into beautiful daily cards (Day 1, Day 2, Day 3). You always know what day of the week it is and what date it corresponds to.
- **Activity Scheduler**: Within each day, you can schedule morning, afternoon, and evening activities. Each activity has clear tags with friendly icons:
  - 🏛️ Sightseeing & Museums
  - 🍽️ Food & Dining
  - 🚗 Transportation & Flights
  - 🏨 Hotel Check-In
  - 🏄‍♂️ Outdoor Adventures
  - 🛍️ Local Markets & Shopping
- **Destination Discovery**: A visual travel catalog where users can browse cities and regions, read travel guides, check the best seasons to visit, and explore popular attractions before creating a trip.

#### Business & Client Value:
- Transforms TripNest into an engaging, daily-use travel assistant.
- Prevents scheduling anxiety by displaying an orderly chronological timeline.

---

### Milestone 3: Financial Transparency, Group Travel Hub & Shared Memories

#### What problem are we solving?
Money and coordination are the biggest sources of tension on group vacations. Friends forget who paid for which cab, budgets are accidentally broken, and travel tickets get lost in message threads.

#### How it works in simple words:
- **Visual Budget Gauge**: Travelers set a target budget (e.g., $1,500) with a colored progress bar showing how much has been spent and what remains.
- **Quick Expense Entry**: A mobile-friendly form to log expenses on the go (e.g., "$45 for dinner at Seaside Bistro").
- **Split Expense Calculator**: An automated breakdown showing exact group shares: *"John paid for the rental car; Sarah owes John $30, and David owes John $30."* No manual math required.
- **Group Travel Hub**: An interactive team space showing all travel companions, their roles (Admin vs. Traveler), and shared notes.
- **Document & Ticket Vault**: A secure section to preview flight tickets, hotel confirmation PDFs, and vacation photos right in the browser.

#### Business & Client Value:
- Eliminates post-trip financial awkwardness between friends.
- Keeps users coming back to TripNest throughout their active vacation to log expenses.

---

### Milestone 4: Visual Dashboards, Performance Polish & Enterprise Presentation

#### What problem are we solving?
Raw numbers are boring. Travelers want to see their travel journey visualized in charts, and business stakeholders need high-level metrics on platform adoption.

#### How it works in simple words:
- **Traveler Analytics**: Engaging charts showing your travel footprint—spending by category (pie charts), trips per year, and favorite types of vacations.
- **Admin Control Room**: A clean, restricted portal for platform managers to monitor total registered travelers, trending destinations, and server uptime.
- **Instant Speed**: The app loads instantly, transitions smoothly between pages without page reloads, and works gracefully on mobile phones, tablets, and laptops.

#### Business & Client Value:
- Impresses university examiners and investors with high-grade visual presentation and responsive design.
- Optimizes user retention through visual habit-tracking.

---

### Milestone 5 & Beyond: AI Travel Copilot, Smart Receipt Scanning & Futuristic Travel UI

#### What problem are we solving?
Researching a trip from scratch takes hours of browsing blogs and reviews. Travelers want instant, personalized answers right in their planning screen.

#### How it works in simple words:
- **"Plan with AI" Magic Button**: A user types: *"Give me a 3-day romantic weekend in Rome under $800."* The AI drafts the complete itinerary with suggested morning, afternoon, and evening activities, and lets the user save it to their trips with one click.
- **Floating Travel Copilot**: A friendly chat bubble in the corner of the screen that knows your trip schedule. You can ask: *"What's a good coffee shop near our 2:00 PM museum stop?"* and get instant advice.
- **Snap & Scan Receipts**: Drag and drop a photo of a restaurant bill; the app automatically reads the total price and restaurant name, pre-filling the expense form automatically.
- **Smart Packing Assistant**: Generates an interactive checklist customized to the weather of your destination and your planned activities (e.g., hiking boots for mountain trails, sunscreen for beaches).

---

# PART 2: FRONTEND TECHNICAL ARCHITECTURE & IMPLEMENTATION BLUEPRINT

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                           TRIPNEST FRONTEND                             │
│                         React 19 + Vite + SPA                           │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│   Auth Context   │       │  Axios Client    │       │  Component Tree  │
│  State & Tokens  │       │  Interceptor Hub │       │  Pages & Modals  │
│  Google OAuth2   │       │  REST Services   │       │  Responsive CSS  │
└──────────────────┘       └──────────────────┘       └──────────────────┘
```

---

## Milestone 1 Technical Plan: Routing, AuthContext, JWT Flow & OAuth2

### 1. Technology & Setup
- **Framework**: React 19.x with Vite bundling for lightning-fast HMR and optimized builds.
- **Routing**: `react-router-dom` v7.
- **HTTP Client**: `axios` with centralized configuration.

### 2. State Management: `AuthContext`
- Built using React's native `createContext` and `useContext` (no heavy Redux boilerplate needed).
- Provides:
  - `token`: Stored in `localStorage` for persistence across refreshes.
  - `user`: Decoded JWT payload extracting user subject (email).
  - `login(token)`: Stores token, updates state, and routes to `/dashboard`.
  - `logout()`: Clears token, resets state, and routes to `/login`.
  - `isAuthenticated`: Boolean helper for instant UI conditional rendering.
- **Google OAuth2 Redirect Listener**:
  - In `App.jsx` / `AuthProvider`: On app mount, inspects `window.location.search` for `?token=...`.
  - If present, extracts the token, stores it in `localStorage`, cleans the URL with `window.history.replaceState`, and transitions to the dashboard.

### 3. Route Guard: `ProtectedRoute`
```jsx
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
```

### 4. Screen Implementations
- `Home.jsx`: Modern hero section with call-to-actions, value props, and responsive layout.
- `Login.jsx`: Controlled form with email/password validation, inline error messaging, and "Continue with Google" OAuth redirection button.
- `Register.jsx`: Full-name, email, and password form with validation (minimum lengths, email regex) and smooth transition to login upon creation.
- `Navbar.jsx`: Responsive header displaying dynamic links (Home, Destinations, Trips, Dashboard, Profile, Settings) and conditional login/logout buttons.

---

## Milestone 2 Technical Plan: Trips, Itinerary Day Timeline, Activity Scheduling & Destinations

### 1. Component Hierarchy
```text
App
├── Navbar
└── Routes
    ├── /trips ───────────────> Trips.jsx
    │                           ├── TripFilters (All, Planned, Ongoing, Completed)
    │                           ├── TripGrid (List of TripCards)
    │                           └── CreateTripModal
    │
    ├── /trips/:tripId ───────> TripDetails.jsx
    │                           ├── TripHeader (Status pill, dates, edit/delete buttons)
    │                           ├── EditTripModal
    │                           ├── ItineraryTimeline
    │                           │   ├── ItineraryDayCard (Day 1..N)
    │                           │   │   ├── DayHeader (Title, date, edit/delete)
    │                           │   │   ├── ActivityList
    │                           │   │   │   └── ActivityCard (Time chip, category icon, location)
    │                           │   │   └── AddActivityButton
    │                           │   └── AddDayModal
    │                           └── ActivityModal (Add/Edit activity)
    │
    ├── /destinations ────────> Destinations.jsx
    │                           ├── SearchBar & CategoryPills
    │                           └── DestinationGrid
    │
    └── /destinations/:id ────> DestinationDetails.jsx
                                ├── DestinationOverview (Guide, best time to visit)
                                ├── AttractionList (Cards with entrance fees)
                                └── PlanTripButton (Pre-fills trip creation)
```

### 2. Service Architecture (`src/services/`)
- `apiClient.js`:
  ```javascript
  import axios from "axios";

  const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: { "Content-Type": "application/json" }
  });

  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  export default apiClient;
  ```
- `tripService.js`: `getMyTrips()`, `getTripById(id)`, `createTrip(data)`, `updateTrip(id, data)`, `deleteTrip(id)`.
- `itineraryService.js`: `getItinerary(tripId)`, `createItinerary(tripId)`, `getDays(tripId)`, `addDay(tripId, data)`, `updateDay(tripId, dayId, data)`, `deleteDay(tripId, dayId)`.
- `activityService.js`: `getActivitiesByDay(dayId)`, `createActivity(data)`, `updateActivity(id, data)`, `deleteActivity(id)`.
- `destinationService.js`: `getAllDestinations()`, `getDestinationById(id)`, `getAttractionsByDestination(id)`.

### 3. Date & Schedule Helper Logic
- When adding Day $N$, the frontend calculates the target date:
  $$\text{targetDate} = \text{startDate} + (N - 1) \text{ days}$$
- This eliminates user calculation errors and guarantees strict compliance with the backend's `@FutureOrPresent` and duration validation rules.

---

## Milestone 3 Technical Plan: Budgets, Expenses, Group Collaboration & Media Upload

### 1. Component Structure
- `BudgetOverview.jsx`: Visual SVG / progress ring showing allocated vs. spent funds across categories.
- `ExpenseList.jsx`: Tabular/card list of transactions with category filters, delete/edit actions, and receipt modal preview.
- `ExpenseModal.jsx`: Add/Edit expense form capturing title, amount, category, payer, and split-share checklist.
- `GroupCollaboration.jsx`: Group member list with role badges (Admin/Member), invite member modal, and live debt settlement table (`Who Owes Whom`).
- `MediaVault.jsx`: Drag-and-drop file uploader with thumbnail previews for flight passes and hotel confirmations.

### 2. Debt Settlement Visualization
- Displays simple, human-readable instructions:
  `Alice pays Bob $45.00 to settle shared car rental.`

---

## Milestone 4 Technical Plan: Analytics, Charts & Production Optimization

### 1. Visualizations with Chart.js
- **Category Spending**: Doughnut chart rendering expenses by category (`Accommodation`, `Dining`, `Transport`, etc.).
- **Monthly Travel Trends**: Bar chart displaying trip counts and days traveled per month.
- **Budget Variance**: Stacked bar comparison showing Planned Budget vs. Actual Spending.

### 2. Performance & Production Build
- **Code Splitting**: Route-level lazy loading via `React.lazy()` and `<Suspense>`:
  ```jsx
  const Trips = React.lazy(() => import("./pages/Trips"));
  const TripDetails = React.lazy(() => import("./pages/TripDetails"));
  ```
- **Vite Production Optimizations**:
  - Gzip / Brotli compression.
  - Tree-shaking of unused icons and utility functions.
  - Chunk splitting: vendor libraries (`react`, `react-dom`, `react-router-dom`, `axios`) split into a separate cached vendor chunk.

---

## Milestone 5 & Advanced Technical Plan: AI Travel Copilot & Smart OCR UI

### 1. AI Itinerary Generation Modal
- Form capturing destination, duration, budget tier, and travel vibe (e.g. "Relaxed", "Adventure", "Family").
- Animated loading skeleton with travel tips while the Spring AI backend streams or generates the structured day plan.
- Preview screen allowing the user to inspect and accept the AI-generated days directly into their trip.

### 2. Floating Travel Copilot Chat Widget
- Compact expandable chat drawer docked at the bottom-right corner.
- Sends current `tripId` as context in `POST /api/ai/chat`.
- Renders rich Markdown replies with actionable links (e.g., clicking a suggested attraction opens its details modal).

### 3. Drag-and-Drop Receipt Scanner
- Built using native HTML5 drag-and-drop API + file input.
- Instant client-side image preview.
- Dispatches multi-part `POST /api/ai/scan-receipt` to backend OCR service; automatically populates the Expense modal fields with extracted merchant, date, and amount.
