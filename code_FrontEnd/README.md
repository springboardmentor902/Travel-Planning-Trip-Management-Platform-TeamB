# ✈️ TripNest — Frontend

## Overview

TripNest is an **AI-powered travel planning and management platform** that brings trip planning, destination discovery, itineraries, budgets, expenses, and group collaboration into a unified application.

This folder contains the **React.js frontend** of TripNest. It provides the user interface and communicates with the Spring Boot backend through REST APIs.

The frontend is being developed incrementally across **4 project milestones**, with AI and distributed-system enhancements planned for future milestones.

---

## 🛠️ Technology Stack

* **React.js** — UI development
* **JavaScript** — Application logic
* **Vite** — Frontend build tool and development server
* **HTML5 / CSS3** — Structure and styling
* **Tailwind CSS** — UI styling
* **ESLint** — Code quality and linting
* **REST APIs** — Backend communication
* **JWT** — Authentication and protected API access

### Future Technologies

* Chart.js — Analytics visualization
* Spring AI + Google Gemini — AI-powered travel features
* WebSocket / real-time communication — Collaboration features as required

---

# 🏗️ Frontend Architecture

The frontend follows a component-based React architecture.

```text
React Application
│
├── Pages
│   ├── Authentication
│   ├── Dashboard
│   ├── Trips
│   ├── Itinerary
│   ├── Budget & Expenses
│   ├── Destinations
│   ├── Groups
│   └── Admin
│
├── Components
│   ├── Navbar
│   ├── Forms
│   ├── Cards
│   ├── Modals
│   └── Common UI
│
├── Services
│   └── REST API communication
│
├── Context / State
│   └── Authentication and application state
│
└── Assets
    └── Images, icons and other static resources
```

The frontend communicates with the backend through HTTP REST APIs.

```text
React Frontend
      ↓
   REST APIs
      ↓
Spring Boot Backend
      ↓
  PostgreSQL
```

---

# 📂 Project Structure

```text
code_Frontend/

├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── pages/
│   │
│   ├── services/
│   │
│   ├── hooks/
│   │
│   ├── context/
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

The structure will evolve as additional TripNest modules are implemented.

---

# 📌 Milestone 1 — Frontend Foundation & Authentication

### React Setup

* Created React application using Vite.
* Established the initial frontend project structure.
* Configured ESLint and basic development tooling.
* Created the initial application layout.

### Backend Integration

* Connected React frontend with Spring Boot REST APIs.
* Implemented registration and login API integration.
* Added JWT-based authentication handling.
* Prepared protected API communication using Bearer tokens.

### Authentication Flow

```text
User
 ↓
React Login Page
 ↓
POST /api/auth/login
 ↓
Spring Boot
 ↓
Authentication
 ↓
JWT Token
 ↓
React
 ↓
Protected API Requests
```

**Status: 🚧 In Progress / Core Authentication Integration**

---

# 📌 Milestone 2 — Trips, Itineraries & Destinations

### Trip Management

* Trip creation and management interface.
* Trip dates, status, destinations and estimated budget.
* Personal trip listing and trip details.

### Itinerary Management

* Day-wise itinerary interface.
* Activity scheduling and management.
* Time-based activity organization.

### Destination Discovery

* Destination search and browsing.
* Destination details and attractions.
* Location and travel-related information.

**Status: 📋 Planned**

---

# 📌 Milestone 3 — Budget, Expenses & Collaboration

### Budget & Expenses

* Trip budget management interface.
* Expense recording and categorization.
* Budget utilization and threshold alerts.
* Expense summaries and visual breakdowns.

### Group Collaboration

* Travel group creation and member management.
* Group invitations.
* Shared trip and itinerary collaboration.
* Shared expense and settlement views.
* Notifications and travel document/media management.

**Status: 📋 Planned**

---

# 📌 Milestone 4 — Analytics, Testing & Deployment

### Analytics

* Traveler dashboard.
* Trip and travel statistics.
* Budget vs. actual expense visualization.
* Category-wise spending analysis.
* Admin analytics dashboard.

### Quality & Deployment

* Frontend testing.
* API integration testing.
* UI validation and error handling.
* Production build optimization.
* Docker-based deployment integration.

**Status: 📋 Planned**

---

# 🚀 Future Scope

## Milestone 5 — GenAI Travel Copilot

* Build an AI-powered travel assistant using **Spring AI + Google Gemini** for intelligent itinerary generation and contextual travel recommendations.
* Add AI-assisted receipt processing to extract expense information and simplify expense logging.

## Milestone 6 — Distributed & Event-Driven Architecture

* Integrate frontend capabilities with event-driven backend services using **Apache Kafka** and distributed caching using **Redis** where required.
* Evolve the application toward a scalable microservices-based architecture while maintaining a consistent user experience.

---

# 🔐 Authentication & Security

TripNest uses **JWT-based stateless authentication**.

After successful login, the backend returns a JWT access token. The frontend uses the token when accessing protected APIs.

```text
Login
  ↓
JWT received
  ↓
Frontend authentication state
  ↓
Authorization: Bearer <JWT>
  ↓
Protected Backend API
```

Role-based access will control features and pages based on the authenticated user's permissions.

---

# 🔄 Frontend–Backend Integration

The frontend consumes Spring Boot REST APIs for application data.

```text
┌─────────────────────┐
│    React Frontend   │
│                     │
│ Pages / Components  │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           │
           ▼
┌─────────────────────┐
│ Spring Boot Backend │
│                     │
│ REST Controllers    │
│ Services            │
│ Security / JWT      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     PostgreSQL      │
└─────────────────────┘
```

---

# ▶️ Development Setup

## Prerequisites

* Node.js
* npm
* Git

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

## Build Production Version

```bash
npm run build
```

## Run ESLint

```bash
npm run lint
```

---

# 🌐 Backend Configuration

The frontend will communicate with the Spring Boot backend running locally during development.

Typical backend URL:

```text
http://localhost:8080
```

API configuration will be centralized as the frontend grows to avoid hard-coding backend URLs across components.

-DN-CGT-APZN
---

# 📈 Development Roadmap

```text
M1
│
├── React + Vite Setup
├── Authentication UI
├── REST API Integration
└── JWT Authentication
        ↓
M2
│
├── Trips
├── Itineraries
└── Destinations
        ↓
M3
│
├── Budgets
├── Expenses
└── Collaboration
        ↓
M4
│
├── Analytics
├── Testing
└── Deployment
        ↓
M5
│
└── GenAI Travel Copilot
        ↓
M6
│
└── Event-Driven / Distributed Architecture
```



---

# 📌 Status

**TripNest Frontend — Active Development**

The React + Vite foundation has been established and frontend-backend integration is being developed incrementally according to the project milestones.


---------------