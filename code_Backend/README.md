# TripNest Backend — Travel Planning & Management API

TripNest is a **Spring Boot backend application** for a Travel Planning and Trip Management Platform.

The backend provides REST APIs and supports authentication, user management, trip planning, itinerary management, budgeting, expense tracking, collaboration, notifications, destinations, media, and recommendations as the project progresses through Milestones 1–4.

> **Current implementation status:** M1 backend foundation and JWT authentication are implemented and tested. M2–M4 features are planned/in progress and will be added incrementally.

---

# 1. Tech Stack

| Category        | Technology                  | Purpose                              |
| --------------- | --------------------------- | ------------------------------------ |
| Language        | Java 21                     | Core application                     |
| Framework       | Spring Boot                 | Backend framework                    |
| Web             | Spring Web / REST           | REST API development                 |
| Security        | Spring Security             | Authentication & API security        |
| Authentication  | JWT                         | Stateless token-based authentication |
| JWT Support     | Spring Security OAuth2 JOSE | JWT encoding/decoding                |
| ORM             | Spring Data JPA             | Database access                      |
| ORM Provider    | Hibernate                   | Object-relational mapping            |
| Database        | PostgreSQL 17.11            | Primary database                     |
| Validation      | Jakarta Bean Validation     | Request validation                   |
| Boilerplate     | Lombok                      | Getters, setters, constructors, etc. |
| Build Tool      | Maven                       | Build and dependency management      |
| API Testing     | Postman                     | REST API testing                     |
| Version Control | Git / GitHub                | Source-code management               |

---

# 2. Backend Architecture

The backend follows a layered Spring Boot architecture.

```text
Client / Frontend
       │
       │ HTTP / JSON
       ▼
┌─────────────────────┐
│     Controller      │
│   REST API Layer    │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│       Service       │
│   Business Logic    │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│     Repository      │
│   Data Access       │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│   JPA / Hibernate   │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│     PostgreSQL      │
└─────────────────────┘
```

Security is integrated through Spring Security:

```text
Client
  │
  │ Authorization: Bearer <JWT>
  ▼
Spring Security
  │
  ▼
JWT Decoder
  │
  ▼
Authentication
  │
  ▼
Protected Controller
```

---

# 3. Current Package Structure

The current backend contains the following major packages:

```text
com.tripnest.backend/
│
├── config/
│   ├── JwtConfig.java
│   └── SecurityConfig.java
│
├── controller/
│   ├── AuthController.java
│   └── TestController.java
│
├── dto/
│   └── RegistrationRequest.java
│
├── entity/
│   ├── User.java
│   ├── Role.java
│   └── UserRole.java
│
├── repository/
│   ├── UserRepository.java
│   ├── RoleRepository.java
│   └── UserRoleRepository.java
│
├── service/
│   ├── AuthService.java
│   └── JwtService.java
│
└── BackendApplication.java
```

> The package structure will grow as M2, M3 and M4 functionality is implemented.

---

# 4. Database

The backend uses **PostgreSQL 17.11**. The authentication foundation stores its
data in the `public` schema of the `tripnest_db` database.

```text
Database: tripnest_db
Schema:   public
URL:      jdbc:postgresql://localhost:5432/tripnest_db
```

PostgreSQL connectivity and the authentication tables have been verified with
Spring Boot, JPA, and Hibernate.

## Database Setup and Verification

Start the PostgreSQL interactive terminal and sign in as the `postgres` user:

```powershell
psql -U postgres
```

Create the database once, if it does not already exist:

```sql
CREATE DATABASE tripnest_db;
```

Connect to it and list the application tables:

```sql
\c tripnest_db
\dt
```

Expected tables after the application initializes its authentication schema:

```text
public.users
public.roles
public.user_roles
```

Inspect an individual table when needed:

```sql
\d users
\d roles
\d user_roles
```

> In `psql`, use SQL commands such as `SELECT` and PostgreSQL meta-commands
> such as `\dt`, `\d`, and `\l`. Windows commands such as `cls` are not valid
> `psql` commands.

### Initial Roles

The following roles are required by the current authentication setup. Insert
them once in a new database:

```sql
INSERT INTO roles (name) VALUES
  ('TRAVELER'),
  ('GROUP_ADMIN'),
  ('ADMIN');
```

Verify them with:

```sql
SELECT id, name FROM roles ORDER BY id;
```

Expected result:

```text
1 | TRAVELER
2 | GROUP_ADMIN
3 | ADMIN
```

### Verify Registered Users and Role Assignments

After registering users through the API, use the following read-only queries:

