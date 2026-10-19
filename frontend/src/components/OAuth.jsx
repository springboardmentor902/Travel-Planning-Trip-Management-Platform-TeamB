import React, { useEffect } from "react";

function OAuth() {

  // Google OAuth login
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google?prompt=login";
  };

  // Handle OAuth callback
  useEffect(() => {

    const params = new URLSearchParams(window.location.search);

    const name = params.get("name");
    const email = params.get("email");
    const role = params.get("role");

    // Process callback only when name and email are available
    if (name && email) {

      console.log("========== GOOGLE OAUTH RESPONSE ==========");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Role:", role);
      console.log("============================================");

      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", role || "USER");

      window.location.href = "/dashboard";
    }

  }, []);

  // Check whether this is the OAuth callback page
  const isCallback = window.location.pathname === "/callback";

  // OAuth callback screen
  if (isCallback) {
    return (
      <div className="container">
        <h1>OAuth Callback</h1>

        <p>Google login successful.</p>
        <p>Redirecting to dashboard...</p>
      </div>
    );
  }

  // Normal Google login screen
  return (
    <div className="container">

      <div className="page-title">
        <h1>Google OAuth Login</h1>
      </div>

      <div className="form">

        <h2>Welcome to TripNest</h2>

        <p className="muted">
          Sign in with your Google account.
        </p>

        <button
          type="button"
          className="btn"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

      </div>

    </div>
  );
}

export default OAuth;

