import React, { useEffect } from "react";

function OAuthCallback() {

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);

    const name = params.get("name");
    const email = params.get("email");

    console.log("========== GOOGLE OAUTH RESPONSE ==========");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("============================================");
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    window.location.href = "/dashboard";

  }, []);

  return (
    <div className="container">
      <h1>OAuth Callback</h1>

      <p>Google login successful.</p>
    </div>
  );
}



export default OAuthCallback;