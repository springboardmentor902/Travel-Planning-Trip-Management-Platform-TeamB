# TripNest — Complete Backend Roadmap & Architecture Guide (Bkd_All_readme.md)

**Project:** TripNest Travel Management Platform  
**Architecture:** Spring Boot 4 / 3.x + Java 21 + Spring Security 6 + PostgreSQL + JPA / Hibernate  
**Scope:** Complete Backend Reference (Milestones 1 to 5+)

---

## 🏛️ System Architecture Overview

TripNest follows a layered, decoupled domain-driven architecture:

```
       [ Frontend Client (React + Axios) ]
                       |
                       | HTTP / REST (JSON) + Bearer JWT
                       v
        +-----------------------------+
        |   Spring Security Filter    | -> Validates JWT & Sets SecurityContext
        +-----------------------------+
                       |
                       v
        +-----------------------------+
        |     REST Controller Layer   | -> Validates DTOs (@Valid), maps HTTP endpoints
        +-----------------------------+
                       |
                       v
        +-----------------------------+
        |        Service Layer        | -> Encapsulates business logic & transactions
        +-----------------------------+
                       |
                       v
        +-----------------------------+
        |   Spring Data JPA / Repos   | -> Typed queries and CRUD operations
        +-----------------------------+
                       |
                       v
        +-----------------------------+
        |     PostgreSQL Database     | -> Tables, constraints, foreign keys
        +-----------------------------+
```

---

## 🗺️ Milestone Roadmap & Capabilities

### Milestone 1: User Identity & Security Core ✅
- **Entities:** `User`, `Role`, `UserRole` join table.
- **Security:** Spring Security 6, stateless session management, BCrypt password hashing.
- **JWT Engine:** Cryptographic token generation, expiration claims, bearer filter.
- **OAuth2:** Google Social Login authorization flow.

### Milestone 2: Trip Management, Itineraries & Destinations ✅
- **Entities:** `Trip`, `Itinerary`, `ItineraryDay`, `Activity`, `Destination`, `Attraction`.
- **Domain Rules:** Cascade deletion, date alignment for itinerary days (`date == startDate + (dayNumber - 1)`), categorized activities.
- **Public Endpoints:** Unauthenticated browsing of destinations and attractions.
- **Data Seeder:** Automated `CommandLineRunner` seeding 12 Indian & global destinations and attractions.

### Milestone 3: Finance, Budgeting & Expense Tracking ⏳
- **Entities:** `Budget`, `Expense`, `ExpenseCategory`, `Currency`.
- **Features:**
  - Trip budget creation with target allocations (Travel, Lodging, Dining, Activities).
  - Expense recording with receipt metadata and timestamp.
  - Real-time remaining budget calculations and over-budget threshold alerts.

### Milestone 4: Collaboration, Notifications & Weather ⏳
- **Entities:** `TripCollaborator` (`OWNER`, `EDITOR`, `VIEWER`), `Notification`.
- **Features:**
  - Inviting friends to co-plan trips via email.
  - Granular role-based access control (RBAC) on itinerary modifications.
  - In-app notification dispatcher (trip updates, invitation acceptance).
  - External weather API integration for destination forecast data.

### Milestone 5: Production Readiness, DevOps & Cloud Deployment ⏳
- Dockerization with multi-stage Dockerfile.
- Docker Compose orchestration with PostgreSQL.
- CI/CD automation via GitHub Actions.
- Production profiling, connection pooling (HikariCP), and automated integration tests.

---

## 🗄️ Master Database Entity Relationship Diagram (ERD)

```
 +-------------+ 1     N +-------------------+ N     1 +-------------+
 |    Role     |<------->|     UserRole      |<------->|    User     |
 +-------------+         +-------------------+         +-------------+
                                                              | 1
                                                              |
                                                              | N
                                                       +-------------+
                                                       |    Trip     |
                                                       +-------------+
                                                              | 1
                                                              |
                                                              | 1
                                                       +-------------+
                                                       |  Itinerary  |
                                                       +-------------+
                                                              | 1
                                                              |
                                                              | N
                                                       +-------------+
                                                       |ItineraryDay |
                                                       +-------------+
                                                              | 1
                                                              |
                                                              | N
 +-------------+ 1     N +-------------------+         +-------------+
 | Destination |<------->|    Attraction     |         |  Activity   |
 +-------------+         +-------------------+         +-------------+
```

---

## 🛠️ Commands & Configuration

### Running with Maven Wrapper:
```powershell
cd code_Backend
.\mvnw.cmd compile
.\mvnw.cmd spring-boot:run
```

### Environment Configuration (`.env` & `application.properties`):
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tripnest_db
spring.datasource.username=postgres
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
jwt.secret=${JWT_SECRET}
```