```sql
SELECT id, name, email FROM users ORDER BY id;

SELECT
  u.id AS user_id,
  u.name AS user_name,
  u.email,
  r.name AS role
FROM user_roles ur
JOIN users u ON u.id = ur.user_id
JOIN roles r ON r.id = ur.role_id
ORDER BY u.id, r.name;
```

Do not include password hashes in screenshots, commits, or documentation.

---

# 5. Current Database Schema

The current authentication-related database contains three tables:

```text
users
roles
user_roles
```

## 5.1 Users

Stores registered users.

```text
users
-------------------------
id
email
name
password
```

Constraints:

* `id` → Primary Key
* `email` → Unique
* `password` → BCrypt hash

---

## 5.2 Roles

Stores application roles.

Current roles:

```text
1 → TRAVELER
2 → GROUP_ADMIN
3 → ADMIN
```

---

## 5.3 User Roles

Maps users to roles.

```text
user_roles
-------------------------
id
user_id
role_id
```

Relationship:

```text
User 1 ──────── * UserRole * ──────── 1 Role
```

A user can therefore be associated with one or more roles.

---

# 6. Entity Layer

The current JPA entities are:

### User

Represents a TripNest user.

```text
User
 ↓
users
```

### Role

Represents an application role.

```text
Role
 ↓
roles
```

### UserRole

Represents the relationship between users and roles.

```text
UserRole
 ↓
user_roles
```

These entities are mapped to PostgreSQL using JPA/Hibernate.

---

# 7. Authentication

Authentication is implemented using:

* Registration
* BCrypt password hashing
* Login
* JWT generation
* JWT validation
* Spring Security
* Protected REST endpoints

---

# 8. Registration

Endpoint:

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "password123"
}
```

Flow:

```text
Registration Request
        ↓
RegistrationRequest DTO
        ↓
Validation
        ↓
AuthService
        ↓
BCrypt password hashing
        ↓
User entity
        ↓
PostgreSQL
```

The password is never stored as plain text.

---

# 9. BCrypt Password Hashing

BCrypt is a **one-way password hashing algorithm** used to securely store passwords.

Conceptually:

```text
Plain Password
      ↓
    BCrypt
      ↓
Password Hash
      ↓
PostgreSQL
```

For login, BCrypt verifies whether the entered password matches the stored hash.

The original password is not decrypted or retrieved from the database.

---

# 10. Login

Endpoint:

```http
POST /api/auth/login
```

Example:

```json
{
  "email": "aln@example.com",
  "password": "password123"
}
```

Flow:

```text
Login Request
      ↓
AuthService
      ↓
Find User by Email
      ↓
BCrypt Password Verification
      ↓
Password Correct
      ↓
JwtService
      ↓
JWT Generated
      ↓
JWT returned to client
```

---

# 11. JWT Authentication

JWT stands for **JSON Web Token**.

The current implementation uses JWT with the **HS256** signing algorithm.

A JWT consists logically of:

```text
HEADER.PAYLOAD.SIGNATURE
```

The current token contains claims such as:

```text
sub → user email
iat → issued-at time
exp → expiration time
```

Example concept:

```json
{
  "sub": "aln@example.com",
  "iat": "...",
  "exp": "..."
}
```

---

# 12. JWT Architecture

The backend uses Spring Security's JWT support.

```text
                  JWT
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
   JwtEncoder            JwtDecoder
        │                     │
        ▼                     ▼
Generate JWT            Validate JWT
```

`JwtConfig.java` configures the JWT encoder and decoder.

`JwtService.java` handles application-level JWT generation.

---

# 13. JWT Request Flow

After login:

```text
Client
  │
  │ Login credentials
  ▼
/api/auth/login
  │
  ▼
Authentication
  │
  ▼
JWT generated
  │
  ▼
Client receives JWT
```

For a protected request:

```text
Client
  │
  │ Authorization: Bearer <JWT>
  ▼
Spring Security
  │
  ▼
JWT Decoder
  │
  ▼
Token Validation
  │
  ▼
Authenticated User
  │
  ▼
