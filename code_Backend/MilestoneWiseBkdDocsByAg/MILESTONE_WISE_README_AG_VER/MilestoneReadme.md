# TripNest — Development Milestones

TripNest is a full-stack travel planning application for organizing trips, building day-wise itineraries, managing travel budgets, collaborating with groups, and visualizing travel insights.

**Milestones 1–4 form the core application. Milestones 5–7 define the advanced scope of the project, introducing generative AI, event-driven microservices, and tool-calling agent capabilities.**

## Core technology direction

- **Backend:** Java 21, Spring Boot, Spring Data JPA, Spring Security, Maven
- **Frontend:** React, React Router, Axios, Chart.js, React Testing Library
- **Primary database:** PostgreSQL or MySQL during initial setup
- **Quality and delivery:** JUnit, Mockito, Postman, Docker, environment-based configuration
- **Advanced stack:** Spring AI, Google Gemini or OpenAI, Redis, Kafka, Spring Cloud Gateway, Prometheus, Grafana, Zipkin, GitHub Actions

---

## Milestone 1 — Foundation, authentication, and user accounts

**Goal:** Create the project foundation and a complete, secure user-access flow.

### Backend

1. **Core identity schema** — Design `Users`, `Roles`, and user-role relationships; define primary/foreign keys, constraints, and data types; and produce an ER diagram. **Outcome:** Users and roles database schema is ready.
2. **Trip schema** — Design `Trips`, `Itineraries`, and `Activities` with relationships, keys, and cardinalities; prepare SQL/DDL. **Outcome:** Trip database schema is ready.
3. **Finance and support schema** — Design `Destinations`, `Budgets`, `Expenses`, and `Notifications` with constraints and SQL/DDL. **Outcome:** Finance and support database schema is ready.
4. **Spring Boot and database setup** — Initialize Spring Boot and Maven; configure PostgreSQL or MySQL, application properties, JPA/Hibernate, package structure, and connectivity. **Outcome:** Backend and database are configured.
5. **JWT authentication** — Implement registration and login APIs, password hashing, JWT creation/validation, Spring Security configuration, and the authentication flow. **Outcome:** JWT authentication works end-to-end.
6. **OAuth2 and role-based access** — Add Google OAuth2 login, User/Admin roles, protected APIs, authorization, and account/profile security. **Outcome:** OAuth2 and RBAC are configured.

### Frontend

1. **React project setup** — Create the application, routing, folder structure, reusable components, Axios/API configuration, and base layout.
2. **Registration UI** — Build validated registration forms, error handling, and backend registration integration.
3. **Login and JWT flow** — Connect the login API, store/manage tokens, maintain authentication state, and support logout.
4. **Google OAuth2 login** — Add a “Continue with Google” flow and handle successful and failed callbacks.
5. **Profile and account settings** — Provide profile, travel preferences, favorite destinations, and account settings screens; connect available APIs.
6. **Protected routes and auth integration** — Enforce authenticated routes, User/Admin UI access, and a unified auth context/state.

**Milestone outcome:** Users can register, sign in, use Google OAuth2, manage their accounts, and access only authorized pages and APIs.

---

## Milestone 2 — Trip planning and itinerary management

**Goal:** Deliver the complete core trip-planning workflow.

### Backend

1. **Trip management APIs** — Create the Trip entity, repository, service, and REST APIs for creating, viewing, and listing trips, including destination, dates, travelers, budget, and status.
2. **Trip detail, edit, and delete APIs** — Provide complete detail views, update/delete operations, validation, and authorization.
3. **Itinerary management APIs** — Support CRUD for day-wise itineraries linked to trips.
4. **Activity management APIs** — Support CRUD for activities with sightseeing, transportation, accommodation, dining, adventure, and shopping types.
5. **Destination management APIs** — Provide destinations, details, attractions, travel guides, and related travel information.
6. **Integration and testing** — Validate the complete **Trip → Itinerary → Activity → Destination** workflow, error handling, and APIs with Postman.

### Frontend

7. **Trip creation and listing UI** — Build the creation form and listing page, connected through Axios.
8. **Trip details, edit, and delete UI** — Show destination, dates, travelers, budget, and status; add management actions.
9. **Itinerary planning UI** — Deliver a day-wise itinerary interface for each selected trip.
10. **Activity scheduling UI** — Capture date/time, location, and activity type through the activity APIs.
11. **Destination pages** — Build destination listing and detail pages with attractions and travel guides.
12. **Trip dashboard and integration** — Combine all M2 modules in a dashboard showing upcoming trips, itinerary summaries, and trip information.

