import React from "react";
import GoogleOAuthLogin from "./GoogleOAuthLogin";

function OAuthLogin() {
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

        <GoogleOAuthLogin />
      </div>
    </div>
  );
}

export default OAuthLogin;