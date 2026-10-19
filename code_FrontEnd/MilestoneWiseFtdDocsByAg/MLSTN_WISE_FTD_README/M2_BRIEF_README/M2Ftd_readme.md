# TripNest — Milestone 2 Frontend Readme (M2Ftd_readme.md)

## 📌 Milestone Overview
Milestone 2 Frontend delivers the full traveler experience (Tasks 7 to 12) for TripNest:
- **Task 7: Trip Creation & Listing UI (`Trips.jsx`)**
  - Interactive trip cards showing duration, destination, traveler count, and status.
  - Real-time status filter pills (`ALL`, `PLANNED`, `ONGOING`, `COMPLETED`, `CANCELLED`) and search.
  - "Plan a New Trip" modal with automatic validation.
- **Task 8: Trip Details, Edit & Delete UI (`TripDetails.jsx`)**
  - Rich header with status pill and quick trip metrics.
  - Edit Trip modal with pre-populated form.
  - Delete Trip action with cascading confirmation dialog.
- **Task 9: Day-Wise Itinerary Planning UI (`TripDetails.jsx`)**
  - Day timeline displaying sequential day cards.
  - Automatic date calculation pre-populating Day $N$ as `startDate + (N - 1) days`.
- **Task 10: Activity Scheduling UI (`TripDetails.jsx`)**
  - Category badges with icons: `SIGHTSEEING` 🏛️, `DINING` 🍽️, `ADVENTURE` 🏄‍♂️, `RELAXATION` ☕, `TRAVEL` ✈️.
  - Time range picker, location field, booking details, and checklist items.
- **Task 11: Destination Discovery & Guides (`Destinations.jsx`, `DestinationDetails.jsx`)**
  - Public browsing directory with photo cards.
  - Immersive travel guides with climate, culture, best times, and attractions with ticket fees.
  - "Plan a Trip Here" shortcut button.
- **Task 12: Centralized Dashboard Integration (`Dashboard.jsx`)**
  - Live metric counters connected to API data.
  - Nearest upcoming trip spotlight card.
  - Quick action shortcuts.

---

## 📡 Service Layer Architecture

| Service File | Purpose & Endpoints Managed |
| :--- | :--- |
| `src/services/apiClient.js` | Central Axios client with JWT interceptor. |
| `src/services/tripService.js` | `getTrips()`, `getTripById(id)`, `createTrip(data)`, `updateTrip(id, data)`, `deleteTrip(id)`. |
| `src/services/itineraryService.js` | `getItinerary(tripId)`, `ensureItinerary(tripId)`, `getDays(tripId)`, `addDay(tripId, data)`, `deleteDay(tripId, dayId)`. |
| `src/services/activityService.js` | `getActivitiesByDay(dayId)`, `createActivity(data)`, `updateActivity(id, data)`, `deleteActivity(id)`. |
| `src/services/destinationService.js` | `getAllDestinations()`, `getDestinationById(id)`, `getAttractionsByDestination(id)`. |

---

## 🚀 How to Run Milestone 2 Frontend

```bash
cd code_FrontEnd

# Run code linter (verifies 0 errors)
npm run lint

# Compile production build
npm run build

# Start local development server
npm run dev
```
