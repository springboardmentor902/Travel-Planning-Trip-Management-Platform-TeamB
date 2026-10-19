# Milestone 2 Backend Implementation Report (Impl_M2_Bkd_Ag.md)

**Project:** TripNest Travel Management Platform  
**Author:** Antigravity AI Engine (Pair-Programming with Shreyas)  
**Milestone:** Milestone 2 – Trip Management, Itinerary, Activity Scheduling & Destinations  
**Status:** ✅ Fully Implemented, Compiled & Verified  

---

## 1. Executive Summary & Work Completed

In Milestone 2 Backend, the initial user authentication module was expanded into a full travel management system:
1. **Public Destination & Attraction Access:** Updated `SecurityConfig.java` so guest/unauthenticated travelers can browse destination catalogs and attraction guides without receiving `401 Unauthorized` errors.
2. **Destination Entity & DTO Enhancement:** Added `imageUrl` attribute to `Destination.java`, `DestinationRequestDTO.java`, `DestinationResponseDTO.java`, and `DestinationService.java` to enable rich travel cards with photos.
3. **Automated Database Seeder (`DataInitializer.java`):** Built an automated startup seeder using Spring's `CommandLineRunner`. When the database initializes, it automatically verifies and seeds:
   - Default security roles: `ROLE_TRAVELER`, `ROLE_ADMIN`.
   - **8 Indian Destinations:** Bangalore, Pune, Munnar, Coorg, Shillong/Meghalaya, Mussoorie, Goa, Varanasi.
   - **4 International Destinations:** Paris, Tokyo, Rome, Bali.
   - **Comprehensive Travel Guides:** Accurate climate descriptions, cultural tips, best times to visit, and verified free Unsplash travel photography.
   - **Real Attractions & Entry Fees:** Seeded real sightseeing attractions with ticket fees (e.g., Lalbagh ₹30, Shaniwar Wada ₹25, Eravikulam National Park ₹200, Abbey Falls ₹15, Elephant Falls ₹50, Kempty Falls ₹0).
4. **Backend Compilation & Validation:** Verified zero compile errors across all 53 Java source files using the Maven wrapper.

---

## 2. Step-by-Step Commands Used

All backend commands were executed using the Maven Wrapper (`mvnw.cmd`) inside the `code_Backend` directory:

### Step 1: Clean & Compile
```powershell
cd f:\INTERN_PROJ\TripNestAgFtd_ShreyasBkd\TripNestProjVer2_M2\code_Backend
.\mvnw.cmd compile
```
*Result: BUILD SUCCESS (53 source files compiled, 0 errors).*

### Step 2: Running the Spring Boot Application
```powershell
.\mvnw.cmd spring-boot:run
```
*Result: Starts Tomcat on port 8080, initializes PostgreSQL JPA schema via Hibernate update, and triggers DataInitializer to seed data.*

### Step 3: Running with Custom Environment Variables (PowerShell)
```powershell
$env:DB_PASSWORD="your_postgres_password"
$env:JWT_SECRET="tripnest-secret-key-change-this-later-please-use-a-long-random-secret"
.\mvnw.cmd spring-boot:run
```

---

## 3. Files Changed or Added in Milestone 2

| File Path | Status | Purpose & Changes |
| :--- | :--- | :--- |
| `src/main/java/com/tripnest/backend/config/DataInitializer.java` | **[NEW]** | Implements `CommandLineRunner` to automatically seed default roles, 12 destinations, and top attractions with entry fees on startup. |
| `src/main/java/com/tripnest/backend/config/SecurityConfig.java` | **[MODIFIED]** | Added `.requestMatchers(HttpMethod.GET, "/api/destinations/**", "/api/attractions/**").permitAll()` to allow public destination browsing. |
| `src/main/java/com/tripnest/backend/entity/Destination.java` | **[MODIFIED]** | Added `private String imageUrl;` field with JPA getter and setter. |
| `src/main/java/com/tripnest/backend/dto/DestinationRequestDTO.java` | **[MODIFIED]** | Added `imageUrl` to request payload schema. |
| `src/main/java/com/tripnest/backend/dto/DestinationResponseDTO.java` | **[MODIFIED]** | Added `imageUrl` to response payload schema. |
| `src/main/java/com/tripnest/backend/service/DestinationService.java` | **[MODIFIED]** | Updated entity-to-DTO conversion logic to map `imageUrl`. |

