# TripNest — Milestone 2 Backend Readme (M2Bkd_readme.md)

## 📌 Milestone Overview
Milestone 2 expands TripNest with complete trip planning and destination catalog management:
- **Trip Lifecycle:** Creation, listing, retrieval by ID, updating, and deletion with ownership checks.
- **Itinerary Management:** Auto-generation of itinerary container per trip, sequential day-wise scheduling.
- **Activity Scheduling:** Categorized activities per day (`SIGHTSEEING`, `DINING`, `ADVENTURE`, `RELAXATION`, `TRAVEL`) with time ranges, locations, and checklists.
- **Destination Discovery & Attractions:** Public catalog of destinations (climate, culture, photography) and tourist attractions with entry ticket fees.
- **Automated Seeder (`DataInitializer.java`):** Seeds Indian & global destinations on initial launch.

---

## 🏛️ Domain Entities & Relationships

```
  +--------------+ 1       1 +------------------+ 1       N +---------------------+
  |     User     |<--------->|       Trip       |<--------->|     Itinerary       |
  +--------------+           +------------------+           +---------------------+
                                                                       | 1
                                                                       |
                                                                       | N
                                                            +---------------------+
                                                            |    ItineraryDay     |
                                                            +---------------------+
                                                                       | 1
                                                                       |
                                                                       | N
  +------------------+ 1     N +------------------+         +---------------------+
  |   Destination    |<------->|    Attraction    |         |      Activity       |
  +------------------+         +------------------+         +---------------------+
```

### 1. `Trip`
- Fields: `id`, `title`, `destination`, `startDate`, `endDate`, `numberOfTravelers`, `status` (`PLANNED`, `ONGOING`, `COMPLETED`, `CANCELLED`), `user`.
- Relationship: `@ManyToOne` with `User`.

### 2. `Itinerary` & `ItineraryDay`
- `Itinerary`: `@OneToOne` with `Trip`. Contains list of `ItineraryDay` entities.
- `ItineraryDay`: Contains `dayNumber`, `date`, `title`, `description`.
- **Domain Constraint:** Day $N$ date must equal `startDate + (N - 1) days`.

### 3. `Activity`
- Fields: `title`, `category`, `startTime`, `endTime`, `location`, `description`, `bookingDetails`, `checklist`.
- Relationship: `@ManyToOne` with `ItineraryDay`.

### 4. `Destination` & `Attraction`
- `Destination`: `name`, `country`, `description`, `climate`, `culture`, `bestTimeToVisit`, `imageUrl`.
- `Attraction`: `name`, `description`, `entryFee`, `category`, `destination`.

---

## 📡 Milestone 2 REST API Catalog

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/trips` | List trips for authenticated user | Yes |
| `POST` | `/api/trips` | Create a new trip | Yes |
| `GET` | `/api/trips/{id}` | Get specific trip details | Yes |
| `PUT` | `/api/trips/{id}` | Update trip details | Yes |
| `DELETE` | `/api/trips/{id}` | Delete trip and cascade | Yes |
| `GET` | `/api/trips/{tripId}/itinerary` | Get trip itinerary | Yes |
| `POST` | `/api/trips/{tripId}/itinerary/days` | Add a day to itinerary | Yes |
| `GET` | `/api/activities/day/{dayId}` | Get activities for a day | Yes |
| `POST` | `/api/activities` | Create a new activity | Yes |
| `PUT` | `/api/activities/{id}` | Update an activity | Yes |
| `DELETE` | `/api/activities/{id}` | Delete an activity | Yes |
| `GET` | `/api/destinations` | Browse all destinations | **No (Public)** |
| `GET` | `/api/destinations/{id}` | Destination guide details | **No (Public)** |
| `GET` | `/api/attractions/destination/{id}` | Attractions for destination | **No (Public)** |

---

## 🚀 How to Run Milestone 2 Backend

```powershell
cd code_Backend
.\mvnw.cmd spring-boot:run
```
On startup, `DataInitializer` will output:
```
[DataInitializer] Seeding complete with destinations & attractions!
```
