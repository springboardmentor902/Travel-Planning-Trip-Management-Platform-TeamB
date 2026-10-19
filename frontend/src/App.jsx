import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <Link className="logo" to="/">TripNest</Link>
          <nav className="navlinks">
            <Link to="/trips">Trips</Link>
            <Link to="/destinations">Destinations</Link>
            <Link to="/login">Login</Link>
          </nav>
        </div>
      </header>
      <main className="hero">
        <div className="container">
          <h1>Plan. Travel. Manage.</h1>
          <p>
            TripNest is a travel planning and trip management platform for
            creating trips, organizing itineraries, tracking budgets and
            collaborating with travel groups.
          </p>
          <div className="actions">
            <Link className="btn" to="/trips">Explore Trips</Link>
            <Link className="btn secondary" to="/register">Create Account</Link>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="container">TripNest • Travel Planning & Trip Management</div>
      </footer>
    </>
  );
}
