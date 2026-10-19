import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const linkClass = (path) =>
    `nav-link ${location.pathname === path ? "active" : ""}`;

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link to="/" className="brand">
          <span className="brand-mark">✈</span>
          <span>TripNest</span>
        </Link>

        <nav className="nav-links">
          <Link className={linkClass("/")} to="/">Home</Link>
          <Link className={linkClass("/destinations")} to="/destinations">Destinations</Link>

          {isAuthenticated ? (
            <>
              <Link className={linkClass("/trips")} to="/trips">My Trips</Link>
              <Link className={linkClass("/dashboard")} to="/dashboard">Dashboard</Link>
              <Link className={linkClass("/profile")} to="/profile">Profile</Link>
              <Link className={linkClass("/settings")} to="/settings">Settings</Link>

              {user?.email && (
                <span className="nav-user-badge" title={user.email}>
                  👤 {user.email.split("@")[0]}
                </span>
              )}

              <button className="nav-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className={linkClass("/login")} to="/login">Login</Link>
              <Link className="nav-register" to="/register">Get Started</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