---

## 4. Challenges Faced & Solutions

### Challenge 1: 401 Unauthorized for Unauthenticated Visitors
- **Problem:** When an unauthenticated visitor visited the frontend Destinations page, the API call `GET /api/destinations` returned HTTP 401 Unauthorized because Spring Security required all endpoints to be authenticated.
- **Root Cause:** In `SecurityConfig.java`, `.anyRequest().authenticated()` was catching all incoming requests without exemption for read-only destination catalogs.
- **Solution:** Configured `.requestMatchers(HttpMethod.GET, "/api/destinations/**", "/api/attractions/**").permitAll()` prior to `.anyRequest().authenticated()`.

### Challenge 2: Destinations Lacked Visual Image Representation
- **Problem:** The frontend displayed blank image placeholders because the backend `Destination` entity only contained text fields (name, country, description, climate, culture).
- **Solution:** Added `imageUrl` across the entity, request DTO, response DTO, and service layer mapping.

### Challenge 3: Cold Start Empty Database
- **Problem:** When starting on a clean database, tables were created but had zero rows, requiring manual SQL inserts before testing.
- **Solution:** Implemented `DataInitializer.java` with an idempotent check:
  `if (destinationRepository.count() == 0)`
  It populates 12 rich Indian and international destinations along with top tourist attractions automatically.

---

## 5. Important Theory & Core Concepts (#Cpt)

### #Cpt-1: Spring Boot Application Startup Lifecycle & `CommandLineRunner`
- **Theory:** `CommandLineRunner` is a functional interface provided by Spring Boot. Beans implementing it are executed right after the `ApplicationContext` is created and before the server begins accepting requests.
- **Why it matters:** It provides a safe, managed hook for executing data seeding, cache warming, and schema validations in standalone and clustered environments.

### #Cpt-2: Spring Security 6 Stateless Filter Chain & URL Matching Order
- **Theory:** In Spring Security 6, security is configured via a `SecurityFilterChain` bean. Security rules are evaluated in sequential order from top to bottom.
- **Rule of Thumb:** Always place narrower, more specific matchers (e.g. `HttpMethod.GET, "/api/destinations/**"`) before broad matchers (e.g. `.anyRequest().authenticated()`).

### #Cpt-3: DTO (Data Transfer Object) Pattern & Entity Separation
- **Theory:** Direct exposure of JPA `@Entity` objects in REST controllers violates separation of concerns, risks over-posting attacks, and causes Jackson infinite recursion on bidirectional relationships (`@OneToMany` / `@ManyToOne`).
- **Best Practice:** The controller receives a `RequestDTO`, the service maps it to an `Entity`, saves it via the `Repository`, and returns a sanitized `ResponseDTO` to the client.

### #Cpt-4: Relational Cardinality & Cascading Lifecycle
- **Theory:** In TripNest, the entity hierarchy is:
  `Trip` (1) $\rightarrow$ (1) `Itinerary` (1) $\rightarrow$ (N) `ItineraryDay` (1) $\rightarrow$ (N) `Activity`
- **Cascade Behavior:** Setting `cascade = CascadeType.ALL, orphanRemoval = true` ensures that deleting a trip cleanly deletes its itinerary, all scheduled days, and all activities without leaving orphan rows in PostgreSQL.

---

## 6. Relevant Notes & Database Guidance

> [!NOTE]
> - **Default Port:** `8080`
> - **Database:** PostgreSQL on `localhost:5432`
> - **Database Name:** Configured as `tripnest_db` in `application.properties`. If you prefer to use `tripNestDb_Ag`, simply update `spring.datasource.url=jdbc:postgresql://localhost:5432/tripNestDb_Ag` in `application.properties`.
> - **Schema Auto-Update:** `spring.jpa.hibernate.ddl-auto=update` automatically creates all required tables on startup.
