# TripNest — Milestone 1 Backend Readme (M1Bkd_readme.md)

## 📌 Milestone Overview
Milestone 1 establishes the core foundation of the TripNest platform:
- Spring Boot 4 / 3.x project setup with Java 21 and Maven.
- PostgreSQL database connectivity with Hibernate/JPA auto-schema generation.
- Security architecture: Spring Security 6 with stateless JWT authentication.
- Core entities: `User`, `Role`, `UserRole` relationships.
- Authentication APIs: Registration, Login, Password Hashing with BCrypt, JWT generation/validation.
- Google OAuth2 social login integration.

---

## 🏛️ Architecture & Database Design

### Core Entities
1. **`User` (`users` table):**
   - `id` (BIGSERIAL, Primary Key)
   - `email` (VARCHAR, Unique, Not Null)
   - `password` (VARCHAR, BCrypt Encrypted)
   - `firstName`, `lastName` (VARCHAR)
   - `phoneNumber` (VARCHAR)
   - `createdAt`, `updatedAt` (TIMESTAMP)
2. **`Role` (`roles` table):**
   - `id` (BIGSERIAL, Primary Key)
   - `name` (VARCHAR, e.g., `ROLE_TRAVELER`, `ROLE_ADMIN`)
3. **`UserRole` (`user_roles` table):**
   - Join table managing Many-to-Many relationship between `User` and `Role`.

### Entity-Relationship Diagram (ERD)
```
  +------------------+         +------------------+         +------------------+
  |      users       |         |    user_roles    |         |      roles       |
  +------------------+         +------------------+         +------------------+
  | id (PK)          |<------->| user_id (FK)     |         | id (PK)          |
  | email (UNIQUE)   |         | role_id (FK)     |<------->| name             |
  | password (HASH)  |         +------------------+         +------------------+
  | first_name       |
  | last_name        |
  +------------------+
```

---

## 🔐 Security & JWT Flow

1. **User Registration (`POST /api/auth/register`):**
   - Receives `RegisterRequest` (`email`, `password`, `firstName`, `lastName`).
   - Checks if email is already taken.
   - Hashes raw password using `BCryptPasswordEncoder`.
   - Assigns default `ROLE_TRAVELER`.
   - Saves user to PostgreSQL and returns confirmation.

2. **User Login (`POST /api/auth/login`):**
   - Authenticates credentials via Spring's `AuthenticationManager`.
   - Generates a stateless JWT token containing `sub` (email), issued timestamp, expiration (e.g. 24h), and user roles.
   - Returns `AuthResponse` with the JWT string.

3. **Stateless Request Authentication (`JwtAuthenticationFilter`):**
   - Every protected request contains header: `Authorization: Bearer <jwt>`.
   - Filter extracts token, validates cryptographic signature against `jwt.secret`, and injects `UsernamePasswordAuthenticationToken` into Spring's `SecurityContextHolder`.

---

## 🚀 How to Run Milestone 1 Backend

1. **Configure Database Connection:**
   Verify `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/tripnest_db
   spring.datasource.username=postgres
   spring.datasource.password=${DB_PASSWORD}
   spring.jpa.hibernate.ddl-auto=update
   ```

2. **Run Application:**
   ```powershell
   cd code_Backend
   .\mvnw.cmd spring-boot:run
   ```

3. **Verify Auth Endpoints:**
   - Register: `POST http://localhost:8080/api/auth/register`
   - Login: `POST http://localhost:8080/api/auth/login`
