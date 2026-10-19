import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { tripService } from "../services/tripService";

function Dashboard() {
  const { user } = useAuth();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    tripService
      .getMyTrips()
      .then((data) => {
        if (isMounted) {
          setTrips(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load dashboard metrics");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Calculate user stats
  const totalTrips = trips.length;
  const plannedTrips = trips.filter((t) => t.status === "PLANNED").length;
  const ongoingTrips = trips.filter((t) => t.status === "ONGOING").length;
  const completedTrips = trips.filter((t) => t.status === "COMPLETED").length;

  // Find next upcoming trip (PLANNED or ONGOING)
  const upcomingTrip =
    trips.find((t) => t.status === "ONGOING") ||
    trips.find((t) => t.status === "PLANNED") ||
    trips[0];

  // Format user display name with proper capitalization (e.g. "aln" -> "Aln")
  const rawName = user?.name || user?.fullName || (user?.email ? user.email.split("@")[0] : "Traveler");
  const displayName = rawName ? rawName.charAt(0).toUpperCase() + rawName.slice(1) : "Traveler";

  // Formatted date string for greeting
  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="content-page dashboard-page">
      {/* Welcome Banner */}
      <section className="dashboard-welcome">
        <div className="dashboard-welcome-main">
          <div className="welcome-badge-row">
            <span className="welcome-tag">
              <span className="welcome-tag-dot" aria-hidden="true"></span>
              TRIPNEST DASHBOARD
            </span>
            <span className="welcome-date">
              📅 {todayFormatted}
            </span>
          </div>

          <div className="welcome-user-heading">
            <div className="welcome-avatar-circle" aria-hidden="true">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="welcome-text-group">
              <h1>
                Welcome back, <span className="welcome-name-highlight">{displayName}</span>! 👋
              </h1>
              <p>
                Your travel command center is ready. Here is a summary of your journeys.
              </p>
            </div>
          </div>

          <div className="welcome-quick-chips">
            <div className="welcome-chip">
              <span className="chip-icon">✈️</span>
              <span className="chip-text">
                <strong>{totalTrips}</strong> {totalTrips === 1 ? "Trip" : "Trips"}
              </span>
            </div>
            <div className="welcome-chip">
              <span className="chip-icon">📍</span>
              <span className="chip-text">
                {ongoingTrips > 0 ? (
                  <strong className="chip-active">{ongoingTrips} Active Now</strong>
                ) : plannedTrips > 0 ? (
                  <strong>{plannedTrips} Planned</strong>
                ) : (
                  <span>Ready to Explore</span>
                )}
              </span>
            </div>
            <div className="welcome-chip">
              <span className="chip-icon">🏆</span>
              <span className="chip-text">
                <strong>{completedTrips}</strong> Completed
              </span>
            </div>
          </div>
        </div>

        <div className="dashboard-top-actions">
          <Link className="primary-btn welcome-action-btn" to="/trips">
            <span>+ Plan a Trip</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
          <Link className="secondary-btn welcome-action-sub" to="/destinations">
            <span>🌍 Explore Places</span>
          </Link>
        </div>

        {/* Ambient decorative glow */}
        <div className="welcome-card-glow" aria-hidden="true"></div>
      </section>

      {error && <div className="message error">{error}</div>}

      {/* Metrics Row */}
      <div className="dashboard-grid">
        <div className="dashboard-card highlight">
          <span className="card-icon">✈️</span>
          <span className="card-label">TOTAL TRIPS</span>
          <strong>{totalTrips}</strong>
          <p>
            {totalTrips === 0
              ? "No trips created yet."
              : `${totalTrips} planned or completed voyages.`}
          </p>
          <Link to="/trips" className="text-link">
            View all trips →
          </Link>
        </div>

        <div className="dashboard-card">
          <span className="card-icon">⏳</span>
          <span className="card-label">UPCOMING / ACTIVE</span>
          <strong>{plannedTrips + ongoingTrips}</strong>
          <p>{ongoingTrips > 0 ? `${ongoingTrips} ongoing right now!` : "Waiting for takeoff."}</p>
        </div>

        <div className="dashboard-card">
          <span className="card-icon">🏆</span>
          <span className="card-label">COMPLETED</span>
          <strong>{completedTrips}</strong>
          <p>Memorable past adventures recorded.</p>
        </div>
      </div>

      {/* Spotlight: Next Journey */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Updating your travel schedule...</p>
        </div>
      ) : upcomingTrip ? (
        <section className="upcoming-spotlight-card">
          <div className="spotlight-left">
            <span className="eyebrow">NEXT ADVENTURE SPOTLIGHT</span>
            <h2>{upcomingTrip.title}</h2>
            <p className="spotlight-dest">
              📍 <strong>{upcomingTrip.destination}</strong> ·{" "}
              <span>
                {upcomingTrip.startDate} → {upcomingTrip.endDate}
              </span>
            </p>
            <p className="spotlight-desc">
              👥 {upcomingTrip.numberOfTravelers} Travelers · Status:{" "}
              <span className={`status-pill ${upcomingTrip.status.toLowerCase()}`}>
                {upcomingTrip.status}
              </span>
            </p>
          </div>

          <div className="spotlight-right">
            <Link
              to={`/trips/${upcomingTrip.id}`}
              className="primary-btn spotlight-btn"
            >
              Continue Itinerary & Activities →
            </Link>
          </div>
        </section>
      ) : (
        <section className="upcoming-spotlight-card empty">
          <div className="spotlight-left">
            <span className="eyebrow">NO UPCOMING TRIPS</span>
            <h2>Where are you headed next?</h2>
            <p>
              Discover inspiring destinations or start planning your personalized
              itinerary now.
            </p>
          </div>
          <div className="spotlight-right">
            <Link to="/trips" className="primary-btn">
              + Create Your First Trip
            </Link>
          </div>
        </section>
      )}

      {/* Recent Trips Quick Access */}
      {trips.length > 0 && (
        <section className="recent-trips-section">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">RECENT TRIPS</span>
              <h2>Your Travel Library</h2>
            </div>
            <Link to="/trips" className="text-link">
              View All ({trips.length}) →
            </Link>
          </div>

          <div className="recent-trips-list">
            {trips.slice(0, 3).map((trip) => (
              <div key={trip.id} className="recent-trip-row">
                <div className="recent-trip-info">
                  <strong>{trip.title}</strong>
                  <span>
                    📍 {trip.destination} · {trip.startDate}
                  </span>
                </div>
                <div className="recent-trip-actions">
                  <span className={`status-pill ${trip.status.toLowerCase()}`}>
                    {trip.status}
                  </span>
                  <Link to={`/trips/${trip.id}`} className="outline-btn small">
                    Manage →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Dashboard;