**Milestone outcome:** A traveler can create and manage a trip, plan each day, schedule activities, and browse destination information in one connected workflow.

---

## Milestone 3 — Budgeting, groups, and travel documents

**Goal:** Support financial planning and collaboration for shared trips.

### Backend

1. **Budget management APIs** — Create and manage trip budgets, category allocations, planning, and cost estimates.
2. **Expense management APIs** — Record, update, view, and delete expenses linked to trips and budgets.
3. **Expense categories and reports** — Support Transportation, Hotel, Food, Shopping, Entertainment, and Miscellaneous, with category summaries and report APIs.
4. **Group collaboration APIs** — Create travel groups, manage members/invitations/roles, share itineraries, and support group discussions.
5. **Shared expense APIs** — Track group expenses, individual contributions, split amounts, and settlement data.
6. **Notification and media/document APIs** — Add reminders, budget alerts, invitations, travel updates, plus upload/management for documents, tickets, hotel bookings, and photos.

### Frontend

7. **Budget management UI** — Build budget creation, allocation, and overview screens with planned amounts and estimates.
8. **Expense tracking UI** — Provide add, edit, delete, and list screens for expenses.
9. **Expense reports UI** — Show category-wise spending and summary reports.
10. **Group collaboration UI** — Build group creation, member lists, invitations, roles, and discussions.
11. **Shared expenses UI** — Display contributions, split expenses, and settlement information.
12. **Notifications and documents UI** — Build a notification center and interfaces for travel documents, tickets, bookings, and photos.

**Milestone outcome:** Travelers can budget, record costs, collaborate with a group, split shared expenses, and organize relevant travel documents.

---

## Milestone 4 — Analytics, quality, and production deployment

**Goal:** Make TripNest demonstrable, tested, optimized, and ready for production deployment.

### Backend

1. **Traveler analytics APIs** — Provide upcoming-trip metrics, budget overviews, expense summaries, travel statistics, and favorite destinations.
2. **Admin analytics APIs** — Provide user, trip, destination, revenue/platform, and other administrative metrics.
3. **Reports and data aggregation APIs** — Generate trip, budget, expense, and travel reports with chart-ready summaries.
4. **Backend testing and validation** — Execute JUnit/Mockito tests and validate major workflows, security, errors, and APIs through Postman.
5. **Security and performance optimization** — Verify protected APIs, optimize slow queries and response times, and review database/API performance.
6. **Deployment and production configuration** — Configure Docker, production database connectivity, environment variables, logging, monitoring, and backend deployment.

### Frontend

7. **Traveler analytics dashboard** — Show upcoming trips, budgets, expenses, travel statistics, and favorite destinations.
8. **Admin dashboard** — Display user, trip, destination, revenue/platform, and related administrative metrics.
9. **Charts and reports UI** — Use Chart.js for expenses, budgets, trips, destinations, and relevant analytics.
10. **Frontend testing and validation** — Test components and workflows with React Testing Library, including forms, navigation, API integration, and major user journeys.
11. **Frontend optimization and production setup** — Optimize dashboard loading, rendering, API calls, assets, and production environment configuration.
12. **Final integration and deployment** — Verify end-to-end flows, resolve integration issues, deploy the frontend, and complete production verification.

**Milestone outcome:** The complete TripNest application is deployed, tested, optimized, and ready to demonstrate.

---

## Advanced Scope of the Project

The following milestones extend the production-ready core with modern, enterprise-grade capabilities. They demonstrate AI integration, distributed-system design, cloud-native delivery, and scalable backend architecture.

---

## Milestone 5 — Generative AI and Smart Travel Assistant

**Goal:** Use Spring AI with Google Gemini or OpenAI to automate travel planning and expense capture.

1. **AI smart itinerary generator** — `POST /api/ai/generate-itinerary` accepts requests such as “3-day budget trip to Manali with hiking,” creates structured day-wise JSON, and saves it to the database. Focus: prompt engineering and structured output parsing with `BeanOutputConverter`.
2. **AI travel assistant** — `POST /api/ai/chat` provides a context-aware, RAG-ready chat experience informed by a user’s trip details and remaining budget. Focus: conversational memory, context injection, and Spring AI `ChatClient`.
3. **Receipt OCR and auto-expense extraction** — `POST /api/ai/scan-receipt` uses a multimodal model to extract amount, date, merchant name, and category from restaurant or hotel bills.
4. **AI packing-list generator** — Generate tailored packing recommendations from destination weather, trip length, and activities.
5. **AI planner and chat UI** — Add a “Generate with AI” trip-planning modal and floating Travel Copilot widget, with streaming responses where appropriate.
6. **Receipt scanner UI** — Provide drag-and-drop uploads, image previews, and auto-filled expense fields.