Protected API
```

---

# 14. Protected API

A temporary protected endpoint is currently used for authentication testing.

Example:

```http
GET /api/test/protected
```

Without a valid JWT:

```text
401 Unauthorized
```

With a valid JWT:

```http
Authorization: Bearer <JWT>
```

the request is authenticated successfully.

This confirms that JWT generation and validation are working.

---

# 15. HTTP Authentication Errors

The backend authentication flow distinguishes between:

### 401 Unauthorized

The request does not contain valid authentication credentials.

Example:

```text
No JWT
Invalid JWT
Expired JWT
```

### 403 Forbidden

The user is authenticated, but does not have sufficient permission to access the requested resource.

Conceptually:

```text
401 → "Who are you?"
403 → "I know who you are, but you cannot access this."
```

RBAC authorization will be expanded as the project progresses.

---

# 16. REST API — Current

### Authentication

| Method | Endpoint             | Status | Description                        |
| ------ | -------------------- | ------ | ---------------------------------- |
| POST   | `/api/auth/register` | ✅      | Register a new user                |
| POST   | `/api/auth/login`    | ✅      | Authenticate user and generate JWT |

### Testing

| Method | Endpoint              | Status | Description                      |
| ------ | --------------------- | ------ | -------------------------------- |
| GET    | `/api/test/protected` | ✅      | Temporary JWT-protected endpoint |

> Additional APIs will be documented here as they are implemented.

---

# 17. Milestone Coverage

The complete TripNest backend is planned across four milestones.

```text
M1
Foundation + Authentication
        ↓
M2
Trip Management
        ↓
M3
Itinerary + Budget + Expense
        ↓
M4
Collaboration + Notifications +
Destination + Media + Recommendations
```

---

# 18. M1 — Foundation & Authentication

## Objective

Build the backend foundation and authentication system.

### Completed

* Spring Boot project setup
* Maven configuration
* PostgreSQL database
* Database connection
* JPA/Hibernate configuration
* User entity
* Role entity
* UserRole entity
* Registration DTO
* Request validation
* Registration API
* BCrypt password hashing
* Login API
* JWT configuration
* JWT generation
* JWT validation
* Spring Security configuration
* Protected endpoint
* Postman testing

### Current Database

```text
users
roles
user_roles
```

### M1 Authentication Flow

```text
Register
   ↓
Validate
   ↓
Hash Password
   ↓
Save User
   ↓
Login
   ↓
Verify Password
   ↓
Generate JWT
   ↓
Bearer Token
   ↓
JWT Validation
   ↓
Protected API
```

### M1 Current Status

**JWT authentication is working successfully.**

---

# 19. M2 — Trip Management

## Objective

Implement the core trip-management functionality.

Planned functionality includes:

* Create trip
* View trip
* Update trip
* Delete trip
* List user's trips
* Trip ownership
* Trip members
* Trip details
* Destination association

Expected backend components:

```text
Trip
TripRepository
TripService
TripController
Trip DTOs
```

Expected APIs will be added under:

```text
/api/trips
```

---

# 20. M3 — Itinerary, Budget & Expense

## Objective

Implement detailed trip planning and financial management.

### Itinerary

Planned functionality:

* Day-wise itinerary
* Activities
* Activity timing
* Activity notes
* Activity ordering
* Itinerary updates

Expected API area:

```text
/api/itineraries
```

### Budget

Planned functionality:

* Create trip budget
* Budget categories
* Budget tracking
* Budget utilization

Expected API area:

```text
/api/budgets
```

### Expense

Planned functionality:

* Add expense
* Update expense
* Delete expense
* Expense categories
* Expense summaries
* Trip expense tracking

Expected API area:

```text
/api/expenses
```

---

# 21. M4 — Collaboration & Advanced Features

## Objective

Implement the remaining major TripNest functionality.

### Collaboration

Planned functionality:

* Travel groups
* Group members
* Member roles
* Invitations
* Shared trip planning

Expected API area:

```text
/api/groups
```

### Notifications

Planned functionality:

* Trip reminders
* Group invitations
* Budget alerts
* System notifications

Expected API area:

```text
/api/notifications
```

### Destination

Planned functionality:

* Destination information
* Destination search
* Destination details
* Travel-related information

Expected API area:

```text
/api/destinations
```

### Media

Planned functionality:

* Trip documents
* Tickets
* Booking documents
* Trip photos

Expected API area:

```text
/api/media
```

### Recommendations

Planned functionality:

* Destination recommendations
* Travel recommendations

---

# 22. Security Roadmap

The authentication foundation is implemented.

Further security functionality includes:

```text
JWT Authentication
       ↓
Role-Based Authorization
       ↓
OAuth2 Login
       ↓
