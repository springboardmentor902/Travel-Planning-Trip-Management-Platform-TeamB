import { useState, useEffect } from "react";
import { AuthContext } from "./auth-context";

// Helper to decode email/sub from JWT payload
function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthToken = params.get("token");
    if (oauthToken) {
      localStorage.setItem("token", oauthToken);
      return oauthToken;
    }
    return localStorage.getItem("token") || "";
  });

  const [user, setUser] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const initialToken = params.get("token") || localStorage.getItem("token");
    if (!initialToken) return null;
    const decoded = parseJwt(initialToken);
    return decoded ? { email: decoded.sub } : null;
  });

  // Clean URL if token query was present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("token")) {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    const decoded = parseJwt(newToken);
    setUser(decoded ? { email: decoded.sub } : { email: "" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