**Milestone outcome:** TripNest can generate plans, answer trip-aware questions, extract receipts, and recommend packing lists.

---

## Milestone 6 — Distributed systems, Kafka, and microservices

**Goal:** Evolve the stable core application toward event-driven, cloud-native architecture.

1. **Kafka events** — Produce and consume events such as `TripCreatedEvent` for asynchronous itinerary pre-seeding and `BudgetExceededEvent` for real-time alerts.
2. **Redis caching** — Apply cache-aside caching with `@Cacheable` and `@CacheEvict` to popular destinations/travel guides and use Redis for JWT blacklist handling on logout.
3. **Microservices and API gateway** — Separate API Gateway, Trip Service, Expense & Budget Service, and Notification Service. The gateway handles routing, JWT validation, and rate limiting; service discovery can use Netflix Eureka or Consul.
4. **Database tuning** — Add composite PostgreSQL indexes such as `(user_id, trip_id)`, tune HikariCP, and analyze slow paths with `EXPLAIN ANALYZE`.
5. **Observability** — Configure Prometheus, Grafana, Micrometer, and Zipkin for JVM metrics, throughput, dashboards, and distributed tracing.
6. **Containerization and CI/CD** — Build multi-stage Docker images, a full Docker Compose environment, and a GitHub Actions pipeline: lint → test → Docker build → deploy.

```text
React Frontend (Vercel)
          │ HTTPS / REST
          ▼
Spring Cloud API Gateway
      ┌───┴───────────────┐
      ▼                   ▼
Trip Management      Expense & Budget
Service              Service
      │                   │
      └──── Kafka events ─┘
                  │
                  ▼
      Async Notification Service
                  │
      Redis + PostgreSQL + Monitoring
```

**Milestone outcome:** TripNest supports asynchronous processing, modular services, caching, observability, and repeatable cloud-native delivery.

---

## Milestone 7 — TripNest AI Agent with Tool Calling

**Goal:** Build an AI agent that uses Spring AI function calling to work through secure backend services rather than directly query the database.

1. **Expose travel-planning tools** — Implement typed Spring AI tools for destination search, destination details, budget calculation, and itinerary generation. Each tool delegates to the relevant destination, expense, or itinerary service.
2. **Build the agent orchestration endpoint** — Create an authenticated agent endpoint that receives natural-language planning requests, provides the selected trip context, invokes the required tools, and returns a clear synthesized plan.
3. **Secure and validate tool execution** — Enforce ownership checks, validate tool parameters and budget constraints, return meaningful errors, and ensure that the agent can access only authorized trip data.
4. **Add conversational memory and resilience** — Preserve short-term planning context, apply timeouts and retry handling for AI-provider failures, and log tool calls for troubleshooting and auditing.
5. **Prepare the RAG evolution path** — Keep the initial version focused on service tools and structured data; later add retrieval over curated destination data when richer contextual recommendations are needed.

```text
                 TripNest AI Agent
                          │
       ┌──────────────────┼──────────────────┐
       ▼                  ▼                  ▼
Destination Tool      Budget Tool       Itinerary Tool
       │                  │                  │
       ▼                  ▼                  ▼
Destination Service   Expense Service    Itinerary Service
       │                  │                  │
       └──────────────────┴──────────────────┘
                          │
                     PostgreSQL
```

For “Plan a 3-day trip to Varanasi under ₹10,000,” the flow may be:

1. `searchDestination("Varanasi")`
2. `getDestinationDetails()`
3. `calculateBudget()`
4. `generateItinerary()`
5. Return the final plan to the traveler.

The first release follows **User → AI Assistant → three backend tools → database → response**. A vector database, multi-agent orchestration, and advanced RAG remain a future evolution path rather than a dependency for this milestone.

**Milestone outcome:** The AI agent produces secure, data-backed travel plans through backend tools, giving TripNest a strong modern Java, Spring Boot, and AI architecture story.

## Definition of done

A milestone is complete only when its planned backend APIs, frontend flows, integration, validation, and expected deliverable are all working. The core release is complete at the end of Milestone 4, while Milestones 5–7 define the advanced project scope.