Protected Business APIs
```

The application currently has the following roles prepared in the database:

```text
TRAVELER
GROUP_ADMIN
ADMIN
```

RBAC and OAuth2 are separate implementation tasks and will be integrated as their assigned work is completed.

---

# 23. Configuration

Application configuration is currently maintained in:

```text
src/main/resources/application.properties
```

Typical configuration includes:

```text
Spring application configuration
PostgreSQL datasource
JPA/Hibernate
JWT configuration
Server configuration
```

### Security Warning

Never commit real secrets to GitHub.

The following should be kept out of the repository when using real credentials:

```text
Database password
JWT secret
OAuth2 client secret
API keys
Cloud credentials
```

Use environment variables or a suitable secret-management mechanism.

---

# 24. Running the Backend

## Prerequisites

Install:

```text
JDK 21
Maven
PostgreSQL 17.x
Git
```

Verify Java:

```powershell
java -version
```

Verify Maven:

```powershell
mvn -v
```

Verify PostgreSQL:

```powershell
psql --version
```

---

## Database Setup

Follow [Database Setup and Verification](#database-setup-and-verification).
Create `tripnest_db`, then confirm the `users`, `roles`, and `user_roles`
tables and seed the three initial roles before testing registration or login.

---

## Start Backend

From the backend project directory:

```powershell
mvn spring-boot:run
```

The application starts on:

```text
http://localhost:8080
```

Successful startup should contain a message similar to:

```text
Started BackendApplication
```

---

# 25. Testing with Postman

## Registration

```http
POST http://localhost:8080/api/auth/register
```

Body:

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Login

```http
POST http://localhost:8080/api/auth/login
```

Body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

A successful login returns a JWT.

---

## Protected Endpoint

```http
GET http://localhost:8080/api/test/protected
```

Authorization:

```text
Bearer Token
```

Paste the JWT received from login.

Expected result:

```text
200 OK
```

Without a valid token:

```text
401 Unauthorized
```

---

# 26. Git Workflow

Recommended workflow:

```text
Pull latest code
       ↓
Create / switch to branch
       ↓
Make changes
       ↓
Test
       ↓
git status
       ↓
git add
       ↓
git commit
       ↓
git push
       ↓
Pull Request
```

Example commit messages:

```text
feat: add trip creation API
feat: implement itinerary service
fix: validate expense amount
feat: add JWT authentication
docs: update backend README
```

---

# 27. Development Guidelines

When contributing to the backend:

1. Understand the existing code before modifying it.
2. Follow the existing package structure.
3. Keep controllers focused on HTTP/API handling.
4. Keep business logic in services.
5. Keep database operations in repositories.
6. Use DTOs for API request/response data where appropriate.
7. Validate incoming requests.
8. Test APIs after changes.
9. Do not commit passwords, JWT secrets or API keys.
10. Avoid modifying another developer's module without coordination.
11. Keep database relationships consistent.
12. Update documentation when adding major functionality.

---

# 28. Current Backend Status

| Component             | Status                 |
| --------------------- | ---------------------- |
| Spring Boot setup     | ✅ Complete             |
| Maven setup           | ✅ Complete             |
| PostgreSQL            | ✅ Configured           |
| JPA/Hibernate         | ✅ Configured           |
| User entity           | ✅ Complete             |
| Role entity           | ✅ Complete             |
| UserRole entity       | ✅ Complete             |
| Registration DTO      | ✅ Complete             |
| Registration API      | ✅ Working              |
| BCrypt hashing        | ✅ Working              |
| Login API             | ✅ Working              |
| JWT generation        | ✅ Working              |
| JWT validation        | ✅ Working              |
| Spring Security       | ✅ Configured           |
| Protected API         | ✅ Tested               |
| RBAC                  | 🔄 Separate task       |
| OAuth2                | 🔄 Separate task       |
| Trip Management       | 🔄 M2                  |
| Itinerary             | 🔄 M3                  |
| Budget                | 🔄 M3                  |
| Expense               | 🔄 M3                  |
| Collaboration         | 🔄 M4                  |
| Notifications         | 🔄 M4                  |
| Destination           | 🔄 M4                  |
| Media                 | 🔄 M4                  |
| Recommendations       | 🔄 M4                  |
| Analytics             | 🔄 Planned/As required |
| Production deployment | 🔄 Planned             |

---

# 29. Backend Roadmap

```text
                 TripNest Backend
                        │
                        ▼
              ┌──────────────────┐
              │       M1         │
              │ Backend Setup    │
              │ PostgreSQL       │
              │ Registration     │
              │ Login            │
              │ JWT              │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │       M2         │
              │ Trip Management  │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │       M3         │
              │ Itinerary        │
              │ Budget           │
              │ Expense          │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │       M4         │
              │ Collaboration    │
              │ Notifications    │
              │ Destination      │
              │ Media            │
              │ Recommendations  │
              └──────────────────┘
```

---

# 30. Important Note

This README documents both the **current implementation** and the **planned backend roadmap**.

Only features marked as completed should be considered implemented in the current codebase.

As new milestones are completed, this README should be updated to reflect the actual code rather than planned functionality.

---

## TripNest Backend

**Plan Better. Travel Smarter.**
