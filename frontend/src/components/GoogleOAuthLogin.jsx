import React from "react";

function GoogleOAuthLogin() {
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google?prompt=login";
  };

  return (
    <button
      type="button"
      className="btn"
      onClick={handleGoogleLogin}
    >
      Continue with Google
    </button>
  );
}

export default GoogleOAuthLogin;