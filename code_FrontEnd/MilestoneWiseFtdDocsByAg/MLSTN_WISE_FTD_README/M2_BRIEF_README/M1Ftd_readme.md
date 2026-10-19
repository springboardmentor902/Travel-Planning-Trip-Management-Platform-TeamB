# TripNest — Milestone 1 Frontend Readme (M1Ftd_readme.md)

## 📌 Milestone Overview
Milestone 1 Frontend establishes the single-page application (SPA) client architecture for TripNest:
- Initialized React 19 application bundled with Vite for fast HMR.
- Set up React Router DOM v6 for declarative client-side routing.
- User Authentication UI: Registration form, Login form, Error banners, and input validation.
- Centralized Authentication Context (`AuthContext.jsx`, `useAuth.js`) managing JWT tokens in `localStorage`.
- Route protection (`ProtectedRoute.jsx`) preventing unauthorized access to private views.
- Social Authentication: Handling Google OAuth2 redirect callbacks and extracting JWT tokens from query parameters.

---

## 🏗️ Architecture & Component Hierarchy

```
  +-------------------------------------------------------------+
  |                           App.jsx                           |
  |                      <AuthProvider>                         |
  |                     <BrowserRouter>                         |
  +-------------------------------------------------------------+
                                 |
              +------------------+------------------+
              |                                     |
    +-------------------+                 +-------------------+
    |    Navbar.jsx     |                 |  Routes Container |
    +-------------------+                 +-------------------+
                                                    |
                   +----------------+---------------+----------------+
                   |                |               |                |
             +-----------+    +-----------+   +-----------+    +-----------+
             |   Home    |    |   Login   |   | Register  |    | Dashboard |
             |  (Public) |    |  (Public) |   |  (Public) |    |(Protected)|
             +-----------+    +-----------+   +-----------+    +-----------+
```

---

## 🔑 Authentication Workflow

1. **User Sign Up:**
   - User enters details in `Register.jsx`.
   - Dispatches payload to `POST /api/auth/register`.
   - On success, prompts user to log in.

2. **User Sign In:**
   - User inputs email and password in `Login.jsx`.
   - Dispatches payload to `POST /api/auth/login`.
   - Backend returns `{ token: "ey..." }`.
   - `login(token)` stores JWT in `localStorage` and updates React auth state.
   - User is redirected to `/dashboard`.

3. **Route Protection:**
   - `ProtectedRoute.jsx` checks if `user` or `token` exists.
   - If not authenticated, redirects to `/login` with state preserving the attempted URL.

4. **Google OAuth2 Integration:**
   - When returning from Google authorization server to frontend callback URL, `AuthContext` extracts the `?token=ey...` query parameter, stores it, clears the URL query, and logs the user in.

---

## 🚀 How to Run Milestone 1 Frontend

```bash
cd code_FrontEnd
npm install
npm run dev
```
Visit `http://localhost:5173` in your web browser.
